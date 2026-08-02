import CardMedia, {
  CatalogCardContributorRow,
  CatalogCardMetaRow,
} from "@/src/features/products/components/CardMedia";
import ProductCard from "@/src/features/products/components/cards/ProductCard";
import { buildCartPayload } from "@/src/features/cart/lib/buildCartPayload";
import type { CatalogItemBase } from "@/src/features/products/types/catalogItem";
import {
  resolveProductHref,
  type CatalogSectionKey,
} from "@/src/features/products/types";

export type CourseCardProps = CatalogItemBase & {
  category?: CatalogSectionKey;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  instructorName: string;
  instructorAvatar: string;
  duration: string;
  sessions?: string;
  free?: boolean;
  online?: boolean;
  sessionType?: string;
  ageRange?: string;
  domain?: string;
  rating?: number;
};

export default function CourseCard({
  category,
  slug,
  title,
  description,
  imageSrc,
  href: hrefProp,
  instructorName,
  instructorAvatar,
  duration,
  sessions,
  free = true,
  online = true,
  sessionType,
  ageRange,
  rating,
  ratingCount,
  isBought = false,
  onFavouriteChange,
}: CourseCardProps) {
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
          isFree: free,
          isOnline: online,
          duration,
          sessions,
          ageRange,
          instructorName,
          instructorAvatar,
        })
      : undefined;

  return (
    <ProductCard href={href} title={title}>
      <CardMedia
        imageSrc={imageSrc}
        href={href}
        cartLabel="طلب المنتج"
        category={category}
        slug={slug}
        onFavouriteChange={onFavouriteChange}
        cartPayload={cartPayload}
        isBought={isBought}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <CatalogCardMetaRow rating={rating} ratingCount={ratingCount}>
          {free ? (
            <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-primary">
              مجانية
            </span>
          ) : null}
          {sessionType ? (
            <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
              {sessionType}
            </span>
          ) : online ? (
            <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
              أونلاين
            </span>
          ) : null}
        </CatalogCardMetaRow>
        <CatalogCardContributorRow
          name={instructorName}
          image={instructorAvatar}
        />
        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap justify-end gap-3 pt-1 text-sm text-[#717171]">
          <span>{duration}</span>
          {sessions ? <span>{sessions}</span> : null}
        </div>
      </div>
    </ProductCard>
  );
}
