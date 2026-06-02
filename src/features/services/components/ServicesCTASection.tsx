import ServicesCTA from "@/src/features/services/components/ServicesCTA";
import { ServicePageContent } from "../types/servicePage";

type ServicesCTASectionProps = {
  pageContent: ServicePageContent;
};

export default function ServicesCTASection({
  pageContent,
}: ServicesCTASectionProps) {
  return <ServicesCTA section={pageContent.special} />;
}
