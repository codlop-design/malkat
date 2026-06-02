"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import { getFavourites } from "@/src/features/products/api/getFavouritesClient";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { applyFavouriteSlugs } from "@/src/features/products/utils/applyFavouriteSlugs";

/** Merges authenticated user's favourites into catalog items (browser credentials). */
export function useCatalogItemsWithFavourites(
  category: CatalogSectionKey,
  items: CatalogListItem[],
): CatalogListItem[] {
  const { isAuthenticated, isAuthReady } = useAuth();
  const [mergedItems, setMergedItems] = useState(items);

  useEffect(() => {
    setMergedItems(items);
  }, [items]);

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) {
      return;
    }

    let cancelled = false;

    void getFavourites(category).then((favourites) => {
      if (cancelled) {
        return;
      }

      const slugs = new Set(favourites.map((item) => item.slug));
      setMergedItems(applyFavouriteSlugs(items, slugs));
    });

    return () => {
      cancelled = true;
    };
  }, [category, items, isAuthReady, isAuthenticated]);

  return mergedItems;
}
