import AboutSection from "../components/home/AboutSection";
import HeroSection from "../components/home/HeroSection";
import PlatformServices from "../components/home/PlatformServices";
import VideoSection from "../components/home/VideoSection";
import Partners from "../components/home/Partners";
import ContactSection from "../components/home/ContactSection";

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
