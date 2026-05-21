import type { CategoryFilterItem } from "@/src/components/CategoryFilters";
import type { ProductCategoryId } from "@/src/features/products/types";

export const PRODUCT_CATEGORIES: readonly CategoryFilterItem<ProductCategoryId>[] =
  [
    { id: "all", icon: "✨", label: "الكل", count: 247 },
    { id: "books", icon: "📚", label: "الكتب", count: 84 },
    { id: "activities", icon: "🎮", label: "الأنشطة", count: 65 },
    { id: "courses", icon: "🎓", label: "الدورات", count: 40 },
    { id: "services", icon: "💼", label: "الخدمات", count: 33 },
    { id: "guides", icon: "📖", label: "أدلة إجرائية", count: 25 },
  ] as const;
