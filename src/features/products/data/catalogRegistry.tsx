"use client";

import type { ReactNode } from "react";

import ActivityCard, {
  type ActivityCardProps,
} from "@/src/features/products/components/cards/ActivityCard";
import BookCard, {
  type BookCardProps,
} from "@/src/features/products/components/cards/BookCard";
import CourseCard, {
  type CourseCardProps,
} from "@/src/features/products/components/cards/CourseCard";
import GuideCard, {
  type GuideCardProps,
} from "@/src/features/products/components/cards/GuideCard";
import ServiceCard, {
  type ServiceCardProps,
} from "@/src/features/products/components/cards/ServiceCard";
import {
  ACTIVITIES_ITEMS,
  BOOKS_ITEMS,
  COURSES_ITEMS,
  GUIDES_ITEMS,
  SERVICES_ITEMS,
} from "@/src/features/products/data/catalog";
import type { CatalogSectionKey } from "@/src/features/products/types";

export type CatalogListItem = { id?: string; title: string; description: string };

type CatalogRegistryEntry = {
  items: CatalogListItem[];
  renderCard: (item: CatalogListItem) => ReactNode;
};

function asCatalog<T extends { id?: string; title: string; description: string }>(
  items: T[],
): CatalogListItem[] {
  return items;
}

export const CATALOG_REGISTRY: Record<CatalogSectionKey, CatalogRegistryEntry> =
  {
    books: {
      items: asCatalog(BOOKS_ITEMS),
      renderCard: (item) => <BookCard {...(item as BookCardProps)} />,
    },
    activities: {
      items: asCatalog(ACTIVITIES_ITEMS),
      renderCard: (item) => <ActivityCard {...(item as ActivityCardProps)} />,
    },
    courses: {
      items: asCatalog(COURSES_ITEMS),
      renderCard: (item) => <CourseCard {...(item as CourseCardProps)} />,
    },
    services: {
      items: asCatalog(SERVICES_ITEMS),
      renderCard: (item) => <ServiceCard {...(item as ServiceCardProps)} />,
    },
    guides: {
      items: asCatalog(GUIDES_ITEMS),
      renderCard: (item) => <GuideCard {...(item as GuideCardProps)} />,
    },
  };

export function getCatalogItems(category: CatalogSectionKey): CatalogListItem[] {
  return CATALOG_REGISTRY[category].items;
}

export function renderCatalogCard(
  category: CatalogSectionKey,
  item: CatalogListItem,
): ReactNode {
  return CATALOG_REGISTRY[category].renderCard(item);
}

export function searchCatalogItems(
  category: CatalogSectionKey,
  items: CatalogListItem[],
  query: string,
): CatalogListItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const haystack = [
      item.title,
      item.description,
      getCatalogSearchExtra(category, item),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

function getCatalogSearchExtra(
  category: CatalogSectionKey,
  item: CatalogListItem,
): string {
  if (category === "books") return (item as BookCardProps).author ?? "";
  return "";
}
