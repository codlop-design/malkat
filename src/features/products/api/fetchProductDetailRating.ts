import { getProductDetailsClient } from "@/src/features/products/api/getProductDetailsClient";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";
import {
  isDetailRatingEqual,
  mergeDetailRatingFields,
  pickDetailRatingFields,
} from "@/src/features/products/utils/productDetailRating";

export async function fetchProductDetailRatingUpdate(
  category: CatalogSectionKey,
  slug: string,
  current: ProductDetailMeta,
): Promise<ProductDetailMeta | null> {
  const refreshed = await getProductDetailsClient(category, slug);
  if (!refreshed) {
    return null;
  }

  const currentRating = pickDetailRatingFields(current);
  const freshRating = pickDetailRatingFields(refreshed.detail);

  if (isDetailRatingEqual(currentRating, freshRating)) {
    if (freshRating.isRated && !currentRating.isRated) {
      return mergeDetailRatingFields(current, freshRating);
    }
    return null;
  }

  return mergeDetailRatingFields(current, freshRating);
}

export function applyProductDetailRatingUpdate(
  current: ProductDetailMeta,
  refreshed: ProductDetailMeta,
): ProductDetailMeta {
  const currentRating = pickDetailRatingFields(current);
  const freshRating = pickDetailRatingFields(refreshed);

  if (isDetailRatingEqual(currentRating, freshRating)) {
    if (freshRating.isRated && !currentRating.isRated) {
      return mergeDetailRatingFields(current, freshRating);
    }
    return current;
  }

  return mergeDetailRatingFields(current, freshRating);
}
