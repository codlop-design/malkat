import "server-only";

import { notFound } from "next/navigation";

import { getProductDetails } from "@/src/features/products/api/getProductDetails";
import { getSimilarProducts } from "@/src/features/products/api/getSimilarProducts";
import { isCatalogSectionKey } from "@/src/features/products/data/categoryMeta";
import type { ProductDetailView } from "@/src/features/products/mapProductDetail";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { CatalogSectionKey } from "@/src/features/products/types";
import { getCourseStages } from "@/src/features/products/api/getCourseStages";

import type { CourseStage } from "@/src/features/products/data/courseStages";

export type ProductDetailPageData = {
  category: CatalogSectionKey;
  detailView: ProductDetailView;
  related: CatalogProduct[];
  courseStages: CourseStage[] | null;
};

export async function loadProductDetailPageData(
  categoryParam: string,
  slug: string,
): Promise<ProductDetailPageData> {
  if (!isCatalogSectionKey(categoryParam)) {
    notFound();
  }

  const category = categoryParam;
  const [detailView, related, courseStages] = await Promise.all([
    getProductDetails(category, slug),
    getSimilarProducts(category, slug),
    category === "courses" ? getCourseStages(slug) : Promise.resolve(null),
  ]);

  if (!detailView) {
    notFound();
  }

  return { category, detailView, related, courseStages };
}
