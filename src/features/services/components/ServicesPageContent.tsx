// import { Suspense } from "react";

import HowItWorksSection from "@/src/features/services/components/HowItWorksSection";
import ServicesCategoryFilters from "@/src/features/services/components/ServicesCategoryFilters";
import ServicesCTASection from "@/src/features/services/components/ServicesCTASection";
import ServicesGrid from "@/src/features/services/components/ServicesGrid";
import ServicesIntroSection from "@/src/features/services/components/ServicesIntroSection";
// import CategoryFiltersSkeleton from "@/src/features/services/components/CategoryFiltersSkeleton";
// import HowItWorksSkeleton from "@/src/features/services/components/HowItWorksSkeleton";
// import ServicesCTASkeleton from "@/src/features/services/components/ServicesCTASkeleton";
// import ServicesGridSkeleton from "@/src/features/services/components/ServicesGridSkeleton";
// import ServicesIntroSkeleton from "@/src/features/services/components/ServicesIntroSkeleton";
import { ServiceTypeApiItem } from "@/src/features/services/types";
import { ServicePageContent } from "../types/servicePage";

type ServicesPageContentProps = {
  category?: string | null;
  page?: string | null;
  types: ServiceTypeApiItem[];
  pageContent: ServicePageContent;
};

export default function ServicesPageContent({
  category,
  page,
  types,
  pageContent,
}: ServicesPageContentProps) {
  return (
    <>
      <ServicesIntroSection pageContent={pageContent} />

      <ServicesCategoryFilters category={category} types={types} />

      <ServicesGrid category={category} page={page} />

      <HowItWorksSection pageContent={pageContent} />

      <ServicesCTASection pageContent={pageContent} />
    </>
  );
}
