import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";
import ProductCard from "@/src/features/products/components/cards/ProductCard";
import { buildCartPayload } from "@/src/features/cart/lib/buildCartPayload";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import {
  resolveProductHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

export type GuideCardProps = CatalogItemBase & {
  category?: CatalogSectionKey;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  tags?: string[];
  pages?: string;
  rating?: number;
};

export default function GuideCard({
  category,
  slug,
  title,
  description,
  imageSrc,
  href: hrefProp,
  tags = ["للآباء", "مجاني"],
  pages = "42 صفحة",
  rating,
  ratingCount,
  isFavourite = false,
}: GuideCardProps) {
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
          isFree: tags.includes("مجاني"),
        })
      : undefined;

  return (
    <ProductCard href={href} title={title}>
      <CardMedia
        imageSrc={imageSrc}
        href={href}
        cartLabel="تحميل الدليل"
        category={category}
        slug={slug}
        isFavourite={isFavourite}
        cartPayload={cartPayload}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs ${
                tag === "مجاني"
                  ? "bg-[#E0F5F3] font-medium text-primary"
                  : "bg-[#F5EDE4] text-[#454545]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <RatingBadge rating={rating} count={ratingCount} />
          <span className="text-sm text-[#717171]">{pages}</span>
        </div>
      </div>
    </ProductCard>
  );
}
