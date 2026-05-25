import type { MetadataRoute } from "next";
import { collectSitemapEntries } from "@/src/lib/sitemap/collectSitemapData";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return collectSitemapEntries();
}
