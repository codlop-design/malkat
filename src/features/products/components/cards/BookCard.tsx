import { Eye } from "lucide-react";
import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";

export type BookCardProps = {
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

export default function BookCard(props: BookCardProps) {
  const {
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
  } = props;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <CardMedia imageSrc={imageSrc} href={href} />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right" >
        <div className="flex flex-wrap items-center gap-2">
          {free ? (
            <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-(--primary)">
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
          <RatingBadge rating={rating} />
          
          <div className="flex items-center gap-1 text-sm text-[#454545]">
            <Eye className="size-4" strokeWidth={1.5} aria-hidden />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
