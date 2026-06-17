import type { CategoryFilterItem } from "@/src/components/CategoryFilters";
import type { ProductCategoryId } from "@/src/features/products/types";

export const PRODUCT_CATEGORY_OPTIONS = [
  { id: "all", icon: "✨", label: "الكل" },
  { id: "courses", icon: "🎓", label: "البرامج" },
  { id: "books", icon: "📚", label: "الكتب" },
  { id: "activities", icon: "🎮", label: "الأنشطة و التدريبات" },
  { id: "guides", icon: "📖", label: "أدلة إجرائية" },
] as const satisfies readonly Omit<
  CategoryFilterItem<ProductCategoryId>,
  "count"
>[];

export function buildProductCategories(
  totals: Record<Exclude<ProductCategoryId, "all">, number>,
): CategoryFilterItem<ProductCategoryId>[] {
  // "services" are not shown in the products filter UI, so exclude them from "all".
  const allTotal =
    totals.books + totals.activities + totals.courses + totals.guides;

  return PRODUCT_CATEGORY_OPTIONS.map(({ id, icon, label }) => ({
    id,
    icon,
    label,
    count: id === "all" ? allTotal : totals[id],
  }));
}
