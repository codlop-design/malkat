import { Calendar, Clock, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type CourseCardProps = {
  id?: string;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  instructorName: string;
  instructorAvatar: string;
  duration: string;
  sessions: string;
  free?: boolean;
  online?: boolean;
  rating?: number;
};

export default function CourseCard({
  title,
  description,
  imageSrc,
  href = "#",
  instructorName,
  instructorAvatar,
  duration,
  sessions,
  free = true,
  online = true,
  rating = 4.8,
}: CourseCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <div className="relative aspect-4/3 w-full">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="260px"
        />
        <button
          type="button"
          className="absolute top-3 inset-e-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-sm"
          aria-label="إضافة للمفضلة"
        >
          <Heart className="size-5" strokeWidth={1.5} />
        </button>
        <Link
          href={href}
          className="absolute bottom-3 inset-s-3 flex size-10 items-center justify-center rounded-full bg-(--primary) text-white shadow-md hover:opacity-90"
          aria-label="عرض الدورة"
        >
          <ShoppingBag className="size-5" strokeWidth={1.75} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 text-right" dir="rtl">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="flex items-center gap-1 rounded-lg bg-[#E8F4FC] px-2 py-1 text-xs font-medium">
            <Star className="size-3.5 fill-[#F5B800] text-[#F5B800]" aria-hidden />
            {rating}
          </span>
          {free ? (
            <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-(--primary)">
              مجاني
            </span>
          ) : null}
          {online ? (
            <span className="rounded-full bg-[#F0F0F0] px-2.5 py-0.5 text-xs text-[#454545]">
              أونلاين
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="text-sm text-[#454545]">{instructorName}</span>
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src={instructorAvatar}
              alt=""
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 text-xs text-[#717171]">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" strokeWidth={1.5} aria-hidden />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={1.5} aria-hidden />
            {sessions}
          </span>
        </div>

        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
      </div>
    </article>
  );
}
