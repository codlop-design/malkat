export type ServiceTypeApiItem = {
  id: number;
  icon: string;
  title: string;
  count: number;
};

/** `"all"` or a numeric type id from `/services-types`. */
export type ServiceCategoryId = "all" | string;

export function parseServiceCategory(
  param: string | null | undefined,
): ServiceCategoryId {
  if (!param || param === "all") return "all";
  if (/^\d+$/.test(param)) return param;
  return "all";
}

export function serviceCategoryHref(category: ServiceCategoryId): string {
  if (category === "all") return "/services";
  return `/services?category=${category}`;
}

export function parseServicePage(
  param: string | null | undefined,
): number {
  const page = Number(param);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

export function servicesPaginationSearchParams(
  category: ServiceCategoryId,
): Record<string, string> {
  if (category === "all") return {};
  return { category };
}
