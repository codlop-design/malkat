import { Suspense } from "react";

import HowItWorks from "@/src/features/services/components/HowItWorks";
import ServicesCTA from "@/src/features/services/components/ServicesCTA";
import ServicesGrid from "@/src/features/services/components/ServicesGrid";
import ServicesIntro from "@/src/features/services/components/ServicesIntro";

export default function ServicesPageContent() {
  return (
    <>
      <ServicesIntro />

      <Suspense fallback={<div className="min-h-[400px]" aria-hidden />}>
        <ServicesGrid />
      </Suspense>
      
      <HowItWorks />
      <ServicesCTA />
    </>
  );
}
