import { getServicePageContent } from "@/src/features/services/api/getServicePageContent";
import ServicesCTA from "@/src/features/services/components/ServicesCTA";
import { EMPTY_SERVICE_PAGE_CONTENT } from "@/src/features/services/data/servicePageFallback";

export default async function ServicesCTASection() {
  const pageContent = await getServicePageContent();

  return (
    <ServicesCTA
      section={pageContent?.special ?? EMPTY_SERVICE_PAGE_CONTENT.special}
    />
  );
}
