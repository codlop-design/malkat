"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
import CategoryFilters from "@/src/components/CategoryFilters";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import CourseBundleCard from "@/src/features/products/components/course-bundles/CourseBundleCard";
import { buildProductCategories } from "@/src/features/products/data/categories";
import ProductCarousel from "@/src/features/products/components/ProductCarousel";
import {
  renderCatalogCard,
  type CatalogListItem,
} from "@/src/features/products/data/catalogRegistry";
import type { CatalogListsBySection } from "@/src/features/products/api/catalogList.types";
import type { CourseBundle } from "@/src/features/products/types/courseBundle";
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

type DiscoverSectionKey = Exclude<CatalogSectionKey, "services">;

const SECTION_META: Record<
  DiscoverSectionKey,
  Pick<SectionConfig, "title" | "viewAllHref">
> = {
  books: {
    title: "الكتب",
    viewAllHref: categoryListingHref("books"),
  },
  activities: {
    title: "الأنشطة و التدريبات",
    viewAllHref: categoryListingHref("activities"),
  },
  courses: {
    title: "البرامج",
    viewAllHref: categoryListingHref("courses"),
  },
  guides: {
    title: "الأدلة إجرائية",
    viewAllHref: categoryListingHref("guides"),
  },
};

type DiscoverSectionClientProps = {
  catalogItems: CatalogListsBySection;
  courseBundles?: CourseBundle[];
  courseBundlesTotal?: number;
  initialCategory?: string | null;
};

export default function DiscoverSectionClient({
  catalogItems,
  courseBundles = [],
  courseBundlesTotal,
  initialCategory = null,
}: DiscoverSectionClientProps) {
  const category = parseProductCategory(initialCategory);
  const { isAuthenticated, isAuthReady } = useAuth();
  const { syncCatalogList } = useFavourites();

  const visibleSections = useMemo(
    () =>
      VISIBLE_BY_CATEGORY[category].filter(
        (key): key is DiscoverSectionKey => key !== "services",
      ),
    [category],
  );

  const filterCategories = useMemo(
    () =>
      buildProductCategories(
        {
          books: catalogItems.books.total,
          activities: catalogItems.activities.total,
          courses: courseBundlesTotal ?? courseBundles.length,
          services: catalogItems.services.total,
          guides: catalogItems.guides.total,
        },
      ),
    [catalogItems, courseBundles.length, courseBundlesTotal],
  );

  const catalogSections = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(SECTION_META) as DiscoverSectionKey[]).map((key) => [
          key,
          {
            ...SECTION_META[key],
            items: catalogItems[key].items,
            renderSlide: (item: CatalogListItem) =>
              renderCatalogCard(key, item),
          },
        ]),
      ) as Record<DiscoverSectionKey, SectionConfig>,
    [catalogItems],
  );

  const courseSectionItems = useMemo(
    () => [
      ...courseBundles.map((bundle) => ({
        kind: "bundle" as const,
        id: `bundle-${bundle.id}`,
        slug: `bundle-${bundle.slug}`,
        bundle,
      })),
      ...catalogItems.courses.items.map((item) => ({
        kind: "course" as const,
        id: item.id,
        slug: item.slug,
        item,
      })),
    ],
    [catalogItems.courses.items, courseBundles],
  );

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    for (const key of visibleSections) {
      void syncCatalogList(key, 1);
    }
  }, [visibleSections, isAuthReady, isAuthenticated, syncCatalogList]);

  return (
    <div>
      <section className="overflow-hidden pb-6 pt-6 md:pb-8 md:pt-8 lg:pb-10">
        <div className="container">
          {/* <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="order-2 max-w-xl space-y-4 text-right lg:order-1 lg:justify-self-start">
              <h1 className="text-2xl font-bold leading-snug text-black md:text-3xl lg:text-[40px] lg:leading-[1.35]">
                اكتشف عالماً من المحتوى التعليمي الممتع
              </h1>
              <p className="text-base leading-[1.85] text-[#454545] md:text-lg">
                تصفّح الكتب والأنشطة والبرامج والمنتجات المصممة لتنمية مهارات
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
          </div> */}

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

              if (key === "courses") {
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
                      items={courseSectionItems}
                      getKey={(item) => item.id}
                      renderSlide={(item) =>
                        item.kind === "bundle" ? (
                          <CourseBundleCard bundle={item.bundle} />
                        ) : (
                          renderCatalogCard("courses", item.item)
                        )
                      }
                    />
                  </motion.div>
                );
              }

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
