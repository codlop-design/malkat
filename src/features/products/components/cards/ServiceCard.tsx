import CardMedia, { RatingBadge } from "@/src/features/products/components/CardMedia";

export type ServiceCardProps = {
  id?: string;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  tags?: string[];
  rating?: number;
};

export default function ServiceCard({
  title,
  description,
  imageSrc,
  href = "#",
  tags = ["مجانية", "أونلاين", "للآباء"],
  rating = 4.8,
}: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <CardMedia imageSrc={imageSrc} href={href} cartLabel="طلب الخدمة" />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right" >
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
    </article>
  );
}
