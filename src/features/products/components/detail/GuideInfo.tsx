import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
import InstructorRow from "@/src/features/products/components/detail/InstructorRow";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type GuideInfoProps = {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

export default function GuideInfo({ data, detail }: GuideInfoProps) {
  if (!("pages" in data)) return null;

  const guide = data as GuideCardProps;
  const meta = detail.guideMeta;

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {guide.tags?.map((tag) => (
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
      {meta ? (
        <p className="mt-4 text-sm text-[#454545]">
          {meta.forWhom} · {guide.pages}
        </p>
      ) : null}
      <InstructorRow contributor={detail.contributor} />
    </>
  );
}
