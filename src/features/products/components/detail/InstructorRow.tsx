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
    <div className="mt-5 flex items-center gap-3">
      <Avatar className="size-10">
        {contributor?.image ? (
          <AvatarImage src={contributor.image} alt="" />
        ) : null}
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-black">{name}</span>
    </div>
  );
}
