import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import InstructorRow from "@/src/features/products/components/detail/InstructorRow";
import SessionMeta from "@/src/features/products/components/detail/SessionMeta";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type ServiceInfoProps = {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

export default function ServiceInfo({ data, detail }: ServiceInfoProps) {
  if (!("tags" in data)) return null;

  const service = data as ServiceCardProps;

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {service.tags?.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs ${
              tag.includes("مجان")
                ? "bg-[#E0F5F3] font-medium text-primary"
                : "bg-[#F5EDE4] text-[#454545]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <SessionMeta session={detail.sessionMeta} />
      <InstructorRow contributor={detail.contributor} />
    </>
  );
}
