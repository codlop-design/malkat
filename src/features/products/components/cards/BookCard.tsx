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

export type BookCardProps = CatalogItemBase & {
  category?: CatalogSectionKey;
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  href?: string;
  free?: boolean;
  authorAvatar?: string;
  ageRange?: string;
  level?: string;
  rating?: number;
  views?: string;
  favouriteSyncMode?: "none" | "product";
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
    authorAvatar,
    ageRange = "6-9 سنوات",
    level = "متوسط",
    rating,
    ratingCount,
    isFavourite = false,
    isBought = false,
    onFavouriteChange,
    favouriteSyncMode = "none",
  } = props;

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
          level,
          ageRange,
        })
      : undefined;

  return (
    <ProductCard href={href} title={title}>
      <CardMedia
        imageSrc={imageSrc}
        href={href}
        category={category}
        slug={slug}
        onFavouriteChange={onFavouriteChange}
        favouriteSyncMode={favouriteSyncMode}
        cartPayload={cartPayload}
        isBought={isBought}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <CatalogCardMetaRow rating={rating} ratingCount={ratingCount}>
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
        </CatalogCardMetaRow>
        <div>
          <h3 className="text-base font-bold text-black">{title}</h3>
          <div className="mt-1">
            <CatalogCardContributorRow name={author} image={authorAvatar} />
          </div>
        </div>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
      </div>
    </ProductCard>
  );
}
