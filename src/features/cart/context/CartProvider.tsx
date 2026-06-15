"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { getCategoryIcon } from "@/src/features/cart/data/categoryIcons";
import { isQuantityAdjustableCategory } from "@/src/features/cart/lib/cartQuantity";
import {
  buildCartItemId,
  readCartFromSession,
  writeCartToSession,
} from "@/src/features/cart/lib/cartStorage";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
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

function CartAuthSync() {
  const { isAuthenticated, isAuthReady } = useAuth();
  const { clearCart } = useCart();
  const wasAuthenticatedRef = useRef(false);

  useEffect(() => {
    if (!isAuthReady) return;

    if (isAuthenticated) {
      wasAuthenticatedRef.current = true;
      return;
    }

    if (wasAuthenticatedRef.current) {
      clearCart();
      wasAuthenticatedRef.current = false;
    }
  }, [isAuthenticated, isAuthReady, clearCart]);

  return null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StoredCartItem[]>(() => readCartFromSession());
  const [isHydrated] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;
    writeCartToSession(items);
  }, [items, isHydrated]);

  const addItem = useCallback((payload: AddToCartPayload, quantity = 1) => {
    const canAdjustQuantity = isQuantityAdjustableCategory(payload.category);
    const nextQuantity = canAdjustQuantity ? quantity : 1;

    setItems((current) => {
      const id = buildCartItemId(payload.category, payload.slug);
      const existing = current.find((item) => item.id === id);

      if (existing) {
        if (!canAdjustQuantity) {
          return current;
        }

        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + nextQuantity }
            : item,
        );
      }

      return [...current, { ...payload, id, quantity: nextQuantity }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id);
      if (!item || !isQuantityAdjustableCategory(item.category)) {
        return current;
      }

      if (quantity < 1) {
        return current.filter((entry) => entry.id !== id);
      }

      return current.map((entry) =>
        entry.id === id ? { ...entry, quantity } : entry,
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

  return (
    <CartContext.Provider value={value}>
      <CartAuthSync />
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
