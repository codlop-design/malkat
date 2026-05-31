import type { CategoryFilterItem } from "@/src/components/CategoryFilters";
import type { ProductCategoryId } from "@/src/features/products/types";

export const PRODUCT_CATEGORY_OPTIONS = [
  { id: "all", icon: "✨", label: "الكل" },
  { id: "books", icon: "📚", label: "الكتب" },
  { id: "activities", icon: "🎮", label: "الأنشطة" },
  { id: "courses", icon: "🎓", label: "الدورات" },
  { id: "services", icon: "💼", label: "الخدمات" },
  { id: "guides", icon: "📖", label: "أدلة إجرائية" },
] as const satisfies readonly Omit<
  CategoryFilterItem<ProductCategoryId>,
  "count"
>[];

export function buildProductCategories(
  totals: Record<Exclude<ProductCategoryId, "all">, number>,
): CategoryFilterItem<ProductCategoryId>[] {
  const allTotal = Object.values(totals).reduce((sum, count) => sum + count, 0);

  return PRODUCT_CATEGORY_OPTIONS.map(({ id, icon, label }) => ({
    id,
    icon,
    label,
    count: id === "all" ? allTotal : totals[id],
  }));
}
