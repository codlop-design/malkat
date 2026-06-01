import { getServicePageContent } from "@/src/features/services/api/getServicePageContent";
import HowItWorks from "@/src/features/services/components/HowItWorks";
import { EMPTY_SERVICE_PAGE_CONTENT } from "@/src/features/services/data/servicePageFallback";

export default async function HowItWorksSection() {
  const pageContent = await getServicePageContent();

  return (
    <HowItWorks
      section={pageContent?.steps ?? EMPTY_SERVICE_PAGE_CONTENT.steps}
    />
  );
}
