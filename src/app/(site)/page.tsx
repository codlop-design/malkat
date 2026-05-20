import AboutSection from "@/src/components/home/AboutSection";
import ContactSection from "@/src/components/home/ContactSection";
import HeroSection from "@/src/components/home/HeroSection";
import Partners from "@/src/components/home/Partners";
import PlatformServices from "@/src/components/home/PlatformServices";
import VideoSection from "@/src/components/home/VideoSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PlatformServices />
      <VideoSection />
      <Partners />
      <ContactSection />
    </>
  );
}
