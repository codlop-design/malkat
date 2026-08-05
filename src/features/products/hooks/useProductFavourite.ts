"use client";

import { useEffect } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import type { CatalogSectionKey } from "@/src/features/products/types";

type UseProductFavouriteOptions = {
  syncMode?: "product" | "none";
};

export function useProductFavourite(
  category: CatalogSectionKey,
  slug: string,
  options: UseProductFavouriteOptions = {},
) {
  const { syncMode = "none" } = options;
  const { isAuthenticated, isAuthReady } = useAuth();
  const {
    isReady,
    isFavourite,
    hasFavourite,
    hasPurchase,
    syncProductFavourite,
  } = useFavourites();

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated || syncMode !== "product") return;
    if (hasFavourite(category, slug) && hasPurchase(category, slug)) return;

    void syncProductFavourite(category, slug);
  }, [
    category,
    slug,
    isAuthReady,
    isAuthenticated,
    syncMode,
    hasFavourite,
    hasPurchase,
    syncProductFavourite,
  ]);

  const isLoadingFavourites =
    isAuthenticated && isAuthReady && (!isReady || !hasFavourite(category, slug));

  return {
    isFavourite: isAuthenticated && hasFavourite(category, slug)
      ? isFavourite(category, slug)
      : false,
    isLoadingFavourites,
    canToggle:
      isAuthReady && (!isAuthenticated || (isReady && hasFavourite(category, slug))),
  };
}
