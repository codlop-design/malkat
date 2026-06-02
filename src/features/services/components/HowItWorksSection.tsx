import HowItWorks from "@/src/features/services/components/HowItWorks";
import { ServicePageContent } from "../types/servicePage";

type HowItWorksSectionProps = {
  pageContent: ServicePageContent;
};

export default function HowItWorksSection({
  pageContent,
}: HowItWorksSectionProps) {
  return <HowItWorks section={pageContent.steps} />;
}
