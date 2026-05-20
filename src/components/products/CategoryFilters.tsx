"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardList,
  Gift,
  GraduationCap,
  Sparkles,
  Zap,
} from "lucide-react";

export type ProductCategoryId =
  | "all"
  | "books"
  | "activities"
  | "courses"
  | "services"
  | "guides";

type Category = {
  id: ProductCategoryId;
  label: string;
  count: number;
  icon: LucideIcon;
};

const CATEGORIES: Category[] = [
  { id: "all", label: "الكل", count: 247, icon: Sparkles },
  { id: "books", label: "الكتب", count: 84, icon: BookOpen },
  { id: "activities", label: "الأنشطة", count: 65, icon: ClipboardList },
  { id: "courses", label: "الدورات", count: 40, icon: GraduationCap },
  { id: "services", label: "الخدمات", count: 33, icon: Zap },
  { id: "guides", label: "أدلة إجرائية", count: 25, icon: Gift },
];

type CategoryFiltersProps = {
  active: ProductCategoryId;
  onChange: (id: ProductCategoryId) => void;
};

export default function CategoryFilters({
  active,
  onChange,
}: CategoryFiltersProps) {
  return (
    <div
      className="flex justify-center gap-3 overflow-x-auto pb-1 scrollbar-none"
      dir="rtl"
      role="tablist"
      aria-label="تصفية المنتجات"
    >
      {CATEGORIES.map(({ id, label, count, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`flex shrink-0 flex-1 items-center justify-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors md:px-5 md:py-3 md:text-base ${
              isActive
                ? "border-(--primary) bg-(--primary) text-white shadow-sm"
                : "border-[#E5E5E5] bg-white text-[#454545] hover:border-[#D4D4D4]"
            }`}
          >
            {!isActive || id !== "all" ? (
              <Icon
                className="size-5 shrink-0"
                strokeWidth={1.75}
                aria-hidden
              />
            ) : null}
            <span>{label}</span>
            <span
              className={`flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                isActive
                  ? "bg-white text-(--primary)"
                  : "bg-[#F5F5F5] text-[#717171]"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
