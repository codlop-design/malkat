import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { buildCartPayloadFromProduct } from "@/src/features/cart/lib/buildCartPayload";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import { useClientProductDetailRating } from "@/src/features/products/hooks/useClientProductDetailRating";
import { pickDetailRatingFields } from "@/src/features/products/utils/productDetailRating";

export function useProductDetailLiveState(
  product: CatalogProduct,
  detail: ProductDetailMeta,
) {
  const { category, data } = product;
  const [liveDetail, setLiveDetail] = useState(detail);
  const { isAuthenticated, isAuthReady } = useAuth();
  const { syncProductFavourite } = useFavourites();
  const slug = data.slug;
  const lastSlugRef = useRef(slug);

  useEffect(() => {
    const slugChanged = lastSlugRef.current !== slug;
    lastSlugRef.current = slug;

    if (slugChanged) {
      setLiveDetail(detail);
      return;
    }

    setLiveDetail((current) => {
      const clientHasRicherReviews =
        current.reviewCount > detail.reviewCount ||
        current.reviews.length > detail.reviews.length;

      if (clientHasRicherReviews) {
        return { ...detail, ...pickDetailRatingFields(current) };
      }

      return detail;
    });
  }, [detail, slug]);

  useClientProductDetailRating({
    category,
    slug,
    onDetailUpdated: setLiveDetail,
  });

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    void syncProductFavourite(category, data.slug);
  }, [
    category,
    data.slug,
    isAuthReady,
    isAuthenticated,
    syncProductFavourite,
  ]);

  const rating =
    liveDetail.averageRating > 0
      ? liveDetail.averageRating
      : "rating" in data
        ? (data.rating ?? 0)
        : 0;

  return {
    liveDetail,
    setLiveDetail,
    cartPayload: buildCartPayloadFromProduct(product),
    rating,
    reviewCount: liveDetail.reviewCount,
  };
}
