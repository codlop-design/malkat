import "server-only";

import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type {
  CatalogListResult,
  CatalogListsBySection,
} from "@/src/features/products/api/catalogList.types";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  CatalogApiItem,
  CatalogPagination,
} from "@/src/features/products/types/catalogApi";
import { apiServer } from "@/src/lib/apiServer";

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
  const endpoint = CATALOG_API_ENDPOINTS[category];
  const trimmedSearch = search?.trim();
  const params: Record<string, string | number> = {
    page,
    per_page: 8,
  };

  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  try {
    const { data, status } = await apiServer.get<CatalogListApiResponse>(endpoint, {
      params,
      validateStatus: () => true,
    });

    if (status >= 400 || !data?.success) {
      console.error(`Fetch error: ${status}`);
      return null;
    }

    return {
      items: mapCatalogItems(category, data.data),
      pagination: data.pagination,
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
