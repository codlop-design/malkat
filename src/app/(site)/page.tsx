import AboutSection from "@/src/features/home/AboutSection";
import ContactSection from "@/src/features/home/ContactSection";
import HeroSection from "@/src/features/home/HeroSection";
import Partners from "@/src/features/home/Partners";
import PlatformServices from "@/src/features/home/PlatformServices";
import VideoSection from "@/src/features/home/VideoSection";

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
