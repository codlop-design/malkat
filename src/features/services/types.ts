export type ServiceCategoryId =
  | "all"
  | "consultations"
  | "programs"
  | "workshops"
  | "initiatives";

export function isServiceCategoryId(
  value: string,
): value is ServiceCategoryId {
  return ["all", "consultations", "programs", "workshops", "initiatives"].includes(
    value,
  );
}

export function parseServiceCategory(
  param: string | null | undefined,
): ServiceCategoryId {
  if (param && isServiceCategoryId(param)) return param;
  return "all";
}

export function serviceCategoryHref(category: ServiceCategoryId): string {
  if (category === "all") return "/services";
  return `/services?category=${category}`;
}
