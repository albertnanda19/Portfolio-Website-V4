import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/Cursor";
import { SplashScreen } from "@/components/ui/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <CustomCursor />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <TechStack />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}
