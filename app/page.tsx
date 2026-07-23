import RevealObserver from "@/components/RevealObserver";
import Navbar from "@/components/Navbar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingCV from "@/components/FloatingCV";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFollower from "@/components/CursorFollower";
import SectionProgress from "@/components/SectionProgress";
export default function Home() {
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <SectionProgress />
      <RevealObserver />
      <Navbar />
      <AnnouncementBanner />
      <main id="top">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <MobileNav />
      <FloatingCV />
    </>
  );
}
