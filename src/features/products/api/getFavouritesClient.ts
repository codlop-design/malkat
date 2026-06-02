import { apiClient } from "@/src/lib/apiClient";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { CatalogApiItem } from "@/src/features/products/types/catalogApi";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";

type FavouritesApiResponse = {
  success?: boolean;
  message?: string;
  data?:
    | CatalogApiItem[]
    | {
        favourites_count?: number;
        items?: CatalogApiItem[];
      };
};

const FAVOURITES_ENDPOINT: Record<CatalogSectionKey, string> = {
  books: "/favourites/books",
  courses: "/favourites/courses",
  services: "/favourites/services",
  activities: "/favourites/activities",
  // API calls them evidences; UI calls them guides.
  guides: "/favourites/evidences",
};

export async function getFavourites(
  category: CatalogSectionKey,
): Promise<CatalogListItem[]> {
  const endpoint = FAVOURITES_ENDPOINT[category];
  const { data, status } = await apiClient.get<FavouritesApiResponse>(endpoint, {
    validateStatus: () => true,
  });

  if (status >= 400 || data?.success === false) {
    return [];
  }

  const payload = data?.data;
  const items = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && Array.isArray(payload.items)
      ? payload.items
      : [];
  return mapCatalogItems(category, items);
}

