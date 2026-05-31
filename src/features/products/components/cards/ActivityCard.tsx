import { Zap } from "lucide-react";
import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";
import ProductCard from "@/src/features/products/components/cards/ProductCard";
import { buildCartPayload } from "@/src/features/cart/lib/buildCartPayload";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import {
  resolveProductHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

export type ActivityCardProps = CatalogItemBase & {
  category?: CatalogSectionKey;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  ageRange?: string;
  activityType?: string;
  skillTags?: string[];
  rating?: number;
};

export default function ActivityCard({
  category,
  slug,
  title,
  description,
  imageSrc,
  href: hrefProp,
  ageRange = "3-5 سنوات",
  activityType = "فردي",
  skillTags = ["الإبداع", "التعبير", "المهارات الحركية الدقيقة"],
  rating,
  ratingCount,
  isFavourite = false,
}: ActivityCardProps) {
  const href =
    category != null
      ? resolveProductHref(category, slug, hrefProp)
      : (hrefProp ?? "#");

  const cartPayload =
    category != null
      ? buildCartPayload(category, {
          slug,
          title,
          description,
          image: imageSrc,
          ageRange,
        })
      : undefined;

  return (
    <ProductCard href={href} title={title}>
      <CardMedia
        imageSrc={imageSrc}
        href={href}
        cartLabel="حجز النشاط"
        category={category}
        slug={slug}
        isFavourite={isFavourite}
        cartPayload={cartPayload}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
            {ageRange}
          </span>
          <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
            {activityType}
          </span>
        </div>
        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
        <div className="flex">
          <RatingBadge rating={rating} count={ratingCount} />
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-[#EDE8F5] px-2.5 py-1 text-xs text-[#5C4D7A]"
            >
              <Zap
                className="size-3 shrink-0 fill-[#8B7AB8] text-[#8B7AB8]"
                aria-hidden
              />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ProductCard>
  );
}
