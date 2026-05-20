import PageHeader from "@/src/components/ui/PageHeader";
import AboutPageContent from "@/src/components/about/AboutPageContent";
import PartnersSection from "@/src/components/about/PartnersSection";
import ValuesSection from "@/src/components/about/ValuesSection";
import VisionSection from "@/src/components/about/VisionSection";

export default function page() {
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
