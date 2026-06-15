import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

export type ProductDetailRatingFields = Pick<
  ProductDetailMeta,
  | "reviewCount"
  | "averageRating"
  | "ratingLabel"
  | "ratingDistribution"
  | "reviews"
  | "isRated"
>;

export function pickDetailRatingFields(
  detail: ProductDetailMeta,
): ProductDetailRatingFields {
  return {
    reviewCount: detail.reviewCount,
    averageRating: detail.averageRating,
    ratingLabel: detail.ratingLabel,
    ratingDistribution: detail.ratingDistribution,
    reviews: detail.reviews,
    isRated: detail.isRated,
  };
}

export function mergeDetailRatingFields(
  detail: ProductDetailMeta,
  rating: ProductDetailRatingFields,
): ProductDetailMeta {
  return { ...detail, ...rating };
}

export function isDetailRatingEqual(
  current: ProductDetailRatingFields,
  next: ProductDetailRatingFields,
): boolean {
  return (
    current.reviewCount === next.reviewCount &&
    current.averageRating === next.averageRating &&
    current.ratingLabel === next.ratingLabel &&
    current.isRated === next.isRated &&
    current.ratingDistribution.length === next.ratingDistribution.length &&
    current.ratingDistribution.every(
      (count, index) => count === next.ratingDistribution[index],
    ) &&
    current.reviews.length === next.reviews.length &&
    current.reviews.every(
      (review, index) =>
        review.id === next.reviews[index]?.id &&
        review.author === next.reviews[index]?.author &&
        review.date === next.reviews[index]?.date &&
        review.rating === next.reviews[index]?.rating &&
        review.text === next.reviews[index]?.text,
    )
  );
}
