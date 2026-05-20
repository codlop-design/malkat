import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";

export type GuideCardProps = {
  id?: string;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  tags?: string[];
  pages?: string;
  rating?: number;
};

export default function GuideCard({
  title,
  description,
  imageSrc,
  href = "#",
  tags = ["للآباء", "مجاني"],
  pages = "42 صفحة",
  rating = 4.8,
}: GuideCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <CardMedia imageSrc={imageSrc} href={href} cartLabel="تحميل الدليل" />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right" >
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs ${
                tag === "مجاني"
                  ? "bg-[#E0F5F3] font-medium text-(--primary)"
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
          <RatingBadge rating={rating} />
          <span className="text-sm text-[#717171]">{pages}</span>
        </div>
      </div>
    </article>
  );
}
