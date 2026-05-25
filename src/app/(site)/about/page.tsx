import PageHeader from "@/src/components/PageHeader";
import { getAboutContent } from "@/src/features/about/api/getAboutContent";
import AboutPageContent from "@/src/features/about/AboutPageContent";
import PartnersSection from "@/src/features/about/PartnersSection";
import ValuesSection from "@/src/features/about/ValuesSection";
import VisionSection from "@/src/features/about/VisionSection";

export default async function AboutPage() {
  const aboutContent = await getAboutContent();

  return (
    <>
      <PageHeader
        title="من نحن"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "من نحن" },
        ]}
      />
      <AboutPageContent sections={aboutContent?.aboutus_sections ?? []} />
      <VisionSection messages={aboutContent?.vision_messages ?? []} />
      <ValuesSection valuesBlock={aboutContent?.values?.[0]} />
      <PartnersSection partners={aboutContent?.partners} />
    </>
  );
}
