import { GoogleGenAI } from "@google/genai";
import type { ShoppingItem, ShoppingPrefs, EstimateResult } from "@/types/shopping";

// Initialize the gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define schema as a standard JSON Schema
const schema = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          estimatedPrice: { type: "number" },
          normalized: {
            type: "object",
            properties: {
              name: { type: "string" },
              quantity: { type: "number" },
              unit: { type: "string" },
            },
            required: ["name", "quantity", "unit"],
          },
          best: {
            type: "object",
            properties: {
              title: { type: "string" },
              url: { type: "string" },
              source: { type: "string" },
            },
          },
        },
        required: ["id", "normalized"],
      },
    },
    currency: { type: "string" },
    subtotal: { type: "number" },
    total: { type: "number" },
    fees: { type: "number" },
  },
  required: ["items", "total", "currency"],
} as const;

export async function generateEstimatesWithGemini(
  items: ShoppingItem[],
  prefs: ShoppingPrefs
): Promise<EstimateResult> {
  
  const prompt = `
    You are a shopping assistant. 
    1. Normalize items (name, quantity, unit).
    2. Find the best price candidate for ${prefs.currency}.
    3. If no live data, estimate based on standard market prices in ${prefs.country || "US"}.
    Input Items: ${JSON.stringify(items)}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: schema,
    },
  });

  const jsonText = response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  const parsed = JSON.parse(jsonText) as EstimateResult;
  return parsed;
}