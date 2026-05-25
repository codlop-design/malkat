import type { MetadataRoute } from "next";

import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import {
  categoryListingHref,
  productDetailHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";
import type {
  CatalogApiItem,
  CatalogPagination,
} from "@/src/features/products/types/catalogApi";
import type { NewsApiItem, NewsPagination } from "@/src/features/news/types";
import { absoluteUrl } from "@/src/lib/siteUrl";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SITEMAP_REVALIDATE = 3600;

type SitemapLink = {
  href: string;
  label: string;
};

export type SitemapSection = {
  title: string;
  links: SitemapLink[];
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: CatalogPagination | NewsPagination;
};

async function fetchApiPage<T>(
  path: string,
  page: number,
): Promise<PaginatedResponse<T> | null> {
  try {
    const response = await fetch(`${API_URL}${path}?page=${page}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: SITEMAP_REVALIDATE },
    });

    if (!response.ok) return null;

    const json = (await response.json()) as {
      success: boolean;
      data: T[];
      pagination: CatalogPagination | NewsPagination;
    };

    if (!json.success) return null;

    return { data: json.data, pagination: json.pagination };
  } catch {
    return null;
  }
}

async function collectAllPaginated<T>(
  fetchPath: string,
): Promise<T[]> {
  const first = await fetchApiPage<T>(fetchPath, 1);
  if (!first) return [];

  const items = [...first.data];
  const { last_page: lastPage } = first.pagination;

  if (lastPage <= 1) return items;

  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      fetchApiPage<T>(fetchPath, index + 2),
    ),
  );

  for (const page of rest) {
    if (page) items.push(...page.data);
  }

  return items;
}

async function getCatalogItemsByCategory(
  category: CatalogSectionKey,
): Promise<CatalogApiItem[]> {
  return collectAllPaginated<CatalogApiItem>(CATALOG_API_ENDPOINTS[category]);
}

async function getAllNewsItems(): Promise<NewsApiItem[]> {
  return collectAllPaginated<NewsApiItem>("/news");
}

const STATIC_ROUTES: Array<{
  path: string;
  label: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", label: "الرئيسية", priority: 1, changeFrequency: "daily" },
  { path: "/about", label: "من نحن", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", label: "المنتجات", priority: 0.9, changeFrequency: "daily" },
  { path: "/services", label: "الخدمات", priority: 0.8, changeFrequency: "weekly" },
  { path: "/news", label: "الأخبار", priority: 0.8, changeFrequency: "daily" },
  { path: "/news/all", label: "كل الأخبار", priority: 0.7, changeFrequency: "daily" },
  { path: "/contact", label: "تواصل معنا", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/register-your-interest",
    label: "سجل اهتمامك",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    path: "/request-service",
    label: "اطلب خدمة",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    path: "/request-partnership",
    label: "اطلب شراكة",
    priority: 0.5,
    changeFrequency: "monthly",
  },
];

const CATEGORY_LABELS: Record<CatalogSectionKey, string> = {
  books: "الكتب",
  activities: "الأنشطة",
  courses: "الدورات",
  services: "الخدمات",
  guides: "أدلة إجرائية",
};

export async function collectSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const category of CATALOG_SECTION_KEYS) {
    entries.push({
      url: absoluteUrl(categoryListingHref(category)),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    });
  }

  const catalogByCategory = await Promise.all(
    CATALOG_SECTION_KEYS.map(async (category) => ({
      category,
      items: await getCatalogItemsByCategory(category),
    })),
  );

  for (const { category, items } of catalogByCategory) {
    for (const item of items) {
      if (!item.slug) continue;
      entries.push({
        url: absoluteUrl(productDetailHref(category, item.slug)),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const newsItems = await getAllNewsItems();
  for (const item of newsItems) {
    if (!item.slug) continue;
    entries.push({
      url: absoluteUrl(`/news/all/${item.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }

  return entries;
}

export async function collectSitemapSections(): Promise<SitemapSection[]> {
  const sections: SitemapSection[] = [
    {
      title: "الصفحات الرئيسية",
      links: STATIC_ROUTES.map((route) => ({
        href: route.path,
        label: route.label,
      })),
    },
    {
      title: "أقسام المنتجات",
      links: CATALOG_SECTION_KEYS.map((category) => ({
        href: categoryListingHref(category),
        label: CATEGORY_LABELS[category],
      })),
    },
  ];

  const [catalogByCategory, newsItems] = await Promise.all([
    Promise.all(
      CATALOG_SECTION_KEYS.map(async (category) => ({
        category,
        items: await getCatalogItemsByCategory(category),
      })),
    ),
    getAllNewsItems(),
  ]);

  for (const { category, items } of catalogByCategory) {
    if (items.length === 0) continue;

    sections.push({
      title: CATEGORY_LABELS[category],
      links: items.map((item) => ({
        href: productDetailHref(category, item.slug),
        label: item.title,
      })),
    });
  }

  if (newsItems.length > 0) {
    sections.push({
      title: "الأخبار",
      links: newsItems.map((item) => ({
        href: `/news/all/${item.slug}`,
        label: item.title,
      })),
    });
  }

  return sections;
}
