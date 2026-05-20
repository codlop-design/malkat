import { BookOpen, Calendar } from "lucide-react";
import Image from "next/image";
import CardMedia, {
  RatingBadge,
} from "@/src/features/products/components/CardMedia";

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
      <CardMedia imageSrc={imageSrc} href={href} cartLabel="عرض الدورة" />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <RatingBadge rating={rating} />
          <div className="flex flex-wrap items-center gap-2">
            {free ? (
              <span className="rounded-full bg-[#E0F5F3] px-2.5 py-0.5 text-xs font-medium text-(--primary)">
                مجانية
              </span>
            ) : null}
            {online ? (
              <span className="rounded-full bg-[#F5EDE4] px-2.5 py-0.5 text-xs text-[#454545]">
                أونلاين
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src={instructorAvatar}
              alt=""
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="text-sm text-[#454545]">{instructorName}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#717171]">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" strokeWidth={1.5} aria-hidden />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" strokeWidth={1.5} aria-hidden />
            {sessions}
          </span>
        </div>
        <h3 className="text-base font-bold text-black">{title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[#454545]">
          {description}
        </p>
      </div>
    </article>
  );
}
