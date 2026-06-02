import "server-only";

import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { getRequestSiteUrl } from "@/src/lib/requestSiteUrl";

/** Builds the catalog list URL (same-origin /auth-api when configured). */
export async function resolveCatalogApiUrl(
  category: CatalogSectionKey,
  page: number,
  search?: string,
): Promise<string> {
  const endpoint = CATALOG_API_ENDPOINTS[category];
  const params = new URLSearchParams({
    page: String(page),
    per_page: "8",
  });
  const trimmedSearch = search?.trim();

  if (trimmedSearch) {
    params.set("search", trimmedSearch);
  }

  const query = params.toString();
  const path = `${endpoint}?${query}`;

  const authApiBase = process.env.NEXT_PUBLIC_AUTH_API_URL?.replace(/\/$/, "");
  if (authApiBase?.startsWith("/")) {
    const site = await getRequestSiteUrl();
    return `${site}${authApiBase}${path}`;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  return `${apiBase}${path}`;
}
