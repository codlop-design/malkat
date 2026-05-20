import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = {
  id?: string;
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

export default function ProductCard({
  title,
  author,
  description,
  imageSrc,
  href = "#",
  free = true,
  ageRange = "6-9 سنوات",
  level = "متوسط",
  rating = 4.8,
  views = "18.3 k",
}: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <div className="relative aspect-4/3 w-full">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 240px"
        />
        <button
          type="button"
          className="absolute top-3 inset-e-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm transition-colors hover:bg-white"
          aria-label="إضافة للمفضلة"
        >
          <Heart className="size-5" strokeWidth={1.5} />
        </button>
        <Link
          href={href}
          className="absolute bottom-3 inset-s-3 flex size-10 items-center justify-center rounded-full bg-(--primary) text-white shadow-md transition-opacity hover:opacity-90"
          aria-label="إضافة للسلة"
        >
          <ShoppingBag className="size-5" strokeWidth={1.75} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 text-right" dir="rtl">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {free ? (
            <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-(--primary)">
              مجاني
            </span>
          ) : null}
          <span className="rounded-full bg-[#F0F0F0] px-2.5 py-0.5 text-xs text-[#454545]">
            {ageRange}
          </span>
          <span className="rounded-full bg-[#F0F0F0] px-2.5 py-0.5 text-xs text-[#454545]">
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
          <div className="flex items-center gap-1 text-sm text-[#454545]">
            <Eye className="size-4" strokeWidth={1.5} aria-hidden />
            <span>{views}</span>
          </div>
          <span className="flex items-center gap-1 rounded-lg bg-[#E8F4FC] px-2 py-1 text-sm font-medium text-[#1F1F1F]">
            <Star
              className="size-4 fill-[#F5B800] text-[#F5B800]"
              aria-hidden
            />
            {rating}
          </span>
        </div>
      </div>
    </article>
  );
}
