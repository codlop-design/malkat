import HowItWorksSection from "@/src/features/services/components/HowItWorksSection";
import ServicesCategoryFilters from "@/src/features/services/components/ServicesCategoryFilters";
import ServicesCTASection from "@/src/features/services/components/ServicesCTASection";
import ServicesGrid from "@/src/features/services/components/ServicesGrid";
import ServicesIntroSection from "@/src/features/services/components/ServicesIntroSection";
import { ServiceTypeApiItem } from "../types";
import { ServicePageContent } from "../types/servicePage";
import { ServicesListResult } from "../api/getServicesList";

type ServicesPageContentProps = {
  category?: string | null;
  page?: string | null;
  types: ServiceTypeApiItem[];
  pageContent: ServicePageContent;
  result: ServicesListResult;
};

export default function ServicesPageContent({
  category,
  pageContent,
  result,
  types,
}: ServicesPageContentProps) {
  return (
    <>
      <ServicesIntroSection pageContent={pageContent} />

      <ServicesCategoryFilters category={category} types={types} />

      <ServicesGrid category={category} result={result} />

      <HowItWorksSection pageContent={pageContent} />

      <ServicesCTASection pageContent={pageContent} />
    </>
  );
}
