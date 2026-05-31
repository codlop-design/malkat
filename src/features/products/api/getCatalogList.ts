import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  CatalogApiItem,
  CatalogPagination,
} from "@/src/features/products/types/catalogApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CATALOG_REVALIDATE_SECONDS = 60;

export type CatalogListResult = {
  items: CatalogListItem[];
  pagination: CatalogPagination;
};

export type CatalogSectionResult = {
  items: CatalogListItem[];
  total: number;
};

export type CatalogListsBySection = Record<
  CatalogSectionKey,
  CatalogSectionResult
>;

type CatalogListApiResponse = {
  success: boolean;
  message: string;
  data: CatalogApiItem[];
  pagination: CatalogPagination;
};

export async function getCatalogList(
  category: CatalogSectionKey,
  page = 1,
): Promise<CatalogListResult | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];

  try {
    const response = await fetch(`${API_URL}${endpoint}?page=${page}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: CATALOG_REVALIDATE_SECONDS },
    });

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
