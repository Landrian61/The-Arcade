import { create } from "zustand";
import type { ShoppingItem, EstimateResult, ShoppingPrefs } from "@/types/shopping";

interface ShoppingListStore {
  items: ShoppingItem[];
  prefs: ShoppingPrefs;
  
  // Actions
  addItem: (text: string) => void;
  toggleItem: (id: number) => void;
  setPrefs: (prefs: Partial<ShoppingPrefs>) => void;
  
  // API State
  estimating: boolean;
  estimateResult: EstimateResult | null;
  estimateError: string | null;
  estimatePrices: () => Promise<void>;
}

export const useShoppingList = create<ShoppingListStore>((set, get) => ({
  items: [{ id: 1, text: "Yellow Bananas", checked: false }],
  prefs: { currency: "USD", country: "US" },
  estimating: false,
  estimateResult: null,
  estimateError: null,

  addItem: (text) => {
    if (!text.trim()) return;
    set((state) => ({
      items: [...state.items, { id: Date.now(), text: text.trim(), checked: false }]
    }));
  },

  toggleItem: (id) => {
    set((state) => ({
      items: state.items.map((it) => it.id === id ? { ...it, checked: !it.checked } : it)
    }));
  },

  setPrefs: (newPrefs) => set((state) => ({ prefs: { ...state.prefs, ...newPrefs } })),

  estimatePrices: async () => {
    set({ estimating: true, estimateError: null });
    try {
      const res = await fetch("/api/price-estimates", {
        method: "POST",
        body: JSON.stringify({ items: get().items, prefs: get().prefs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      set({ estimateResult: data });
    } catch (err: any) {
      set({ estimateError: err.message });
    } finally {
      set({ estimating: false });
    }
  },
}));