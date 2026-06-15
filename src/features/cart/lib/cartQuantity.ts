import type { CatalogSectionKey } from "@/src/features/products/types";

export function isQuantityAdjustableCategory(
  category: CatalogSectionKey,
): boolean {
  return category === "books";
}
