"use client";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { resolveDetailIsBought } from "@/src/features/products/utils/catalogSocial";

export function useProductIsBought(
  category: CatalogSectionKey | undefined,
  slug: string | undefined,
  initialIsBought = false,
): boolean {
  const { isAuthenticated } = useAuth();
  const { hasPurchase, isProductBought } = useFavourites();

  if (!category || !slug) {
    return initialIsBought === true;
  }

  const fromContext =
    isAuthenticated && hasPurchase(category, slug)
      ? isProductBought(category, slug)
      : undefined;

  return resolveDetailIsBought(initialIsBought, fromContext) === true;
}
