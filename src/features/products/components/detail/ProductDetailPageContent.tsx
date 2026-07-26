"use client";

import { Suspense } from "react";

import CourseStagesSection from "@/src/features/products/components/detail/CourseStagesSection";
import ProductDetailExtendedSections from "@/src/features/products/components/detail/ProductDetailExtendedSections";
import ProductDetailMainCard from "@/src/features/products/components/detail/ProductDetailMainCard";
import ProductReviewsSection from "@/src/features/products/components/detail/ProductReviewsSection";
import RelatedProductsSection from "@/src/features/products/components/detail/RelatedProductsSection";
import { REVIEWS_TITLE } from "@/src/features/products/data/productDetailLabels";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { CourseStage } from "@/src/features/products/data/courseStages";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import { useProductDetailLiveState } from "@/src/features/products/hooks/useProductDetailLiveState";

type ProductDetailPageContentProps = {
  product: CatalogProduct;
  detail: ProductDetailMeta;
  related: CatalogProduct[];
  courseStages?: CourseStage[] | null;
};

export default function ProductDetailPageContent({
  product,
  detail,
  related,
  courseStages = null,
}: ProductDetailPageContentProps) {
  const { category, data } = product;
  const {
    liveDetail,
    setLiveDetail,
    cartPayload,
    rating,
    reviewCount,
  } = useProductDetailLiveState(product, detail);

  const hasLoadedCourseStages = (courseStages?.length ?? 0) > 0;
  const hasFallbackCurriculum = (liveDetail.curriculum?.length ?? 0) > 0;
  const showCourseStages =
    category === "courses" &&
    (hasLoadedCourseStages || (courseStages === null && hasFallbackCurriculum));
  const hideCurriculum = showCourseStages && (courseStages?.length ?? 0) > 0;

  return (
    <div className="bg-[#FAFAFA] pb-16 pt-8 md:pt-10">
      <div className="container" dir="rtl">
        <ProductDetailMainCard
          product={product}
          detail={liveDetail}
          cartPayload={cartPayload}
          rating={rating}
          reviewCount={reviewCount}
        />

        <ProductDetailExtendedSections
          detail={liveDetail}
          hideCurriculum={hideCurriculum}
        />

        {showCourseStages ? (
          <Suspense fallback={null}>
            <CourseStagesSection
              slug={data.slug}
              initialStages={courseStages}
              isPurchased={liveDetail.isBought === true}
            />
          </Suspense>
        ) : null}

        <ProductReviewsSection
          detail={liveDetail}
          title={REVIEWS_TITLE[category]}
          category={category}
          slug={data.slug}
          onDetailUpdated={setLiveDetail}
        />
        <RelatedProductsSection products={related} />
      </div>
    </div>
  );
}
