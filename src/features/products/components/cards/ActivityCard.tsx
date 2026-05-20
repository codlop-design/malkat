import { Zap } from "lucide-react";
import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";

export type ActivityCardProps = {
  id?: string;
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
  title,
  description,
  imageSrc,
  href = "#",
  ageRange = "3-5 سنوات",
  activityType = "فردي",
  skillTags = ["الإبداع", "التعبير", "المهارات الحركية الدقيقة"],
  rating = 4.8,
}: ActivityCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <CardMedia imageSrc={imageSrc} href={href} cartLabel="حجز النشاط" />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right" >
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
          <RatingBadge rating={rating} />
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-[#EDE8F5] px-2.5 py-1 text-xs text-[#5C4D7A]"
            >
              <Zap className="size-3 shrink-0 fill-[#8B7AB8] text-[#8B7AB8]" aria-hidden />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
