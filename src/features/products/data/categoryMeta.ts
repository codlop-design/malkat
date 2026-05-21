import type { CatalogSectionKey } from "@/src/features/products/types";

export type CategoryMeta = {
  label: string;
  searchPlaceholder: string;
};

export const CATEGORY_META: Record<CatalogSectionKey, CategoryMeta> = {
  books: { label: "الكتب", searchPlaceholder: "ابحث عن كتاب..." },
  activities: { label: "الأنشطة", searchPlaceholder: "ابحث عن نشاط..." },
  courses: { label: "الدورات", searchPlaceholder: "ابحث عن دورة..." },
  services: { label: "الخدمات", searchPlaceholder: "ابحث عن خدمة..." },
  guides: { label: "أدلة إجرائية", searchPlaceholder: "ابحث عن دليل..." },
};

export const CATALOG_SECTION_KEYS = Object.keys(
  CATEGORY_META,
) as CatalogSectionKey[];

export function isCatalogSectionKey(value: string): value is CatalogSectionKey {
  return value in CATEGORY_META;
}
