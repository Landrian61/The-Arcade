import { create } from "zustand";

// Types
export interface ShoppingItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface ShoppingListStore {
  title: string;
  items: ShoppingItem[];
  addItem: (text: string) => void;
  toggleItem: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
  setTitle: (title: string) => void;
  setItems: (items: ShoppingItem[]) => void;
}

const defaultItems: ShoppingItem[] = [
  { id: 1, text: "Fresh basil leaves", checked: false },
  { id: 2, text: "Organic tomatoes", checked: true },
  { id: 3, text: "Mozzarella cheese", checked: false },
  { id: 4, text: "Extra virgin olive oil", checked: false },
  { id: 5, text: "Balsamic vinegar", checked: true },
  { id: 6, text: "Sourdough bread", checked: false },
  { id: 7, text: "Fresh garlic", checked: false },
  { id: 8, text: "Sea salt", checked: false },
];

export const useShoppingList = create<ShoppingListStore>((set, get) => ({
  title: "Shopping List",
  items: defaultItems,
  addItem: (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newItem: ShoppingItem = {
      id: Date.now(),
      text: trimmed,
      checked: false,
    };
    set({ items: [...get().items, newItem] });
  },
  toggleItem: (id: number) => {
    set({
      items: get().items.map((it) =>
        it.id === id ? { ...it, checked: !it.checked } : it
      ),
    });
  },
  removeItem: (id: number) => {
    set({ items: get().items.filter((it) => it.id !== id) });
  },
  clear: () => set({ items: [] }),
  setTitle: (title: string) => set({ title }),
  setItems: (items: ShoppingItem[]) => set({ items }),
}));

export default useShoppingList;
