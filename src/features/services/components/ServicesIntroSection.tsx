import { getServicePageContent } from "@/src/features/services/api/getServicePageContent";
import ServicesIntro from "@/src/features/services/components/ServicesIntro";
import { EMPTY_SERVICE_PAGE_CONTENT } from "@/src/features/services/data/servicePageFallback";

export default async function ServicesIntroSection() {
  const pageContent = await getServicePageContent();

  return (
    <ServicesIntro
      section={pageContent?.statistics ?? EMPTY_SERVICE_PAGE_CONTENT.statistics}
    />
  );
}
