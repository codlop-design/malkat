import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { CatalogApiItem } from "@/src/features/products/types/catalogApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type SimilarProductsApiResponse = {
  success: boolean;
  message: string;
  data: CatalogApiItem[];
};

export async function getSimilarProducts(
  category: CatalogSectionKey,
  slug: string,
): Promise<CatalogProduct[]> {
  const endpoint = CATALOG_API_ENDPOINTS[category];

  try {
    const response = await fetch(`${API_URL}${endpoint}/${slug}/similar`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const json = (await response.json()) as SimilarProductsApiResponse;

    if (!json.success) {
      return [];
    }

    return mapCatalogItems(category, json.data).map((data) => ({
      category,
      data,
    })) as CatalogProduct[];
  } catch {
    return [];
  }
}
