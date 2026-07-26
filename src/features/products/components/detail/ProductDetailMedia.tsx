"use client";

import Image from "next/image";

import ShareButton from "@/src/components/ShareButton";
import AddToCartButton from "@/src/features/cart/components/AddToCartButton";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import FavouriteButton from "@/src/features/products/components/FavouriteButton";
import ProductInterestButton from "@/src/features/products/components/detail/ProductInterestButton";
import {
  productDetailHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

type ProductDetailMediaProps = {
  imageSrc: string;
  title: string;
  cartLabel?: string;
  category: CatalogSectionKey;
  slug: string;
  cartPayload: AddToCartPayload;
  showAddToCart?: boolean;
};

export default function ProductDetailMedia({
  imageSrc,
  title,
  cartLabel = "طلب المنتج",
  category,
  slug,
  cartPayload,
  showAddToCart = true,
}: ProductDetailMediaProps) {
  const shareUrl = productDetailHref(category, slug);

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl lg:aspect-square lg:max-h-[420px]">
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 45vw"
        priority
      />
      <div className="absolute top-4 inset-s-4 flex gap-2">
        <FavouriteButton
          category={category}
          slug={slug}
          className="size-10"
        />
        <ShareButton
          url={shareUrl}
          title={title}
          className="size-10 rounded-full bg-white/90 text-[#454545] shadow-sm hover:bg-white"
        />
      </div>
      {showAddToCart ? (
        <div className="absolute inset-x-4 bottom-4 z-10 grid grid-cols-2 gap-2 lg:hidden">
          <ProductInterestButton
            label="تسجيل اهتمام"
            className="h-11 rounded-xl bg-white/95 px-3 text-sm shadow-sm"
          />
          <AddToCartButton
            payload={cartPayload}
            label={cartLabel}
            iconSize={18}
            variant="button"
            className="h-11 rounded-xl px-3 text-sm shadow-sm"
          />
        </div>
      ) : null}
    </div>
  );
}
