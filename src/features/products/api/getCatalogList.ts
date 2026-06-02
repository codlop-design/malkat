import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import { CATALOG_SECTION_KEYS } from "@/src/features/products/data/categoryMeta";
import { mapCatalogItems } from "@/src/features/products/mapCatalogItems";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type {
  CatalogApiItem,
  CatalogPagination,
} from "@/src/features/products/types/catalogApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

type CatalogListApiResponse = {
  success: boolean;
  message: string;
  data: CatalogApiItem[];
  pagination: CatalogPagination;
};

/**
 * Why the current implementation doesn't send HTTP-only cookies:
 * - **Client Components**: `fetch()` does NOT include cookies for cross-origin requests by default.
 *   You must opt in with `credentials: "include"` (and the backend must allow credentials via CORS).
 * - **Server Components / Route Handlers / Server Actions**: Next.js runs `fetch()` on the server,
 *   which has **no browser cookie jar**. The user's cookies exist only on the incoming request to
 *   Next.js, so you must explicitly forward them to your backend API.
 *
 * We detect runtime by checking `typeof window`:
 * - `undefined` => Server runtime (Server Component, Route Handler, Server Action)
 * - defined => Browser runtime (Client Component)
 *
 * This keeps the function usable from both server and client without forcing server-only imports
 * into client bundles.
 */
function isServerRuntime() {
  return typeof window === "undefined";
}

/**
 * Convert Next.js `cookies()` store into a standard `Cookie` header string.
 * We keep this isolated so `next/headers` is only imported dynamically on the server.
 */
async function getForwardedCookieHeader(): Promise<string | undefined> {
  // `next/headers` cannot be imported in client bundles; keep it server-only via dynamic import.
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const all = cookieStore.getAll();

  if (!all.length) return undefined;

  // Minimal cookie serialization for forwarding; values are already encoded by the browser.
  return all.map(({ name, value }) => `${name}=${value}`).join("; ");
}

export async function getCatalogList(
  category: CatalogSectionKey,
  page = 1,
  search?: string,
): Promise<CatalogListResult | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];
  const params = new URLSearchParams({
    page: String(page),
    per_page: "8",
  });
  const trimmedSearch = search?.trim();

  if (trimmedSearch) {
    params.set("search", trimmedSearch);
  }

  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    if (isServerRuntime()) {
      // Server Component / Route Handler / Server Action path:
      // forward incoming request cookies to the backend API.
      const cookieHeader = await getForwardedCookieHeader();
      if (cookieHeader) headers.Cookie = cookieHeader;
    }

    const response = await fetch(`${API_URL}${endpoint}?${params}`, {
      headers,
      // Client Component path: include cookies in cross-origin requests (requires CORS credentials).
      ...(isServerRuntime() ? {} : { credentials: "include" as const }),
      next: { revalidate: CATALOG_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = (await response.json()) as CatalogListApiResponse;

    if (!json.success) {
      return null;
    }

    return {
      items: mapCatalogItems(category, json.data),
      pagination: json.pagination,
    };
  } catch (error) {
    console.error("Fetch exception:", error);
    return null;
  }
}

export async function getAllCatalogLists(): Promise<CatalogListsBySection> {
  const entries = await Promise.all(
    CATALOG_SECTION_KEYS.map(async (category) => {
      const result = await getCatalogList(category, 1);
      return [
        category,
        {
          items: result?.items ?? [],
          total: result?.pagination.total ?? 0,
        },
      ] as const;
    }),
  );

  return Object.fromEntries(entries) as CatalogListsBySection;
}
