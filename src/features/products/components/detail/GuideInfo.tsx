import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
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
  const contributor = detail.contributor;

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
      {contributor?.name ? (
        <div className="mt-6">
          <h3 className="text-base font-bold text-black">مُعد الدليل</h3>
          <div className="mt-3 flex items-start gap-3">
            <Avatar className="size-12 shrink-0">
              {contributor.image ? (
                <AvatarImage src={contributor.image} alt="" />
              ) : null}
              <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-black">{contributor.name}</p>
              {contributor.jobTitle ? (
                <p className="mt-1 text-sm text-[#717171]">
                  {contributor.jobTitle}
                </p>
              ) : null}
              {contributor.overview ? (
                <p className="mt-2 text-sm leading-relaxed text-[#454545]">
                  {contributor.overview}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
