import "server-only";

import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type {
  CatalogListResult,
  CatalogListsBySection,
} from "@/src/features/products/api/catalogList.types";
import { CATALOG_REVALIDATE_SECONDS } from "@/src/features/products/api/catalogList.types";
import { resolveCatalogApiUrl } from "@/src/features/products/api/resolveCatalogApiUrl";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  CatalogApiItem,
  CatalogPagination,
} from "@/src/features/products/types/catalogApi";
import { getServerApiFetchOptions } from "@/src/lib/serverApiHeaders";

export type {
  CatalogListResult,
  CatalogListsBySection,
  CatalogSectionResult,
} from "@/src/features/products/api/catalogList.types";
export { CATALOG_REVALIDATE_SECONDS } from "@/src/features/products/api/catalogList.types";

type CatalogListApiResponse = {
  success: boolean;
  message: string;
  data: CatalogApiItem[];
  pagination: CatalogPagination;
};

export async function getCatalogList(
  category: CatalogSectionKey,
  page = 1,
  search?: string,
): Promise<CatalogListResult | null> {
  const url = await resolveCatalogApiUrl(category, page, search);

  try {
    const fetchOptions = await getServerApiFetchOptions(CATALOG_REVALIDATE_SECONDS);
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = (await response.json()) as CatalogListApiResponse;

    if (!json.success) {
      return null;
    }

    return {
      items: mapCatalogItems(category, json.data),
      pagination: json.pagination,
    };
  } catch (error) {
    console.error("Fetch exception:", error);
    return null;
  }
}

export async function getAllCatalogLists(): Promise<CatalogListsBySection> {
  const entries = await Promise.all(
    CATALOG_SECTION_KEYS.map(async (category) => {
      const result = await getCatalogList(category, 1);
      return [
        category,
        {
          items: result?.items ?? [],
          total: result?.pagination.total ?? 0,
        },
      ] as const;
    }),
  );

  return Object.fromEntries(entries) as CatalogListsBySection;
}
