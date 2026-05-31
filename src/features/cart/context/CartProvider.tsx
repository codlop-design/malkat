"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { getCategoryIcon } from "@/src/features/cart/data/categoryIcons";
import {
  buildCartItemId,
  readCartFromSession,
  writeCartToSession,
} from "@/src/features/cart/lib/cartStorage";
import type {
  AddToCartPayload,
  CartItemCategory,
  StoredCartItem,
} from "@/src/features/cart/types/cart-types";

type CartContextValue = {
  items: StoredCartItem[];
  itemCount: number;
  groupedItems: CartItemCategory[];
  isHydrated: boolean;
  addItem: (payload: AddToCartPayload, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function groupCartItems(items: StoredCartItem[]): CartItemCategory[] {
  const groups = new Map<CatalogSectionKey, StoredCartItem[]>();

  for (const item of items) {
    const existing = groups.get(item.category) ?? [];
    existing.push(item);
    groups.set(item.category, existing);
  }

  return Array.from(groups.entries()).map(([category, categoryItems]) => ({
    id: category,
    title: CATEGORY_META[category].label,
    icon: getCategoryIcon(category),
    items: categoryItems,
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readCartFromSession());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    writeCartToSession(items);
  }, [items, isHydrated]);

  const addItem = useCallback((payload: AddToCartPayload, quantity = 1) => {
    setItems((current) => {
      const id = buildCartItemId(payload.category, payload.slug);
      const existing = current.find((item) => item.id === id);

      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { ...payload, id, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) => {
      if (quantity < 1) {
        return current.filter((item) => item.id !== id);
      }

      return current.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const groupedItems = useMemo(() => groupCartItems(items), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      groupedItems,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      groupedItems,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
