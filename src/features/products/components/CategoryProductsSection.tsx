"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

import Pagination from "@/src/components/Pagination";
import { CATEGORY_META } from "@/src/features/products/data/categoryMeta";
import {
  getCatalogItems,
  renderCatalogCard,
  searchCatalogItems,
} from "@/src/features/products/data/catalogRegistry";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { fadeUp, motionViewport } from "@/src/lib/motion";

const PAGE_SIZE = 10;

type CategoryProductsSectionProps = {
  category: CatalogSectionKey;
};

export default function CategoryProductsSection({
  category,
}: CategoryProductsSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const { searchPlaceholder } = CATEGORY_META[category];
  const basePath = `/products/${category}`;

  const filtered = useMemo(() => {
    return searchCatalogItems(category, getCatalogItems(category), query);
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

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
        <motion.form
          onSubmit={handleSearchSubmit}
          className="relative"
          dir="rtl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Search
            className="pointer-events-none absolute top-1/2 inset-s-4 size-5 -translate-y-1/2 text-[#9CA3AF]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-14 w-full rounded-2xl border border-[#E5E5E5] bg-white ps-12 pe-4 text-sm text-black outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-(--primary)"
          />
        </motion.form>

        <motion.ul
          className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          dir="rtl"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {pageItems.map((item) => (
            <motion.li
              key={item.id ?? item.title}
              variants={fadeUp}
              className="h-full"
            >
              {renderCatalogCard(category, item)}
            </motion.li>
          ))}
        </motion.ul>

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
