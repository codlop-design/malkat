import type { CategoryFilterItem } from "@/src/components/CategoryFilters";
import type { ServiceCategoryId } from "@/src/features/services/types";

export const SERVICE_CATEGORIES: readonly CategoryFilterItem<ServiceCategoryId>[] =
  [
    { id: "all", icon: "✨", label: "الكل", count: 150 },
    { id: "consultations", icon: "💬", label: "الاستشارات التعليمية", count: 34 },
    { id: "programs", icon: "📱", label: "البرامج التفاعلية", count: 35 },
    { id: "workshops", icon: "🛠️", label: "ورش العمل", count: 52 },
    { id: "initiatives", icon: "🤝", label: "المبادرات المجتمعية", count: 24 },
  ] as const;
