"use client";

import { Heart, Share2 } from "lucide-react";
import Image from "next/image";

type ProductDetailMediaProps = {
  imageSrc: string;
  cartLabel?: string;
};

export default function ProductDetailMedia({
  imageSrc,
  cartLabel = "إضافة للسلة",
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
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white"
          aria-label="إضافة للمفضلة"
        >
          <Heart className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white"
          aria-label="مشاركة"
        >
          <Share2 className="size-5" strokeWidth={1.5} />
        </button>
      </div>
      <button
        type="button"
        className="absolute bottom-4 inset-e-4 flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90 lg:hidden"
        aria-label={cartLabel}
      >
        <Image src="/basket-add.svg" alt="" width={22} height={22} />
      </button>
    </div>
  );
}
