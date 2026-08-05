import { CATEGORY_DETAIL_LABEL } from "@/src/features/products/data/categoryMeta";
import type { CatalogSectionKey } from "@/src/features/products/types";

type Breadcrumb = {
  label: string;
  href?: string;
};

export function buildCatalogProductDetailBreadcrumbs(
  category: CatalogSectionKey,
): Breadcrumb[] {
  const detailLabel = CATEGORY_DETAIL_LABEL[category];

  return [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/bundle-products" },
    { label: detailLabel },
  ];
}
