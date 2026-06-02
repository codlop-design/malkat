"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import CategoryFilters from "@/src/components/CategoryFilters";
import { buildProductCategories } from "@/src/features/products/data/categories";
import ProductCarousel from "@/src/features/products/components/ProductCarousel";
import {
  renderCatalogCard,
  type CatalogListItem,
} from "@/src/features/products/data/catalogRegistry";
import type { CatalogListsBySection } from "@/src/features/products/api/getCatalogList";
import {
  categoryFilterHref,
  categoryListingHref,
  parseProductCategory,
  VISIBLE_BY_CATEGORY,
  type CatalogSectionKey,
} from "@/src/features/products/types";

type SectionConfig = {
  title: string;
  viewAllHref: string;
  items: CatalogListItem[];
  renderSlide: (item: CatalogListItem) => ReactNode;
};

const SECTION_META: Record<
  CatalogSectionKey,
  Pick<SectionConfig, "title" | "viewAllHref">
> = {
  books: {
    title: "الكتب",
    viewAllHref: categoryListingHref("books"),
  },
  activities: {
    title: "الأنشطة",
    viewAllHref: categoryListingHref("activities"),
  },
  courses: {
    title: "الدورات",
    viewAllHref: categoryListingHref("courses"),
  },
  services: {
    title: "الخدمات",
    viewAllHref: "/services",
  },
  guides: {
    title: "أدلة إجرائية",
    viewAllHref: categoryListingHref("guides"),
  },
};

type DiscoverSectionClientProps = {
  catalogItems: CatalogListsBySection;
  initialCategory?: string | null;
};

export default function DiscoverSectionClient({
  catalogItems,
  initialCategory = null,
}: DiscoverSectionClientProps) {
  const category = parseProductCategory(initialCategory);

  const visibleSections = useMemo(
    () => VISIBLE_BY_CATEGORY[category],
    [category],
  );

  const filterCategories = useMemo(
    () =>
      buildProductCategories(
        Object.fromEntries(
          (Object.keys(catalogItems) as CatalogSectionKey[]).map((key) => [
            key,
            catalogItems[key].total,
          ]),
        ) as Record<CatalogSectionKey, number>,
      ),
    [catalogItems],
  );

  const catalogSections = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(SECTION_META) as CatalogSectionKey[]).map((key) => [
          key,
          {
            ...SECTION_META[key],
            items: catalogItems[key].items,
            renderSlide: (item: CatalogListItem) =>
              renderCatalogCard(key, item),
          },
        ]),
      ) as Record<CatalogSectionKey, SectionConfig>,
    [catalogItems],
  );

  return (
    <div>
      <section className="overflow-hidden pb-6 pt-6 md:pb-8 md:pt-8 lg:pb-10">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="order-2 max-w-xl space-y-4 text-right lg:order-1 lg:justify-self-start">
              <h1 className="text-2xl font-bold leading-snug text-black md:text-3xl lg:text-[40px] lg:leading-[1.35]">
                اكتشف عالماً من المحتوى التعليمي الممتع
              </h1>
              <p className="text-base leading-[1.85] text-[#454545] md:text-lg">
                تصفّح الكتب والأنشطة والدورات والمنتجات المصممة لتنمية مهارات
                الأطفال بطريقة عصرية وتفاعلية.
              </p>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:max-w-none">
              <Image
                src="/Group 16.svg"
                alt=""
                width={633}
                height={555}
                className="h-auto w-full"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl bg-[#F5F5F5] p-4 md:mt-12 lg:mt-14">
            <CategoryFilters
              active={category}
              categories={filterCategories}
              getHref={categoryFilterHref}
              ariaLabel="تصفية المنتجات"
            />
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container flex flex-col gap-10 md:gap-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleSections.map((key) => {
              const { title, viewAllHref, items, renderSlide } =
                catalogSections[key];
              return (
                <motion.div
                  key={key}
                  layout
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCarousel
                    title={title}
                    viewAllHref={viewAllHref}
                    items={items}
                    renderSlide={renderSlide}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
