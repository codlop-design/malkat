import { Eye } from "lucide-react";
import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";
import ProductCard from "@/src/features/products/components/cards/ProductCard";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import {
  resolveProductHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

export type BookCardProps = CatalogItemBase & {
  category?: CatalogSectionKey;
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  href?: string;
  free?: boolean;
  ageRange?: string;
  level?: string;
  rating?: number;
  views?: string;
};

export default function BookCard(props: BookCardProps) {
  const {
    category,
    slug,
    title,
    author,
    description,
    imageSrc,
    href: hrefProp,
    free = true,
    ageRange = "6-9 سنوات",
    level = "متوسط",
    rating,
    ratingCount,
    isFavourite = false,
  } = props;

  const href =
    category != null
      ? resolveProductHref(category, slug, hrefProp)
      : (hrefProp ?? "#");

  return (
    <ProductCard href={href} title={title}>
      <CardMedia
        imageSrc={imageSrc}
        href={href}
        category={category}
        slug={slug}
        isFavourite={isFavourite}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <div className="flex flex-wrap items-center gap-2">
          {free ? (
            <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-primary">
              مجاني
            </span>
          ) : null}
          <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
            {ageRange}
          </span>
          <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
            {level}
          </span>
        </div>
        <div>
          <h3 className="text-base font-bold text-black">{title}</h3>
          <p className="mt-1 text-sm text-[#717171]">{author}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <RatingBadge rating={rating} count={ratingCount} />
        </div>
      </div>
    </ProductCard>
  );
}
