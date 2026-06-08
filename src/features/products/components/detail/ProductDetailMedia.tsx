"use client";

import { Share2 } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "sonner";

import AddToCartButton from "@/src/features/cart/components/AddToCartButton";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import FavouriteButton from "@/src/features/products/components/FavouriteButton";
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
  isFavourite?: boolean;
  cartPayload: AddToCartPayload;
};

async function shareProduct(title: string, url: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast.success("تم نسخ رابط المنتج");
  } catch {
    toast.error("تعذر مشاركة المنتج");
  }
}

export default function ProductDetailMedia({
  imageSrc,
  title,
  cartLabel = "إضافة للسلة",
  category,
  slug,
  isFavourite = false,
  cartPayload,
}: ProductDetailMediaProps) {
  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${productDetailHref(category, slug)}`;
    await shareProduct(title, url);
  }, [category, slug, title]);

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
          onClick={handleShare}
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
