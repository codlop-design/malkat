import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { buildCartPayloadFromProduct } from "@/src/features/cart/lib/buildCartPayload";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import { useClientProductDetailRating } from "@/src/features/products/hooks/useClientProductDetailRating";
import { resolveDetailIsBought } from "@/src/features/products/utils/catalogSocial";
import { pickDetailRatingFields } from "@/src/features/products/utils/productDetailRating";

function mergeDetailFromServer(
  current: ProductDetailMeta,
  incoming: ProductDetailMeta,
): ProductDetailMeta {
  const clientHasRicherReviews =
    current.reviewCount > incoming.reviewCount ||
    current.reviews.length > incoming.reviews.length;

  const isBought = resolveDetailIsBought(current.isBought, incoming.isBought);

  if (clientHasRicherReviews) {
    return {
      ...incoming,
      ...pickDetailRatingFields(current),
      isBought,
    };
  }

  return {
    ...incoming,
    isBought,
  };
}

export function useProductDetailLiveState(
  product: CatalogProduct,
  detail: ProductDetailMeta,
) {
  const { category, data } = product;
  const [liveDetail, setLiveDetail] = useState(detail);
  const { isAuthenticated, isAuthReady } = useAuth();
  const {
    hasPurchase,
    isProductBought,
    syncProductFavourite,
  } = useFavourites();
  const slug = data.slug;
  const lastSlugRef = useRef(slug);

  useEffect(() => {
    const slugChanged = lastSlugRef.current !== slug;
    lastSlugRef.current = slug;

    if (slugChanged) {
      setLiveDetail(detail);
      return;
    }

    setLiveDetail((current) => mergeDetailFromServer(current, detail));
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
  const hasResolvedPurchase = hasPurchase(category, slug);
  const resolvedIsBought = resolveDetailIsBought(
    liveDetail.isBought,
    hasResolvedPurchase ? isProductBought(category, slug) : undefined,
  );
  const cartPayload = buildCartPayloadFromProduct(product);
  const canShowAddToCart =
    isAuthReady &&
    (!isAuthenticated || hasResolvedPurchase || liveDetail.isBought === true) &&
    resolvedIsBought !== true;

  return {
    liveDetail: {
      ...liveDetail,
      isBought: resolvedIsBought,
    },
    setLiveDetail,
    cartPayload,
    showAddToCart: canShowAddToCart,
    rating,
    reviewCount: liveDetail.reviewCount,
  };
}
