import type { CatalogSectionKey } from "@/src/features/products/types";

export type AddToCartPayload = {
  category: CatalogSectionKey;
  slug: string;
  title: string;
  description: string;
  image: string;
  isFree?: boolean;
  isOnline?: boolean;
  level?: string;
  ageRange?: string;
  duration?: string;
  sessions?: string;
  instructorName?: string;
  instructorAvatar?: string;
};

export type StoredCartItem = AddToCartPayload & {
  id: string;
  quantity: number;
};

export type OrderLineItem = {
  type: string;
  slug: string;
  quantity?: number;
};

export type CartItem = StoredCartItem;

export type CartItemCategory = {
  title: string;
  icon: React.ReactNode;
  items: CartItem[];
  id: string;
};

export type SideCartProps = {
  isLoading?: boolean;
};

export type PlaceOrderResult = {
  success: boolean;
  message: string;
};
