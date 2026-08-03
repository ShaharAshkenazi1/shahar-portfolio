import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingCV from "@/components/FloatingCV";
import ScrollProgress from "@/components/ScrollProgress";
import SectionProgress from "@/components/SectionProgress";

const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Skills = dynamic(() => import("@/components/Skills"));
const Contact = dynamic(() => import("@/components/Contact"));
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
