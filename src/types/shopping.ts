export interface ShoppingItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface NormalizedItem {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface ProductCandidate {
  title: string;
  price: number;
  currency: string;
  url: string;
  source: string;
  image?: string;
}

export interface EstimatedItem {
  id: number;
  text: string;
  normalized: NormalizedItem;
  candidates: ProductCandidate[];
  best?: ProductCandidate;
  estimatedPrice?: number;
}

export interface EstimateResult {
  items: EstimatedItem[];
  currency: string;
  subtotal: number;
  fees?: number;
  total: number;
  notes?: string[];
}

export interface ShoppingPrefs {
  currency: string; // e.g., 'USD', 'UGX'
  country?: string; // e.g., 'US', 'UG'
  stores?: string[]; // e.g., ['google', 'amazon']
}

