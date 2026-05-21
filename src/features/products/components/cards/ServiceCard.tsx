import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";
import ProductCard from "@/src/features/products/components/cards/ProductCard";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import {
  resolveProductHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

export type ServiceCardProps = CatalogItemBase & {
  category?: CatalogSectionKey;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  tags?: string[];
  rating?: number;
};

export default function ServiceCard({
  category,
  slug,
  title,
  description,
  imageSrc,
  href: hrefProp,
  tags = ["مجانية", "أونلاين", "للآباء"],
  rating = 4.8,
}: ServiceCardProps) {
  const href =
    category != null
      ? resolveProductHref(category, slug, hrefProp)
      : (hrefProp ?? "#");

  return (
    <ProductCard href={href} title={title}>
      <CardMedia imageSrc={imageSrc} href={href} cartLabel="طلب الخدمة" />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
        <div className="flex pt-1">
          <RatingBadge rating={rating} />
        </div>
      </div>
    </ProductCard>
  );
}
