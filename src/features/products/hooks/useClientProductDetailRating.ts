"use client";

import { useEffect } from "react";

import { getProductDetailsClient } from "@/src/features/products/api/getProductDetailsClient";
import { applyProductDetailRatingUpdate } from "@/src/features/products/api/fetchProductDetailRating";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";

type UseClientProductDetailRatingOptions = {
  category: CatalogSectionKey;
  slug: string;
  onDetailUpdated: React.Dispatch<React.SetStateAction<ProductDetailMeta>>;
};

export function useClientProductDetailRating({
  category,
  slug,
  onDetailUpdated,
}: UseClientProductDetailRatingOptions) {
  const { isAuthReady } = useAuth();

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const refreshed = await getProductDetailsClient(category, slug);
      if (cancelled || !refreshed) {
        return;
      }

      onDetailUpdated((current) => ({
        ...applyProductDetailRatingUpdate(current, refreshed.detail),
        isBought: refreshed.detail.isBought,
      }));
    })();

    return () => {
      cancelled = true;
    };
  }, [category, slug, isAuthReady, onDetailUpdated]);
}
