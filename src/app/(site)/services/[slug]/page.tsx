import { notFound } from "next/navigation";

import PageHeader from "@/src/components/PageHeader";
import { getProductDetails } from "@/src/features/products/api/getProductDetails";
import { getSimilarProducts } from "@/src/features/products/api/getSimilarProducts";
import ProductDetailPageContent from "@/src/features/products/components/detail/ProductDetailPageContent";
import { CATEGORY_DETAIL_LABEL } from "@/src/features/products/data/categoryMeta";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryParam = "services" as const;

  const [detailView, related] = await Promise.all([
    getProductDetails(categoryParam, slug),
    getSimilarProducts(categoryParam, slug),
  ]);

  if (!detailView) {
    notFound();
  }

  const detailLabel = CATEGORY_DETAIL_LABEL[categoryParam];

  return (
    <>
      <PageHeader
        title={detailView.product.data.title}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخدمات", href: "/services" },
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
