import type { CatalogSectionKey } from "@/src/features/products/types";

const ORDER_TYPES: Record<CatalogSectionKey, string> = {
  books: "books",
  courses: "courses",
  services: "services",
  activities: "activities",
  guides: "evidences",
};

export function toOrderType(category: CatalogSectionKey): string {
  return ORDER_TYPES[category];
}
