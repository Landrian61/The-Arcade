"use client";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { RoughNotation } from "react-rough-notation";
import { useState, FormEvent } from "react";
import { useShoppingList } from "@/store/useShoppingList";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Page() {
  const items = useShoppingList((s) => s.items);
  const addItemToList = useShoppingList((s) => s.addItem);
  const toggleItemInList = useShoppingList((s) => s.toggleItem);
  const [newItem, setNewItem] = useState("");

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newItem.trim();
    if (!text) return;
    addItemToList(text);
    setNewItem("");
  };

  return (
    <div className="layout relative">
      <div className="fixed z-20 inline-block top-32 left-[500px]">
        <RoughNotation type="highlight" color="white" show padding={4}>
          <span className={`text-2xl ${caveat.className} font-semibold`}>
            Shopping List
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
              className={`${caveat.className} text-xl cursor-pointer select-none ${item.checked ? 'line-through opacity-60' : ''}`}
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
      </div>

      <button
        className={`absolute z-20 left-[500px] bottom-40 ${caveat.className} px-4 py-1 text-lg tracking-wide text-[#6b4226] border-none cursor-pointer select-none hover:text-white hover:bg-[#9D4839]
        `}
      >
        Estimate prices with AI
      </button>
    </div>
  );
}
