import type {
  CatalogRate,
  CatalogSocialFields,
} from "@/src/features/products/types/catalogApi";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";

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
    ratingLabel: averageRating > 0 ? "تقييم المستخدمين" : "",
  };
}

export function resolveDetailSocialFields(item: CatalogSocialFields) {
  return {
    isFavourite: item.is_favourite ?? false,
    isRated: item.is_rated ?? false,
  };
}
