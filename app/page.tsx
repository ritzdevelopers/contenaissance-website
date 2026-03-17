"use client";

import { useEffect, useState } from "react";
import Butterfly from "@/components/Butterfly";
import Hero from "@/components/home/Hero";
import StorySections from "@/components/home/StorySections";
import ParticlesBg from "@/components/ParticlesBg";
import SmoothScroll from "@/components/SmoothScroll";
import SnowEffect from "@/components/SnowEffects";
import Hero1 from "@/components/home/Hero1";
import PageAnimations from "@/components/PageAnimations";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import AIQuote from "@/components/home/AIQuote";
import Contact from "@/components/layouts/Contact";
import Reels from "@/components/home/Reels";
import Interactive from "@/components/home/Interactive";
import Services from "@/components/home/Services";
import ThreeDSection from "@/components/home/ThreeDSection";
import Expert from "@/components/home/Expert";
import Mosaic from "@/components/home/Mosaic";
import Bottom from "@/components/home/Bottom";
import FooterCTA from "@/components/layouts/FooterCTA";

export default function Page() {

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="relative page-wrapper bg-black text-white">
      <Header isDarkMode={isDarkMode} />
      {/* Background effects */}
      {isDarkMode && <SnowEffect />}
      <ParticlesBg />
      <SmoothScroll />
      <Hero />
      <Hero1 isDarkMode={isDarkMode} />
      <AIQuote isDarkMode={isDarkMode} />
      <Reels isDarkMode={isDarkMode} />
      <Interactive isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <ThreeDSection isDarkMode={isDarkMode} />
      <Expert isDarkMode={isDarkMode} />
      <Mosaic isDarkMode={isDarkMode} />
      {/* <FooterCTA /> */}
      <Bottom >
        <FooterCTA />
        {/* <Contact isDarkMode={isDarkMode} /> */}
      </Bottom>

      {!isMobile && <PageAnimations />}

      {!isMobile && <PageAnimations />}

      <section className="" />
      <Footer isDarkMode={isDarkMode} />
    </main>

  );
}
