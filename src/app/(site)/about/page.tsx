import PageHeader from "@/src/components/PageHeader";
import AboutPageContent from "@/src/features/about/AboutPageContent";
import PartnersSection from "@/src/features/about/PartnersSection";
import ValuesSection from "@/src/features/about/ValuesSection";
import VisionSection from "@/src/features/about/VisionSection";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="من نحن"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "من نحن" },
        ]}
      />
      <AboutPageContent />
      <VisionSection />
      <ValuesSection />
      <PartnersSection />
    </>
  );
}
