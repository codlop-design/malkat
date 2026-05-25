import { getContactTypes } from "@/src/features/contact/api/getContactTypes";
import { getHomeContent } from "@/src/features/home/api/getHomeContent";
import AboutSection from "@/src/features/home/components/AboutSection";
import ContactSection from "@/src/features/home/components/ContactSection";
import HeroSection from "@/src/features/home/components/HeroSection";
import Partners from "@/src/features/home/components/Partners";
import PlatformServices from "@/src/features/home/components/PlatformServices";
import VideoSection from "@/src/features/home/components/VideoSection";

export default async function Home() {
  const [homeContent, contactTypes] = await Promise.all([
    getHomeContent(),
    getContactTypes(),
  ]);

  return (
    <>
      <HeroSection content={homeContent?.hero_section} />
      <AboutSection content={homeContent?.about_us} />
      <PlatformServices content={homeContent?.discover} />
      <VideoSection src={homeContent?.introductory_video} />
      <Partners content={homeContent?.partners} />
      <ContactSection contactTypes={contactTypes} />
    </>
  );
}
