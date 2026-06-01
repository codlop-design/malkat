import { Skeleton } from "@/src/components/ui/skeleton";

const CARD_COUNT = 4;

function ServiceCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </div>
  );
}

export default function ServicesGridSkeleton() {
  return (
    <section
      className="bg-[#FAFAFA] pb-14 md:pb-20"
      aria-busy="true"
      aria-label="جاري تحميل الخدمات"
    >
      <div className="container">
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: CARD_COUNT }, (_, index) => (
            <li key={index}>
              <ServiceCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
