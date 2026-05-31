import type { CatalogSectionKey } from "@/src/features/products/types";
import { notFound } from "next/navigation";
import {
  CATEGORY_META,
  CATALOG_SECTION_KEYS,
  isCatalogSectionKey,
} from "@/src/features/products/data/categoryMeta";
import { getCatalogList } from "@/src/features/products/api/getCatalogList";

import PageHeader from "@/src/components/PageHeader";
import CategoryProductsSection from "@/src/features/products/components/CategoryProductsSection";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
};

export function generateStaticParams() {
  return CATALOG_SECTION_KEYS.map((category) => ({ category }));
}

export default async function ProductCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category: slug } = await params;
  const { page: pageParam, q } = await searchParams;

  if (!isCatalogSectionKey(slug)) {
    notFound();
  }

  const category = slug as CatalogSectionKey;
  const page = Math.max(1, Number(pageParam) || 1);
  const catalog = await getCatalogList(category, page);

  const { label } = CATEGORY_META[category];
  const items = catalog?.items ?? [];
  const pagination = catalog?.pagination ?? {
    current_page: page,
    last_page: 1,
    per_page: items.length,
    total: items.length,
    from: items.length > 0 ? 1 : 0,
    to: items.length,
  };

  return (
    <>
      <PageHeader
        title={label}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          { label },
        ]}
      />
      <CategoryProductsSection
        category={category}
        items={items}
        pagination={pagination}
        initialQuery={q}
      />
    </>
  );
}
