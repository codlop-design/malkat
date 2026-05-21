import type { ActivityCardProps } from "@/src/features/products/components/cards/ActivityCard";
import type { BookCardProps } from "@/src/features/products/components/cards/BookCard";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import {
  ACTIVITIES_ITEMS,
  BOOKS_ITEMS,
  COURSES_ITEMS,
  GUIDES_ITEMS,
  SERVICES_ITEMS,
} from "@/src/features/products/data/catalog";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import type { CatalogSectionKey } from "@/src/features/products/types";

export type CatalogProduct =
  | { category: "books"; data: BookCardProps }
  | { category: "activities"; data: ActivityCardProps }
  | { category: "courses"; data: CourseCardProps }
  | { category: "services"; data: ServiceCardProps }
  | { category: "guides"; data: GuideCardProps };

const CATALOG_BY_CATEGORY = {
  books: BOOKS_ITEMS,
  activities: ACTIVITIES_ITEMS,
  courses: COURSES_ITEMS,
  services: SERVICES_ITEMS,
  guides: GUIDES_ITEMS,
} as const;

export function getCatalogProduct(
  category: CatalogSectionKey,
  slug: string,
): CatalogProduct | undefined {
  const item = CATALOG_BY_CATEGORY[category].find((entry) => entry.slug === slug);
  if (!item) return undefined;
  return { category, data: item } as CatalogProduct;
}

export function getRelatedProducts(
  category: CatalogSectionKey,
  slug: string,
  limit = 5,
): CatalogProduct[] {
  return CATALOG_BY_CATEGORY[category]
    .filter((entry) => entry.slug !== slug)
    .slice(0, limit)
    .map((data) => ({ category, data }) as CatalogProduct);
}

export function getAllProductParams(): { category: string; slug: string }[] {
  const params: { category: string; slug: string }[] = [];
  for (const category of CATALOG_SECTION_KEYS) {
    for (const item of CATALOG_BY_CATEGORY[category]) {
      params.push({ category, slug: item.slug });
    }
  }
  return params;
}
