import type { CategoryFilterItem } from "@/src/components/CategoryFilters";
import type { ServiceTypeApiItem } from "@/src/features/services/types";

const FALLBACK_ICONS: Record<number, string> = {
  1: "💬",
  2: "📱",
  3: "🛠️",
  4: "🤝",
};

export function mapServiceTypesToFilterCategories(
  types: ServiceTypeApiItem[],
): CategoryFilterItem<string>[] {
  const items = types.map(({ id, icon, title, count }) => ({
    id: String(id),
    icon: icon.trim() || FALLBACK_ICONS[id] || "📋",
    label: title,
    count,
  }));

  const allCount = items.reduce((sum, { count }) => sum + count, 0);

  return [
    { id: "all", icon: "✨", label: "الكل", count: allCount },
    ...items,
  ];
}
