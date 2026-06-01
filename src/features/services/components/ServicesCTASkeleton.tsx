import { Skeleton } from "@/src/components/ui/skeleton";

export default function ServicesCTASkeleton() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-16 lg:py-20"
      aria-busy="true"
      aria-label="جاري تحميل قسم التواصل"
    >
      <Skeleton className="absolute inset-0 rounded-none" />

      <div className="container relative z-10">
        <div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          dir="rtl"
        >
          <Skeleton className="size-16 rounded-2xl md:size-20" />
          <Skeleton className="h-9 w-4/5 max-w-md bg-white/20" />
          <Skeleton className="h-4 w-full max-w-xl bg-white/20" />
          <Skeleton className="h-4 w-10/12 max-w-lg bg-white/20" />
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-full bg-white/25" />
            <Skeleton className="h-12 w-40 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
