import { Skeleton } from "@/src/components/ui/skeleton";

const PILL_COUNT = 5;

export default function CategoryFiltersSkeleton() {
  return (
    <section className="bg-[#FAFAFA]" aria-busy="true" aria-label="جاري تحميل التصفية">
      <div className="container">
        <div className="mt-10 overflow-hidden rounded-2xl bg-[#F5F5F5] p-4 md:mt-12 lg:mt-14">
          <div className="-mx-4 flex gap-3 overflow-hidden px-4 sm:mx-0 sm:px-0" dir="rtl">
            {Array.from({ length: PILL_COUNT }, (_, index) => (
              <Skeleton
                key={index}
                className="h-11 w-28 shrink-0 rounded-full md:h-12 md:w-36"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
