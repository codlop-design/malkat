"use client";

import { Share2 } from "lucide-react";
import Image from "next/image";

import AddToCartButton from "@/src/features/cart/components/AddToCartButton";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import FavouriteButton from "@/src/features/products/components/FavouriteButton";
import type { CatalogSectionKey } from "@/src/features/products/types";

type ProductDetailMediaProps = {
  imageSrc: string;
  cartLabel?: string;
  category: CatalogSectionKey;
  slug: string;
  isFavourite?: boolean;
  cartPayload: AddToCartPayload;
};

export default function ProductDetailMedia({
  imageSrc,
  cartLabel = "إضافة للسلة",
  category,
  slug,
  isFavourite = false,
  cartPayload,
}: ProductDetailMediaProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-square lg:max-h-[420px]">
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
          isFavourite={isFavourite}
          className="size-10"
        />
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white"
          aria-label="مشاركة"
        >
          <Share2 className="size-5" strokeWidth={1.5} />
        </button>
      </div>
      <AddToCartButton
        payload={cartPayload}
        label={cartLabel}
        iconSize={22}
        className="absolute bottom-4 inset-e-4 z-10 size-11 lg:hidden"
      />
    </div>
  );
}
