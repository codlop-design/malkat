import {
  categoryListingHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

export const DISCOVER_ITEM_CATEGORIES: CatalogSectionKey[] = [
  "books",
  "courses",
  "services",
  "guides",
];

export function discoverItemHref(index: number): string {
  const category = DISCOVER_ITEM_CATEGORIES[index];
  return category ? categoryListingHref(category) : "/products";
}
