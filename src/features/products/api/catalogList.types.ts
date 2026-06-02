import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";

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
