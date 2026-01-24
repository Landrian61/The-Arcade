import { NextResponse } from "next/server";
import type { ShoppingItem, ShoppingPrefs, EstimateResult } from "@/types/shopping";
import { generateEstimatesWithGemini } from "@/server/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const items: ShoppingItem[] = body.items;
    const prefs: ShoppingPrefs = body.prefs || { currency: "USD" };

    const result: EstimateResult = await generateEstimatesWithGemini(items, prefs);
    return NextResponse.json(result);
  } catch (e: any) {
    const message = e?.message || "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
