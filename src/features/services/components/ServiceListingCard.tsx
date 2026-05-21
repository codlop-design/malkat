import CardMedia from "@/src/features/products/components/CardMedia";
import type { ServiceItem } from "@/src/features/services/data/services";

type ServiceListingCardProps = {
  service: ServiceItem;
};

export default function ServiceListingCard({ service }: ServiceListingCardProps) {
  const { title, description, imageSrc, href, tags } = service;

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      dir="rtl"
    >
      <CardMedia imageSrc={imageSrc} href={href} cartLabel="طلب الخدمة" />
      <div className="flex flex-1 flex-col gap-3 p-4 text-right">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs ${
                tag === "مجانية"
                  ? "bg-[#E0F5F3] font-medium text-primary"
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
      </div>
    </article>
  );
}
