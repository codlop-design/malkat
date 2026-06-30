"use client";

import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { getProductDetailsClient } from "@/src/features/products/api/getProductDetailsClient";
import { applyProductDetailRatingUpdate } from "@/src/features/products/api/fetchProductDetailRating";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { resolveDetailIsBought } from "@/src/features/products/utils/catalogSocial";

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
  const { setProductBought } = useFavourites();

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
        isBought: resolveDetailIsBought(
          current.isBought,
          refreshed.detail.isBought,
        ),
      }));

      setProductBought(category, slug, refreshed.detail.isBought === true);
    })();

    return () => {
      cancelled = true;
    };
  }, [category, slug, isAuthReady, onDetailUpdated, setProductBought]);
}
