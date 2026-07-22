import type { CategoryFilterItem } from "@/src/components/CategoryFilters";
import type { ProductCategoryId } from "@/src/features/products/types";

export const PRODUCT_CATEGORY_OPTIONS = [
  { id: "all", icon: "✨", label: "الكل" },
  { id: "courses", icon: "🎓", label: "البرامج" },
  { id: "books", icon: "📚", label: "الكتب" },
  { id: "guides", icon: "📖", label: "الأدلة إجرائية" },
] as const satisfies readonly Omit<
  CategoryFilterItem<ProductCategoryId>,
  "count"
>[];

export function buildProductCategories(
  totals: Record<Exclude<ProductCategoryId, "all">, number>,
): CategoryFilterItem<ProductCategoryId>[] {
  // "services" and "activities" are not shown in the products filter UI.
  const allTotal = totals.books + totals.courses + totals.guides;

  return PRODUCT_CATEGORY_OPTIONS.map(({ id, icon, label }) => ({
    id,
    icon,
    label,
    count: id === "all" ? allTotal : totals[id],
  }));
}
