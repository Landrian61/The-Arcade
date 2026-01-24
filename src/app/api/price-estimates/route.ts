import { NextResponse } from "next/server";
import { generateEstimatesWithGemini } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body?.items?.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const estimates = await generateEstimatesWithGemini(
      body.items, 
      body.prefs || { currency: "USD" }
    );

    return NextResponse.json(estimates);
    
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Estimation failed" }, 
      { status: 500 }
    );
  }
}