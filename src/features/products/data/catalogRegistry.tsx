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
import { resolveProductHref } from "@/src/features/products/types";

export type CatalogListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

type CatalogRegistryEntry = {
  items: CatalogListItem[];
  renderCard: (item: CatalogListItem) => ReactNode;
};

function withCatalogCardProps<T extends { slug: string }>(
  category: CatalogSectionKey,
  item: T,
): T & { category: CatalogSectionKey; href: string } {
  return {
    ...item,
    category,
    href: resolveProductHref(category, item.slug),
  };
}

function asCatalog<T extends CatalogListItem>(items: T[]): CatalogListItem[] {
  return items;
}

export const CATALOG_REGISTRY: Record<CatalogSectionKey, CatalogRegistryEntry> =
  {
    books: {
      items: asCatalog(BOOKS_ITEMS),
      renderCard: (item) => (
        <BookCard {...withCatalogCardProps("books", item as BookCardProps)} />
      ),
    },
    activities: {
      items: asCatalog(ACTIVITIES_ITEMS),
      renderCard: (item) => (
        <ActivityCard
          {...withCatalogCardProps("activities", item as ActivityCardProps)}
        />
      ),
    },
    courses: {
      items: asCatalog(COURSES_ITEMS),
      renderCard: (item) => (
        <CourseCard {...withCatalogCardProps("courses", item as CourseCardProps)} />
      ),
    },
    services: {
      items: asCatalog(SERVICES_ITEMS),
      renderCard: (item) => (
        <ServiceCard
          {...withCatalogCardProps("services", item as ServiceCardProps)}
        />
      ),
    },
    guides: {
      items: asCatalog(GUIDES_ITEMS),
      renderCard: (item) => (
        <GuideCard {...withCatalogCardProps("guides", item as GuideCardProps)} />
      ),
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
      item.slug,
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
