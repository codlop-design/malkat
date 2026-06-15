import type {
  CatalogRate,
  CatalogReviewApiItem,
  CatalogSocialFields,
} from "@/src/features/products/types/catalogApi";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import type { ProductReview } from "@/src/features/products/data/productDetail";

type RateSource = CatalogSocialFields & { rate_average?: number | null };

function toPositiveNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function toNonNegativeInt(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
}

export function resolveCatalogRating(
  item: RateSource,
): Pick<CatalogItemBase, "rating" | "ratingCount"> {
  if (item.rate) {
    const avgRate = toPositiveNumber(item.rate.avg_rate);
    return {
      rating: avgRate > 0 ? avgRate : undefined,
      ratingCount: toNonNegativeInt(item.rate.count),
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
  const averageRating = rate
    ? toPositiveNumber(rate.avg_rate)
    : toPositiveNumber(legacyRating);

  const reviewCount = rate
    ? toNonNegativeInt(rate.count)
    : averageRating > 0
      ? 1
      : 0;

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
    const index = 5 - toNonNegativeInt(item.star);
    if (index >= 0 && index <= 4) {
      distribution[index] = toNonNegativeInt(item.count);
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
    rating: toNonNegativeInt(review.rating),
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
