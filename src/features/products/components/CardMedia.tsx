import Image from "next/image";
import Link from "next/link";

import FavouriteButton from "@/src/features/products/components/FavouriteButton";
import type { CatalogSectionKey } from "@/src/features/products/types";

type CardMediaProps = {
  imageSrc: string;
  href?: string;
  cartLabel?: string;
  category?: CatalogSectionKey;
  slug?: string;
  isFavourite?: boolean;
};

export default function CardMedia({
  imageSrc,
  href = "#",
  cartLabel = "إضافة للسلة",
  category,
  slug,
  isFavourite = false,
}: CardMediaProps) {
  return (
    <div className="relative aspect-4/3 w-full shrink-0">
      <Link href={href} className="absolute inset-0 z-[1] block" tabIndex={-1}>
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="260px"
        />
      </Link>
      {category && slug ? (
        <FavouriteButton
          category={category}
          slug={slug}
          isFavourite={isFavourite}
          className="absolute top-3 inset-s-3 z-10 size-9"
        />
      ) : null}
      <Link
        href={href}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 inset-e-3 z-10 flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition-opacity hover:opacity-90"
        aria-label={cartLabel}
      >
        <Image src="/basket-add.svg" alt="إضافة للسلة" width={20} height={20} />
      </Link>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      className="size-4 fill-[#F5B800] text-[#F5B800]"
      viewBox="0 0 20 20"
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function RatingBadge({
  rating,
  count,
}: {
  rating?: number;
  count?: number;
}) {
  if (!rating || rating <= 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-[#E8F4FC] px-2 py-1 text-sm font-medium text-[#1F1F1F]">
      <StarIcon />
      {rating}
      {count != null && count > 0 ? (
        <span className="text-xs text-[#717171]">({count})</span>
      ) : null}
    </span>
  );
}
