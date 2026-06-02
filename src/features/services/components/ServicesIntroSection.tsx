import ServicesIntro from "@/src/features/services/components/ServicesIntro";
import { ServicePageContent } from "../types/servicePage";

type ServicesIntroSectionProps = {
  pageContent: ServicePageContent;
};

export default function ServicesIntroSection({ pageContent }: ServicesIntroSectionProps) {

  return (
    <ServicesIntro section={pageContent.statistics} />
  );
}
