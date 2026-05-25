import { notFound } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import { getProductDetails } from "@/src/features/products/api/getProductDetails";
import { getSimilarProducts } from "@/src/features/products/api/getSimilarProducts";
import ProductDetailPageContent from "@/src/features/products/components/detail/ProductDetailPageContent";
import {
  CATEGORY_DETAIL_LABEL,
  CATEGORY_META,
  isCatalogSectionKey,
} from "@/src/features/products/data/categoryMeta";
import { categoryListingHref } from "@/src/features/products/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categoryParam, slug } = await params;

  if (!isCatalogSectionKey(categoryParam)) {
    notFound();
  }

  const [detailView, related] = await Promise.all([
    getProductDetails(categoryParam, slug),
    getSimilarProducts(categoryParam, slug),
  ]);

  if (!detailView) {
    notFound();
  }

  const { label: categoryLabel } = CATEGORY_META[categoryParam];
  const detailLabel = CATEGORY_DETAIL_LABEL[categoryParam];

  return (
    <>
      <PageHeader
        title={detailView.product.data.title}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          { label: categoryLabel, href: categoryListingHref(categoryParam) },
          { label: detailLabel },
        ]}
      />
      <ProductDetailPageContent
        product={detailView.product}
        detail={detailView.detail}
        related={related}
      />
    </>
  );
}
