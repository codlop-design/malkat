import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type InstructorRowProps = {
  contributor?: ProductDetailMeta["contributor"];
  fallbackName?: string;
  title?: string;
};

export default function InstructorRow({
  contributor,
  fallbackName,
  title,
}: InstructorRowProps) {
  const name = contributor?.name ?? fallbackName;
  if (!name) return null;

  return (
    <div className="mt-5">
      {title ? (
        <h3 className="text-base font-bold text-black">{title}</h3>
      ) : null}
      <div className={`flex items-start gap-3 ${title ? "mt-3" : ""}`}>
        <Avatar className="size-12 shrink-0">
          {contributor?.image ? (
            <AvatarImage src={contributor.image} alt="" />
          ) : null}
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-medium text-black">{name}</p>
          {contributor?.jobTitle ? (
            <p className="mt-1 text-sm text-[#717171]">{contributor.jobTitle}</p>
          ) : null}
          {contributor?.overview ? (
            <p className="mt-2 text-sm leading-relaxed text-[#454545]">
              {contributor.overview}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
