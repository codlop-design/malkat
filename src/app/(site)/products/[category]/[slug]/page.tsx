import { notFound } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import ProductDetailPageContent from "@/src/features/products/components/detail/ProductDetailPageContent";
import {
  getAllProductParams,
  getCatalogProduct,
} from "@/src/features/products/data/catalogAccess";
import {
  CATEGORY_DETAIL_LABEL,
  CATEGORY_META,
  isCatalogSectionKey,
} from "@/src/features/products/data/categoryMeta";
import { categoryListingHref } from "@/src/features/products/types";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllProductParams();
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categoryParam, slug } = await params;

  if (!isCatalogSectionKey(categoryParam)) {
    notFound();
  }

  const product = getCatalogProduct(categoryParam, slug);
  if (!product) {
    notFound();
  }

  const { label: categoryLabel } = CATEGORY_META[categoryParam];
  const detailLabel = CATEGORY_DETAIL_LABEL[categoryParam];

  return (
    <>
      <PageHeader
        title={categoryLabel}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          { label: categoryLabel, href: categoryListingHref(categoryParam) },
          { label: detailLabel },
        ]}
      />
      <ProductDetailPageContent product={product} />
    </>
  );
}
