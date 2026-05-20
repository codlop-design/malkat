"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  categoryFilterHref,
  type ProductCategoryId,
} from "@/src/features/products/types";

import "swiper/css";

type Category = {
  id: ProductCategoryId;
  icon: string;
  label: string;
  count: number;
};

const CATEGORIES: Category[] = [
  { id: "all", icon: "✨", label: "الكل", count: 247 },
  { id: "books", icon: "📚", label: "الكتب", count: 84 },
  { id: "activities", icon: "🎮", label: "الأنشطة", count: 65 },
  { id: "courses", icon: "🎓", label: "الدورات", count: 40 },
  { id: "services", icon: "💼", label: "الخدمات", count: 33 },
  { id: "guides", icon: "📖", label: "أدلة إجرائية", count: 25 },
];

const tapSpring = { type: "spring" as const, stiffness: 520, damping: 28 };

type CategoryFiltersProps = {
  active: ProductCategoryId;
};

export default function CategoryFilters({ active }: CategoryFiltersProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndex = CATEGORIES.findIndex((c) => c.id === active);

  useEffect(() => {
    if (activeIndex < 0 || !swiperRef.current) return;
    swiperRef.current.slideTo(activeIndex, 400);
  }, [activeIndex]);

  return (
    <div
      className="-mx-4 overflow-visible px-4 sm:mx-0 sm:px-0"
      dir="rtl"
      role="tablist"
      aria-label="تصفية المنتجات"
    >
      <Swiper
        modules={[FreeMode]}
        dir="rtl"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (activeIndex >= 0) swiper.slideTo(activeIndex, 0);
        }}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
        speed={400}
        grabCursor
        watchOverflow
        className="category-filters-swiper overflow-visible!"
        breakpoints={{
          1024: { spaceBetween: 16 },
        }}
      >
        {CATEGORIES.map(({ id, icon, label, count }) => {
          const isActive = active === id;
          return (
            <SwiperSlide key={id} className="w-auto!">
              <Link
                href={categoryFilterHref(id)}
                scroll={false}
                replace
                role="tab"
                aria-selected={isActive}
                aria-label={`${label} (${count})`}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 md:gap-3 md:px-5 md:py-3 md:text-base ${
                  isActive
                    ? "border border-transparent bg-(--primary) text-white shadow-none"
                    : "border border-[#E8E8E8] bg-white text-[#1F1F1F] shadow-[0_2px_10px_rgba(0,0,0,0.07)] hover:border-[#D4D4D4]"
                }`}
              >
                <motion.span
                  className="flex items-center gap-2.5 md:gap-3"
                  whileTap={{ scale: 0.96 }}
                  transition={tapSpring}
                >
                  <span className="text-base leading-none md:text-lg" aria-hidden>
                    {icon}
                  </span>
                  <span>{label}</span>
                  <span
                    className={`flex min-w-7 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-300 ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-[#E3F2FA] text-[#4A9BC4]"
                    }`}
                  >
                    {count}
                  </span>
                </motion.span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
