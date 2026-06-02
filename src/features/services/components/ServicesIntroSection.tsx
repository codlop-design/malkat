import ServicesIntro from "@/src/features/services/components/ServicesIntro";
import { EMPTY_SERVICE_PAGE_CONTENT } from "@/src/features/services/data/servicePageFallback";
import { ServicePageContent } from "../types/servicePage";

type ServicesIntroSectionProps = {
  pageContent: ServicePageContent;
};

export default function ServicesIntroSection({
  pageContent,
}: ServicesIntroSectionProps) {
  return (
    <ServicesIntro
      section={pageContent?.statistics ?? EMPTY_SERVICE_PAGE_CONTENT.statistics}
    />
  );
}
