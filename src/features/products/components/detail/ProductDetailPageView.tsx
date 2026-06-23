import PageHeader from "@/src/components/PageHeader";
import ProductDetailPageContent from "@/src/features/products/components/detail/ProductDetailPageContent";
import type { ProductDetailPageData } from "@/src/features/products/api/loadProductDetailPageData";
import { buildCatalogProductDetailBreadcrumbs } from "@/src/features/products/lib/buildProductDetailBreadcrumbs";

type ProductDetailPageViewProps = ProductDetailPageData;

export default function ProductDetailPageView({
  category,
  detailView,
  related,
  courseStages,
}: ProductDetailPageViewProps) {
  return (
    <>
      <PageHeader
        title={detailView.product.data.title}
        breadcrumbs={buildCatalogProductDetailBreadcrumbs(category)}
      />
      <ProductDetailPageContent
        product={detailView.product}
        detail={detailView.detail}
        related={related}
        courseStages={courseStages}
      />
    </>
  );
}
