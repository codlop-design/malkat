import type { CatalogSectionKey } from "@/src/features/products/types";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  CATEGORY_META,
  CATALOG_SECTION_KEYS,
  isCatalogSectionKey,
} from "@/src/features/products/data/categoryMeta";

import PageHeader from "@/src/components/PageHeader";
import CategoryProductsSection from "@/src/features/products/components/CategoryProductsSection";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return CATALOG_SECTION_KEYS.map((category) => ({ category }));
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;

  if (!isCatalogSectionKey(slug)) {
    notFound();
  }

  const category = slug as CatalogSectionKey;
  const { label } = CATEGORY_META[category];

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
      <Suspense fallback={<div className="min-h-[480px]" aria-hidden />}>
        <CategoryProductsSection category={category} />
      </Suspense>
    </>
  );
}
