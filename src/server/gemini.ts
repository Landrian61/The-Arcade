import type {
  ShoppingItem,
  ShoppingPrefs,
  EstimateResult,
  EstimatedItem,
} from "@/types/shopping";

type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-pro";

// JSON Schema matching EstimateResult type (simplified for the model)
const estimateResultSchema: JsonValue = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          text: { type: "string" },
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
          candidates: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                price: { type: "number" },
                currency: { type: "string" },
                url: { type: "string" },
                source: { type: "string" },
                image: { type: "string" },
              },
              required: ["title", "price", "currency", "url", "source"],
            },
          },
          best: {
            type: "object",
            properties: {
              title: { type: "string" },
              price: { type: "number" },
              currency: { type: "string" },
              url: { type: "string" },
              source: { type: "string" },
              image: { type: "string" },
            },
          },
          estimatedPrice: { type: "number" },
        },
        required: ["id", "text", "normalized", "candidates"],
      },
    },
    currency: { type: "string" },
    subtotal: { type: "number" },
    fees: { type: "number" },
    total: { type: "number" },
    notes: { type: "array", items: { type: "string" } },
  },
  required: ["items", "currency", "subtotal", "total"],
};

function buildInstruction() {
  return [
    "You are a shopping assistant.",
    "Normalize each item to name, quantity, unit.",
    "Return candidates with title, price, currency, url, and source.",
    "Pick the best candidate per item and set estimatedPrice (in prefs.currency).",
    "If you cannot access live data, provide robust store search URLs (Google/Amazon/Walmart) for the query.",
    "Output ONLY JSON matching the provided schema. No markdown, no extra prose.",
  ].join(" ");
}

function buildUserPayload(items: ShoppingItem[], prefs: ShoppingPrefs): string {
  return JSON.stringify({ items, prefs });
}

function stripCodeFences(s: string): string {
  let t = s.trim();
  if (t.startsWith("```")) {
    t = t.replace(/^```[a-zA-Z]*\n?/, "");
  }
  if (t.endsWith("```")) {
    t = t.replace(/```$/, "");
  }
  return t.trim();
}

export async function generateEstimatesWithGemini(
  items: ShoppingItem[],
  prefs: ShoppingPrefs,
  opts?: { model?: string; apiKey?: string }
): Promise<EstimateResult> {
  const apiKey = opts?.apiKey || process.env.GEMINI_API_KEY;
  const model = opts?.model || DEFAULT_MODEL;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;

  const contents = [
    {
      role: "user",
      parts: [
        { text: buildInstruction() },
        { text: "\nINPUT:" },
        { text: buildUserPayload(items, prefs) },
      ],
    },
  ];

  const body = {
    contents,
    generationConfig: {
      temperature: 0.0,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
      responseSchema: estimateResultSchema,
    },
  } as const;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Gemini error: ${res.status} ${res.statusText} ${msg}`);
  }

  const data = (await res.json()) as any;
  // Gemini REST returns candidates[0].content.parts[0].text
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const jsonText = stripCodeFences(text);
  const parsed = JSON.parse(jsonText) as EstimateResult;
  return parsed;
}

