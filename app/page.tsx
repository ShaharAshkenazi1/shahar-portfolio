import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingCV from "@/components/FloatingCV";
import ScrollProgress from "@/components/ScrollProgress";
import SectionProgress from "@/components/SectionProgress";
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SectionProgress />
      <Navbar />
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
