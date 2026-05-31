"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import Pagination from "@/src/components/Pagination";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";
import {
  renderCatalogCard,
  searchCatalogItems,
} from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";

type CategoryProductsSectionProps = {
  category: CatalogSectionKey;
  items: CatalogListItem[];
  pagination: CatalogPagination;
  initialQuery?: string;
};

export default function CategoryProductsSection({
  category,
  items,
  pagination,
  initialQuery = "",
}: CategoryProductsSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const currentPage = pagination.current_page;
  const totalPages = Math.max(1, pagination.last_page);
  const { searchPlaceholder } = CATEGORY_META[category];
  const basePath = `/products/${category}`;

  const pageItems = useMemo(() => {
    return searchCatalogItems(category, items, query);
  }, [category, items, query]);

  const paginationSearchParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (query.trim()) params.q = query.trim();
    return params;
  }, [query]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.replace(qs ? `${basePath}?${qs}` : basePath);
  }

  return (
    <section className="py-8">
      <div className="container">
        <form onSubmit={handleSearchSubmit} className="relative" dir="rtl">
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
        </form>

        <ul
          className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          dir="rtl"
        >
          {pageItems.map((item) => (
            <li key={item.slug} className="h-full">
              {renderCatalogCard(category, item)}
            </li>
          ))}
        </ul>

        {pageItems.length === 0 ? (
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
