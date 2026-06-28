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
  allTotalCount: number,
): CategoryFilterItem<string>[] {
  const items = types.map(({ id, icon, title, count }) => ({
    id: String(id),
    icon: icon.trim() || FALLBACK_ICONS[id] || "📋",
    label: title,
    count,
  }));

  return [
    { id: "all", icon: "✨", label: "الكل", count: allTotalCount },
    ...items,
  ];
}
