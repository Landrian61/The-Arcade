import { NextResponse } from "next/server";
import { normalizeItemsWithGemini } from "@/lib/gemini";
import type {
  ShoppingPrefs,
  EstimatedItem,
  ProductCandidate,
} from "@/types/shopping";

async function getExchangeRates() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
    if (!res.ok) return null;
    const data = await res.json();
    return data.rates;
  } catch {
    return null;
  }
}

async function fetchCandidates(
  query: string,
  prefs: ShoppingPrefs,
): Promise<ProductCandidate[]> {
  if (!process.env.SERPER_KEY) {
    console.error("SERPER_KEY is missing");
    return [];
  }

  const payload = {
    q: query,
    engine: "google_shopping",
    gl: prefs.country?.toLowerCase() || "ug",
    hl: "en",
    location: prefs.location || "Kampala, Uganda",
  };

  try {
    const res = await fetch("https://google.serper.dev/shopping", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Serper error (${res.status}): ${errText}`);
      return [];
    }

    const json = await res.json();
    const results = json.shopping || [];

    return results.slice(0, 5).map((r: any) => {
      let currency = r.currency;
      
      if (!currency && r.price) {
        const priceStr = r.price.toString();
        if (priceStr.includes("$")) currency = "USD";
        else if (priceStr.includes("€")) currency = "EUR";
        else if (priceStr.includes("£")) currency = "GBP";
        else if (priceStr.includes("UGX") || priceStr.includes("USh")) currency = "UGX";
        else if (priceStr.includes("KES") || priceStr.includes("KSh")) currency = "KES";
      }

      return {
        title: r.title || "Unknown product",
        price: r.extracted_price || parseFloat(r.price?.replace(/[^0-9.]/g, "")) || 0,
        currency: currency,
        url: r.link || r.product_link || "#",
        source: r.source || r.store || "Unknown store",
        image: r.thumbnail || r.imageUrl || "",
      };
    });
  } catch (err: any) {
    console.error("Serper fetch error:", err.message);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.items?.length)
      return NextResponse.json({ error: "No items" }, { status: 400 });

    const prefs = body.prefs || {
      currency: "UGX",
      country: "UG",
      location: "Kampala, Uganda",
    };

    // Step 1: Normalize items with Gemini
    const normalized = await normalizeItemsWithGemini(body.items, prefs);

    // Step 2: Parallel fetch candidates + exchange rates
    const [candidatesResults, rates] = await Promise.all([
      Promise.allSettled(
        normalized.items.map((item: any) =>
          fetchCandidates(item.search_query, prefs),
        ),
      ),
      getExchangeRates(),
    ]);

    // Step 3: Build response
    let subtotal = 0;
    const estimatedItems: EstimatedItem[] = normalized.items.map(
      (normItem: any, index: number) => {
        const result = candidatesResults[index];
        const candidates = result.status === "fulfilled" ? result.value : [];
        const best =
          candidates.length > 0
            ? candidates.reduce((a: any, b: any) => (a.price < b.price ? a : b))
            : undefined;

        let finalPrice = 0;
        if (best && best.price > 0) {
          if (best.currency !== prefs.currency && rates) {
            const rateSource =
              best.currency === "EUR" ? 1 : (rates[best.currency] ?? 1);
            const rateTarget =
              prefs.currency === "EUR" ? 1 : (rates[prefs.currency] ?? 1);

            const priceInEUR = best.price / rateSource;
            finalPrice = priceInEUR * rateTarget;
          } else {
            finalPrice = best.price;
          }
          subtotal += finalPrice;
        }

        return {
          id: normItem.id,
          text: body.items.find((it: any) => it.id === normItem.id)?.text || "",
          normalized: normItem.normalized,
          candidates,
          best,
          estimatedPrice: best ? Number(finalPrice.toFixed(2)) : 0,
        };
      },
    );

    const fees = Number((subtotal * 0.1).toFixed(2));
    const total = Number((subtotal + fees).toFixed(2));

    return NextResponse.json({
      items: estimatedItems,
      currency: prefs.currency,
      subtotal,
      fees,
      total,
      notes: [
        "Live prices from Google Shopping",
        "Prices may vary by seller & location",
      ],
    });
  } catch (error: any) {
    console.error("Price estimation failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 },
    );
  }
}
