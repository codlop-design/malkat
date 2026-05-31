import {
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { CatalogSectionKey } from "@/src/features/products/types";

const CATEGORY_ICONS: Record<CatalogSectionKey, LucideIcon> = {
  books: BookOpen,
  courses: GraduationCap,
  services: Briefcase,
  activities: Sparkles,
  guides: FileText,
};

export function getCategoryIcon(category: CatalogSectionKey) {
  const Icon = CATEGORY_ICONS[category];
  return <Icon className="size-5 text-[#404040]" strokeWidth={1.5} aria-hidden />;
}
