import type { CatalogSectionKey } from "@/src/features/products/types";

export const CATALOG_API_ENDPOINTS: Record<CatalogSectionKey, string> = {
  books: "/books",
  courses: "/courses",
  services: "/services",
  activities: "/activities",
  guides: "/evidences",
};
