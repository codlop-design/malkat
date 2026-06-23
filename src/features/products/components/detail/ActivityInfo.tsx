import type { ActivityCardProps } from "@/src/features/products/components/cards/ActivityCard";
import InstructorRow from "@/src/features/products/components/detail/InstructorRow";
import SessionMeta from "@/src/features/products/components/detail/SessionMeta";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type ActivityInfoProps = {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

export default function ActivityInfo({ data, detail }: ActivityInfoProps) {
  if (!("ageRange" in data) || !("activityType" in data)) return null;

  const activity = data as ActivityCardProps;
  const session = detail.sessionMeta;

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {session?.isFree ? (
          <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-xs font-medium text-primary">
            مجاني
          </span>
        ) : null}
        <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
          {activity.ageRange}
        </span>
        <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
          {activity.activityType}
        </span>
      </div>
      <SessionMeta session={session} />
      <InstructorRow contributor={detail.contributor} />
    </>
  );
}
