"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";


gsap.registerPlugin(ScrollTrigger);
// ---------Srcoll
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ServicesProps {
  isDarkMode: boolean;
  isFullPage?: boolean;

  navigateTo?: (
    page: 'home' | 'portfolio' | 'services-page' | 'contact',
    sectionId?: string
  ) => void;
}

/* ========================= */
/* ORIGINAL CARD (UNCHANGED STYLE) */
/* ========================= */

const ServiceCard: React.FC<{
  title: string;
  description: string;
  delay: number;
  onClick: () => void;
}> = ({ title, description, delay, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative group h-full"
    >
      {/* Outer Glow */}
      <div className="absolute -inset-[1px] rounded-[28px] opacity-30 
    group-hover:opacity-70 transition duration-500 
     
    pointer-events-none"
      />

      {/* Main Card */}
      <div className="relative h-full flex flex-col rounded-[28px] border border-[#3A3A3E] 
            p-5 sm:p-6 md:p-8 lg:p-5 text-justify
            overflow-hidden transition-all duration-500
            bg-gradient-to-b from-white/[0.02] to-white/[0.01]
            backdrop-blur-xl cursor-pointer">

        {/* Premium Gradient Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-2xl" />
        </div>

        {/* Inner Glass Container */}
        <div className="font-sora bg-zinc-900/40 rounded-[22px] p-4 sm:p-5 md:p-6 lg:p-7 "
        >
          {/* Badge */}
          <div className="inline-block mb-4 sm:mb-5">
            <span className="font-sora px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-[#3B82F6] text-white">
              Use Case
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sora text-lg sm:text-xl md:text-2xl lg:text-2xl 
        font-semibold text-white mb-3 tracking-tight"
          >
            {title}
          </h3>

          {/* Description */}
          <p className="font-sora text-sm sm:text-sm md:text-base lg:text-[15px]
        text-white/60 leading-relaxed"
          >
            {description}
          </p>

          {/* Explore */}
          <div className="mt-auto pt-6">
            <span className="text-yellow-500 font-medium text-xs sm:text-sm 
          flex items-center gap-2 
          group-hover:gap-3 transition-all duration-300 cursor-pointer"
            >
              Explore More
              <span className="transition-transform duration-300 group-hover:translate">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ========================= */
/* SECTION */
/* ========================= */

const Services: React.FC<ServicesProps> = ({
  isDarkMode,
  isFullPage = false,
  navigateTo
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fishRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  useEffect(() => {
    if (!sectionRef.current || !fishRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(fishRef.current, {
        x: window.innerWidth < 768 ? -200 : -600,
        y: 1000,
        rotation: -25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 2
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allServices = [
    {
      id: "ai-brand",
      title: "AI Brand Films",
      description: "Discover how to turn your brand story into a cinematic experience via AI-driven 3D technology.  We use generative AI to make brand films with dynamic live action in a synthetic environment that boosts your brand and captures imagination!"
    },
    {
      id: "digital-first",
      title: "Digital-First Content",
      description: "Design high-velocity content for any modern digital consumption platform. Using advanced AI tools, we help you craft compelling and contextual visuals that connect with your audience across diverse social ecosystems."
    },
    {
      id: "ai-powered",
      title: "AI-Powered Campaigns",
      description: "Enhance campaigns with AI and scale marketing. Our strategies are based on data and performance, guaranteeing you the best ROI for your digital marketing budget."
    },
    {
      id: "visual-identity",
      title: "Visual Identity Systems",
      description: "Create your brand’s AI- driven visual identity system. We design brand frameworks that are memorable and scalable and apply the necessary look and feel to brand touchpoints in an AI - enabled world."
    }
  ];

  const router = useRouter();

  const handleScroll = (id: string) => {
    router.push(`/services#${id}`);
  };

  return (
    <div className="bg-zinc-950 ">
      <section
        id="services"
        ref={sectionRef}
        className={`relative overflow-hidden min-h-screen bg-zinc-950 
          ${isFullPage ? "pt-32 md:pt-48 lg:pt-56" : "-mt-6 py-12 md:py-16"} 
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 
          max-w-[1600px] mx-auto`}
      >
        {/* Header */}
        <div className="relative z-10 flex flex-col mb-10 md:mb-14">
          <motion.div
            style={{ opacity, y }}
            className="flex items-center gap-3 mb-4 "
          >
            <div className="w-8 h-[1px] bg-blue-500/50" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">
              Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2rem,10vw,11rem)] font-bold tracking-tighter text-white leading-none"
          >
            AI Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg font-light text-white/70 mt-4"
          >
            Merging human creative intuition with the raw power of neural intelligence.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10  font-sora items-stretch ">
          {allServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              delay={index * 0.1}
              title={service.title}
              description={service.description}
              onClick={() => handleScroll(service.id)}
            />

          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;