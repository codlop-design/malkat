export type ProductCategoryId =
  | "all"
  | "books"
  | "activities"
  | "courses"
  | "services"
  | "guides";

export type CatalogSectionKey = Exclude<ProductCategoryId, "all">;

export const VISIBLE_BY_CATEGORY: Record<
  ProductCategoryId,
  CatalogSectionKey[]
> = {
  all: ["books", "activities", "courses", "services", "guides"],
  books: ["books"],
  activities: ["activities"],
  courses: ["courses"],
  services: ["services"],
  guides: ["guides"],
};

export function isProductCategoryId(value: string): value is ProductCategoryId {
  return value in VISIBLE_BY_CATEGORY;
}

export function parseProductCategory(
  param: string | null | undefined,
): ProductCategoryId {
  if (param && isProductCategoryId(param)) return param;
  return "all";
}

export function categoryFilterHref(category: ProductCategoryId): string {
  if (category === "all") return "/products";
  return `/products?category=${category}`;
}
