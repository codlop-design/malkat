import type { MetadataRoute } from "next";

import { getAllProductParams } from "@/src/features/products/data/catalogAccess";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import { getAllNewsSlugs } from "@/src/features/news/data/news";
import { categoryListingHref } from "@/src/features/products/types";

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/products",
  "/news",
  "/news/all",
  "/services",
  "/request-service",
  "/request-partnership",
  "/register-your-interest",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATALOG_SECTION_KEYS.map(
    (category) => ({
      url: `${SITE_URL}${categoryListingHref(category)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const productEntries: MetadataRoute.Sitemap = getAllProductParams().map(
    ({ category, slug }) => ({
      url: `${SITE_URL}/products/${category}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const newsEntries: MetadataRoute.Sitemap = getAllNewsSlugs().map((slug) => ({
    url: `${SITE_URL}/news/all/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
    ...newsEntries,
  ];
}
