"use client";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { RoughNotation } from "react-rough-notation";
import { useState, FormEvent } from "react";
import { useShoppingList } from "@/store/useShoppingList";
import type { EstimatedItem } from "@/types/shopping";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page() {
  const items = useShoppingList((s) => s.items);
  const addItemToList = useShoppingList((s) => s.addItem);
  const toggleItemInList = useShoppingList((s) => s.toggleItem);
  const estimatePrices = useShoppingList((s) => s.estimatePrices);
  const estimating = useShoppingList((s) => s.estimating);
  const estimateResult = useShoppingList((s) => s.estimateResult);
  const estimateError = useShoppingList((s) => s.estimateError);
  const prefs = useShoppingList((s) => s.prefs);
  const setPrefs = useShoppingList((s) => s.setPrefs);
  const [newItem, setNewItem] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newItem.trim();
    if (!text) return;
    addItemToList(text);
    setNewItem("");
  };

  const toggleExpand = (id: number) => {
    const next = new Set(expandedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedItems(next);
  };

  return (
    <div className="layout relative">
      <div className="fixed z-20 inline-block top-32 left-[500px]">
        <RoughNotation type="highlight" color="white" show padding={4}>
          <span className={`text-2xl ${caveat.className} font-semibold`}>
            Plan your shopping
          </span>
        </RoughNotation>
      </div>

      <Image
        src="/images/book.png"
        alt="Vintage notebook"
        fill
        className="object-contain select-none z-0"
        priority
      />
      <div className="absolute z-10 left-[500px] top-40 w-[420px] leading-8">
        <ul className="list-disc list-inside space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => toggleItemInList(item.id)}
              className={`${caveat.className} text-xl cursor-pointer select-none ${item.checked ? "line-through opacity-60" : ""}`}
              title="Click to toggle"
            >
              {item.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAdd} className="mt-3">
          <input
            type="text"
            placeholder="Add an item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className={`${caveat.className} text-red-600 text-xl w-96 bg-transparent outline-none border border-amber-900/40 focus:border-[#9D4839] border-solid placeholder-amber-900/50 py-1`}
          />
        </form>

        <div className="mt-4">
          <label className={`${caveat.className} text-lg`}>Currency: </label>
          <select
            value={prefs.currency}
            onChange={(e) => setPrefs({ currency: e.target.value })}
            className={`${caveat.className} bg-transparent border border-amber-900/40`}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UGX">UGX</option>
          </select>
        </div>
      </div>

      <button
        onClick={estimatePrices}
        disabled={estimating || items.length === 0}
        className={`absolute z-20 left-[500px] bottom-40 ${caveat.className} px-4 py-1 text-lg tracking-wide text-[#6b4226] border-none cursor-pointer select-none hover:text-white hover:bg-[#9D4839] ${estimating ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {estimating ? "Estimating..." : "Click to estimate prices"}
      </button>

      {estimateError && (
        <div
          className={`absolute z-10 left-[500px] bottom-20 text-red-600 ${caveat.className} text-lg`}
        >
          Error: {estimateError}
        </div>
      )}

      {estimateResult && (
        <div className="absolute z-10 left-[1050px] top-40 w-[420px] leading-8">
          <div className="absolute z-20 inline-block -top-8 -left-4">
            <span className={`text-2xl ${caveat.className} font-semibold`}>
              Price Estimates
            </span>
          </div>
          <ul className="list-disc list-inside space-y-2 mt-4">
            {estimateResult.items.map((estItem: EstimatedItem) => (
              <li key={estItem.id} className={`${caveat.className} text-xl`}>
                {estItem.normalized.name} ({estItem.normalized.quantity}{" "}
                {estItem.normalized.unit}):
                {estItem.best ? (
                  <>
                    {" "}
                    {estItem.estimatedPrice?.toFixed(2)}{" "}
                    {estimateResult.currency}
                    <a
                      href={estItem.best.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 underline"
                    >
                      Buy on {estItem.best.source}
                    </a>
                  </>
                ) : (
                  " No estimate"
                )}
                {estItem.candidates?.length > 1 && (
                  <button
                    onClick={() => toggleExpand(estItem.id)}
                    aria-expanded={expandedItems.has(estItem.id)}
                    title={
                      expandedItems.has(estItem.id)
                        ? "Tuck the alternatives away"
                        : "Peek at other shop options"
                    }
                    className={`ml-2 px-3 py-0.5 text-sm rounded-md border border-[#d9c6a5]
                      bg-[#f5e6c8]/90 text-[#6b4226] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_3px_rgba(0,0,0,0.2)]
                      hover:bg-[#f0e0be] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer select-none ${caveat.className}`}
                  >
                    {expandedItems.has(estItem.id)
                      ? "Tuck the alternatives away"
                      : "Peek at other shop options"}
                  </button>
                )}
                {expandedItems.has(estItem.id) && estItem.candidates && (
                  <ul className="ml-4 text-sm space-y-1">
                    {estItem.candidates.map((cand, idx) => (
                      <li key={idx}>
                        {cand.title}: {cand.price.toFixed(2)} {cand.currency} -{" "}
                        <a
                          href={cand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Buy
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className={`${caveat.className} text-lg`}>
              Subtotal: {estimateResult.subtotal.toFixed(2)}{" "}
              {estimateResult.currency}
            </p>
            <p className={`${caveat.className} text-lg`}>
              Fees (est.): {
                (
                  estimateResult.fees != null && estimateResult.fees < estimateResult.total
                    ? estimateResult.fees
                    : Math.max(0, estimateResult.total - estimateResult.subtotal)
                ).toFixed(2)
              } {estimateResult.currency}
            </p>
            <p className={`${caveat.className} text-xl font-bold`}>
              Total: {estimateResult.total.toFixed(2)} {estimateResult.currency}
            </p>
            {estimateResult.notes && (
                <ul className={`text-sm text-[#6b4226] list-disc list-inside mt-2 bg-[#f5e6c8]/60 mr-9 ${caveat.className}`}>
                  {estimateResult.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
