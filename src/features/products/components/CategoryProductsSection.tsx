"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import Pagination from "@/src/components/Pagination";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import CourseBundleCard from "@/src/features/products/components/course-bundles/CourseBundleCard";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import { renderCatalogCard } from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { CourseBundle } from "@/src/features/products/types/courseBundle";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";
const SEARCH_DEBOUNCE_MS = 400;

type CategoryProductsSectionProps = {
  category: CatalogSectionKey;
  items: CatalogListItem[];
  pagination: CatalogPagination;
  courseBundles?: CourseBundle[];
  initialQuery?: string;
};

export default function CategoryProductsSection({
  category,
  items,
  pagination,
  courseBundles = [],
  initialQuery = "",
}: CategoryProductsSectionProps) {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();
  const { syncCatalogList } = useFavourites();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }

  const currentPage = pagination.current_page;
  const totalPages = Math.max(1, pagination.last_page);
  const { searchPlaceholder } = CATEGORY_META[category];
  const basePath = `/products/${category}`;

  useEffect(() => {
    if (!isAuthReady) return;

    void syncCatalogList(category, currentPage, initialQuery);
  }, [
    category,
    currentPage,
    initialQuery,
    isAuthReady,
    isAuthenticated,
    syncCatalogList,
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    const params = new URLSearchParams(window.location.search);

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    params.delete("page");

    const qs = params.toString();
    const nextUrl = qs ? `${basePath}?${qs}` : basePath;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedQuery, basePath, router]);

  const paginationSearchParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (initialQuery?.trim()) params.q = initialQuery.trim();
    return params;
  }, [initialQuery]);

  return (
    <section className="py-8">
      <div className="container">
        <div className="relative" dir="rtl">
          <Search
            className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-[#9CA3AF]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-14 w-full rounded-2xl border border-[#E5E5E5] bg-white ps-12 pe-4 text-sm text-black outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-primary"
          />
        </div>

        {category === "courses" && courseBundles.length > 0 ? (
          <div className="mt-8" dir="rtl">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">حزم البرامج</p>
                <h2 className="mt-1 text-xl font-bold text-black">
                  مسارات مختارة في تجربة واحدة
                </h2>
              </div>
            </div>
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courseBundles.map((bundle) => (
                <li key={bundle.slug} className="h-full">
                  <CourseBundleCard bundle={bundle} compact />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <ul
          className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          dir="rtl"
        >
          {items.map((item) => (
            <li key={item.slug} className="h-full">
              {renderCatalogCard(category, item)}
            </li>
          ))}
        </ul>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-[#717171]">
            لا توجد نتائج مطابقة.
          </p>
        ) : null}

        <div className="mt-10">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            basePath={basePath}
            searchParams={paginationSearchParams}
          />
        </div>
      </div>
    </section>
  );
}
