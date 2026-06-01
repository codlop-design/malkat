import { Skeleton } from "@/src/components/ui/skeleton";

const STAT_COUNT = 4;

export default function ServicesIntroSkeleton() {
  return (
    <section
      className="py-10 md:py-14"
      aria-busy="true"
      aria-label="جاري تحميل المقدمة"
    >
      <div className="container flex flex-col items-center gap-6" dir="rtl">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <Skeleton className="h-8 w-4/5 max-w-md" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-10/12 max-w-lg" />
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-12">
          {Array.from({ length: STAT_COUNT }, (_, index) => (
            <li key={index} className="flex items-center gap-4">
              <Skeleton className="hidden size-14 shrink-0 rounded-full md:block" />
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
