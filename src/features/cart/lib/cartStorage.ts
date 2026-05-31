import type { StoredCartItem } from "@/src/features/cart/types/cart-types";

const CART_STORAGE_KEY = "malkat-cart";

export function readCartFromSession(): StoredCartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = sessionStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCartToSession(items: StoredCartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function buildCartItemId(category: string, slug: string) {
  return `${category}:${slug}`;
}
