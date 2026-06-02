"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import type { CatalogListsBySection } from "@/src/features/products/api/getCatalogList";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import { getFavourites } from "@/src/features/products/api/getFavouritesClient";
import { applyFavouriteSlugs } from "@/src/features/products/utils/applyFavouriteSlugs";

/** Merges authenticated user's favourites into all catalog sections. */
export function useCatalogListsWithFavourites(
  catalogItems: CatalogListsBySection,
): CatalogListsBySection {
  const { isAuthenticated, isAuthReady } = useAuth();
  const [merged, setMerged] = useState(catalogItems);

  useEffect(() => {
    setMerged(catalogItems);
  }, [catalogItems]);

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) {
      return;
    }

    let cancelled = false;

    void Promise.all(
      CATALOG_SECTION_KEYS.map(async (category) => {
        const favourites = await getFavourites(category);
        return {
          category,
          slugs: new Set(favourites.map((item) => item.slug)),
        };
      }),
    ).then((sections) => {
      if (cancelled) {
        return;
      }

      const next = { ...catalogItems } as CatalogListsBySection;

      for (const { category, slugs } of sections) {
        next[category] = {
          ...next[category],
          items: applyFavouriteSlugs(catalogItems[category].items, slugs),
        };
      }

      setMerged(next);
    });

    return () => {
      cancelled = true;
    };
  }, [catalogItems, isAuthReady, isAuthenticated]);

  return merged;
}
