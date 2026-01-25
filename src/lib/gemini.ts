import { GoogleGenAI } from "@google/genai";
import type { NormalizedResponse, ShoppingItem, ShoppingPrefs } from "@/types/shopping";

// Initialize the gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          normalized: {
            type: "object",
            properties: {
              name: { type: "string" },
              quantity: { type: "number" },
              unit: { type: "string" },
              notes: { type: "string" },
            },
            required: ["name", "quantity", "unit"],
          },
          search_query: { type: "string" },
        },
        required: ["id", "normalized", "search_query"],
      },
    },
  },
  required: ["items"],
} as const;

export async function normalizeItemsWithGemini(
  items: ShoppingItem[],
  prefs: ShoppingPrefs
): Promise<NormalizedResponse> {
  
  const prompt = `
    You are a shopping assistant. For each input item:
    - Normalize to: name (canonical product name), quantity (number), unit (e.g., kg, pack), notes (optional extra details).
    - Propose an optimal Google Shopping search query (include quantity/unit for accuracy, e.g., "2 kg yellow bananas Uganda" for local relevance in ${prefs.country || "US"}).
    Input Items: ${JSON.stringify(items)}
    Return only JSON matching the schema.
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
  const parsed = JSON.parse(jsonText) as NormalizedResponse;
  return parsed;
}