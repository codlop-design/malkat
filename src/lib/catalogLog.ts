const ENABLED =
  process.env.NODE_ENV === "development" ||
  process.env.CATALOG_DEBUG === "true" ||
  process.env.NEXT_PUBLIC_CATALOG_DEBUG === "true";

/** Always log catalog API responses (filter console by `[CATALOG_API]`). */
export const CATALOG_API_LOG_ALWAYS = true;

export function isCatalogLogEnabled(): boolean {
  return ENABLED || CATALOG_API_LOG_ALWAYS;
}

/** Logs to browser console (client) or terminal (server). Filter by `[CATALOG:scope]`. */
export function catalogLog(
  scope: string,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (!isCatalogLogEnabled()) {
    return;
  }

  const tag = `[CATALOG:${scope}]`;
  if (data) {
    console.log(tag, message, data);
  } else {
    console.log(tag, message);
  }
}

export function summarizeCatalogApiItems(
  items: { slug?: string; is_favourite?: boolean }[],
  limit = 8,
) {
  return items.slice(0, limit).map((item) => ({
    slug: item.slug ?? null,
    is_favourite: item.is_favourite ?? null,
  }));
}

export function summarizeCatalogMappedItems(
  items: { slug: string; isFavourite?: boolean }[],
  limit = 8,
) {
  return items.slice(0, limit).map((item) => ({
    slug: item.slug,
    isFavourite: item.isFavourite ?? null,
  }));
}
