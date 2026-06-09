import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  CatalogApiItem,
  CatalogPagination,
} from "@/src/features/products/types/catalogApi";
import { apiClient } from "@/src/lib/apiClient";

type CatalogListApiResponse = {
  success?: boolean;
  message?: string;
  data?: CatalogApiItem[];
  pagination?: CatalogPagination;
};

export type CatalogListClientResult = {
  items: CatalogListItem[];
  pagination: CatalogPagination;
};

export async function getCatalogListClient(
  category: CatalogSectionKey,
  page = 1,
  search?: string,
): Promise<CatalogListClientResult | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];
  const trimmedSearch = search?.trim();
  const params: Record<string, string | number> = {
    page,
    per_page: 8,
  };

  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  const { data, status } = await apiClient.get<CatalogListApiResponse>(endpoint, {
    params,
    validateStatus: () => true,
  });

  if (status >= 400 || !data?.success || !Array.isArray(data.data)) {
    return null;
  }

  return {
    items: mapCatalogItems(category, data.data),
    pagination: data.pagination ?? {
      current_page: page,
      last_page: 1,
      per_page: data.data.length,
      total: data.data.length,
      from: data.data.length > 0 ? 1 : 0,
      to: data.data.length,
    },
  };
}
