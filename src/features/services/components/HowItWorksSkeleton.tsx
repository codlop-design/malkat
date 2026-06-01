import { Skeleton } from "@/src/components/ui/skeleton";

const STEP_COUNT = 4;

export default function HowItWorksSkeleton() {
  return (
    <section
      className="bg-[#F5F0E8] py-14 md:py-20"
      aria-busy="true"
      aria-label="جاري تحميل خطوات العمل"
    >
      <div className="container" dir="rtl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Skeleton className="h-8 w-4/5 max-w-sm" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-10/12 max-w-sm" />
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {Array.from({ length: STEP_COUNT }, (_, index) => (
            <li key={index} className="flex flex-col items-center text-center">
              <Skeleton className="size-[72px] rounded-2xl md:size-20" />
              <Skeleton className="mt-5 h-7 w-10" />
              <Skeleton className="mt-2 h-5 w-28" />
              <Skeleton className="mt-2 h-4 w-full max-w-[200px]" />
              <Skeleton className="mt-1 h-4 w-4/5 max-w-[180px]" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
