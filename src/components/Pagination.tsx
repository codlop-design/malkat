"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
};

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>,
) {
  const params = new URLSearchParams(searchParams);
  if (page > 1) params.set("page", String(page));
  else params.delete("page");
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({
  page,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2"
      dir="rtl"
      aria-label="ترقيم الصفحات"
    >
      <Link
        href={buildHref(basePath, 1, searchParams)}
        aria-label="الصفحة الأولى"
        className="flex size-9 items-center justify-center rounded-full text-[#454545] transition-colors hover:bg-[#F5F5F5] disabled:pointer-events-none disabled:opacity-40"
        aria-disabled={page === 1}
      >
        <ChevronsRight className="size-4" strokeWidth={2} />
      </Link>
      <Link
        href={buildHref(basePath, Math.max(1, page - 1), searchParams)}
        aria-label="الصفحة السابقة"
        className="flex size-9 items-center justify-center rounded-full text-[#454545] transition-colors hover:bg-[#F5F5F5] disabled:pointer-events-none disabled:opacity-40"
        aria-disabled={page === 1}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(basePath, p, searchParams)}
          aria-current={p === page ? "page" : undefined}
          className={`flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            p === page
              ? "bg-(--primary) text-white"
              : "text-[#454545] hover:bg-[#F5F5F5]"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={buildHref(basePath, Math.min(totalPages, page + 1), searchParams)}
        aria-label="الصفحة التالية"
        className="flex size-9 items-center justify-center rounded-full text-[#454545] transition-colors hover:bg-[#F5F5F5] disabled:pointer-events-none disabled:opacity-40"
        aria-disabled={page === totalPages}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </Link>
      <Link
        href={buildHref(basePath, totalPages, searchParams)}
        aria-label="الصفحة الأخيرة"
        className="flex size-9 items-center justify-center rounded-full text-[#454545] transition-colors hover:bg-[#F5F5F5] disabled:pointer-events-none disabled:opacity-40"
        aria-disabled={page === totalPages}
      >
        <ChevronsLeft className="size-4" strokeWidth={2} />
      </Link>
    </nav>
  );
}
