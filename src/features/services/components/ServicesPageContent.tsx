import { Suspense } from "react";

import CategoryFiltersSkeleton from "@/src/features/services/components/CategoryFiltersSkeleton";
import HowItWorksSection from "@/src/features/services/components/HowItWorksSection";
import HowItWorksSkeleton from "@/src/features/services/components/HowItWorksSkeleton";
import ServicesCategoryFilters from "@/src/features/services/components/ServicesCategoryFilters";
import ServicesCTASection from "@/src/features/services/components/ServicesCTASection";
import ServicesCTASkeleton from "@/src/features/services/components/ServicesCTASkeleton";
import ServicesGrid from "@/src/features/services/components/ServicesGrid";
import ServicesGridSkeleton from "@/src/features/services/components/ServicesGridSkeleton";
import ServicesIntroSection from "@/src/features/services/components/ServicesIntroSection";
import ServicesIntroSkeleton from "@/src/features/services/components/ServicesIntroSkeleton";

type ServicesPageContentProps = {
  category?: string | null;
  page?: string | null;
};

export default function ServicesPageContent({
  category,
  page,
}: ServicesPageContentProps) {
  return (
    <>
      <Suspense fallback={<ServicesIntroSkeleton />}>
        <ServicesIntroSection />
      </Suspense>

      <Suspense fallback={<CategoryFiltersSkeleton />}>
        <ServicesCategoryFilters category={category} />
      </Suspense>

      <Suspense fallback={<ServicesGridSkeleton />}>
        <ServicesGrid category={category} page={page} />
      </Suspense>

      <Suspense fallback={<HowItWorksSkeleton />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<ServicesCTASkeleton />}>
        <ServicesCTASection />
      </Suspense>
    </>
  );
}
