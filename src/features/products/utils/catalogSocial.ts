import type {
  CatalogRate,
  CatalogReviewApiItem,
  CatalogSocialFields,
} from "@/src/features/products/types/catalogApi";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import type { ProductReview } from "@/src/features/products/data/productDetail";

type RateSource = CatalogSocialFields & { rate_average?: number | null };

export function resolveCatalogRating(
  item: RateSource,
): Pick<CatalogItemBase, "rating" | "ratingCount"> {
  if (item.rate) {
    return {
      rating: item.rate.avg_rate > 0 ? item.rate.avg_rate : undefined,
      ratingCount: item.rate.count,
    };
  }

  const legacyRating = item.rate_average ?? null;

  if (legacyRating != null && legacyRating > 0) {
    return { rating: legacyRating };
  }

  return {};
}

export function resolveCatalogSocialFields(
  item: CatalogSocialFields & { rate_average?: number | null },
): Pick<CatalogItemBase, "isFavourite" | "isRated" | "rating" | "ratingCount"> {
  return {
    isFavourite: item.is_favourite ?? false,
    isRated: item.is_rated ?? false,
    ...resolveCatalogRating(item),
  };
}

export function buildRatingMetaFromApi(
  rate?: CatalogRate | null,
  legacyRating?: number | null,
): {
  reviewCount: number;
  averageRating: number;
  ratingLabel: string;
} {
  const averageRating =
    rate?.avg_rate && rate.avg_rate > 0
      ? rate.avg_rate
      : legacyRating && legacyRating > 0
        ? legacyRating
        : 0;

  const reviewCount =
    rate?.count ?? (averageRating > 0 && !rate ? 1 : 0);

  return {
    reviewCount,
    averageRating,
    ratingLabel: averageRating > 0 ? getRatingLabel(averageRating) : "",
  };
}

function getRatingLabel(averageRating: number): string {
  if (averageRating >= 4.5) return "ممتاز";
  if (averageRating >= 4) return "جيد جداً";
  if (averageRating >= 3) return "جيد";
  if (averageRating >= 2) return "مقبول";
  return "ضعيف";
}

export function mapRatingBreakdown(
  breakdown?: CatalogRate["rating_breakdown"],
): number[] {
  const distribution = [0, 0, 0, 0, 0];

  if (!breakdown?.length) {
    return distribution;
  }

  for (const item of breakdown) {
    const index = 5 - item.star;
    if (index >= 0 && index <= 4) {
      distribution[index] = item.count;
    }
  }

  return distribution;
}

export function mapApiReviews(
  reviews?: CatalogReviewApiItem[],
): ProductReview[] {
  if (!reviews?.length) {
    return [];
  }

  return reviews.map((review, index) => ({
    id: `${review.name}-${index}`,
    author: review.name,
    date: review.duration,
    rating: review.rating,
    text: review.comment,
  }));
}

export function buildDetailRatingMeta(
  rate?: CatalogRate | null,
  legacyRating?: number | null,
): {
  reviewCount: number;
  averageRating: number;
  ratingLabel: string;
  ratingDistribution: number[];
  reviews: ProductReview[];
} {
  const base = buildRatingMetaFromApi(rate, legacyRating);

  return {
    ...base,
    ratingDistribution: mapRatingBreakdown(rate?.rating_breakdown),
    reviews: mapApiReviews(rate?.reviews),
  };
}

export function resolveDetailSocialFields(item: CatalogSocialFields) {
  return {
    isFavourite: item.is_favourite ?? false,
    isRated: item.is_rated ?? false,
  };
}
