import { getContactTypes } from "@/src/features/contact/api/getContactTypes";
import { getOrganizationTypes } from "@/src/features/register-interest/api/getOrganizationTypes";
import { getHomeContent } from "@/src/features/home/api/getHomeContent";
import AboutSection from "@/src/features/home/components/AboutSection";
import HomeBundleProductsSection from "@/src/features/home/components/HomeBundleProductsSection";
import ImpactSection from "@/src/features/about/components/ImpactSection";
import ContactSection from "@/src/features/home/components/ContactSection";
import HeroSection from "@/src/features/home/components/HeroSection";
import Partners from "@/src/features/home/components/Partners";
import PlatformServices from "@/src/features/home/components/PlatformServices";
import ValuesSection from "@/src/features/about/components/ValuesSection";
import VideoSection from "@/src/features/home/components/VideoSection";

export default async function Home() {
  const [homeContent] = await Promise.all([
    getHomeContent(),
    getContactTypes(),
    getOrganizationTypes(),
  ]);

  return (
    <>
      <HeroSection content={homeContent?.hero_section} />
      <HomeBundleProductsSection
        bundles={homeContent?.homepage_bundle_products}
      />
      <AboutSection content={homeContent?.about_us} />
      <PlatformServices content={homeContent?.discover} />
      <VideoSection src={homeContent?.introductory_video} />
      <ValuesSection
        valuesBlock={homeContent?.values?.[0]}
        className="pt-6 md:pt-6 lg:pt-8"
      />
      <ImpactSection impact={homeContent?.impacts?.[0]} />
      <Partners content={homeContent?.partners} />
      <ContactSection />
    </>
  );
}
