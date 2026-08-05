import {
  CATEGORY_DETAIL_LABEL,
  CATEGORY_META,
} from "@/src/features/products/data/categoryMeta";
import {
  categoryListingHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

type Breadcrumb = {
  label: string;
  href?: string;
};

export function buildCatalogProductDetailBreadcrumbs(
  category: CatalogSectionKey,
): Breadcrumb[] {
  const { label: categoryLabel } = CATEGORY_META[category];
  const detailLabel = CATEGORY_DETAIL_LABEL[category];

  return [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/bundle-products" },
    { label: categoryLabel, href: categoryListingHref(category) },
    { label: detailLabel },
  ];
}
