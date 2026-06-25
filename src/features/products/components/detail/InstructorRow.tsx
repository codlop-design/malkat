import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type InstructorRowProps = {
  contributor?: ProductDetailMeta["contributor"];
  fallbackName?: string;
};

export default function InstructorRow({
  contributor,
  fallbackName,
}: InstructorRowProps) {
  const name = contributor?.name ?? fallbackName;
  if (!name) return null;

  return (
    <div className="mt-5 flex items-start gap-3">
      <Avatar className="size-10 shrink-0">
        {contributor?.image ? (
          <AvatarImage src={contributor.image} alt="" />
        ) : null}
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="text-sm font-medium text-black">{name}</p>
        {contributor?.jobTitle?.trim() ? (
          <p className="mt-1 text-sm text-[#717171]">{contributor.jobTitle}</p>
        ) : null}
        {contributor?.bio?.trim() ? (
          <p className="mt-2 text-sm leading-relaxed text-[#454545]">
            {contributor.bio}
          </p>
        ) : null}
      </div>
    </div>
  );
}
