"use client";
/// <reference types="react" />
import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import FooterWave from "./FooterWave";

interface FooterProps {
  isDarkMode: boolean;
  currentPage?: 'home' | 'portfolio' | 'services' | 'contact';
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });

  const scrollToTop = () => {
    const l = (window as any).lenis;
    if (l && typeof l.scrollTo === 'function') {
      l.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const ringRadius = 23;
  const brandWord = "CONTENAISSANCE";
  const brandRef = useRef<HTMLHeadingElement>(null);
  const brandInView = useInView(brandRef, { once: false, amount: 0.25 });
  const linkColor = isDarkMode ? "text-white/78 hover:text-white" : "text-zinc-700 hover:text-zinc-950";
  const footerBg = isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-950";
  const optimaStyle = { fontFamily: "Optima, Segoe UI, Candara, Noto Sans, sans-serif" };

  return (
    <>
      <footer className={`relative z-10  pt-10 rgba(17, 17, 19, 0.90)`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30 bg-rgba(17, 17, 19, 0.90)" />

        <div className="mx-auto">
          <div className="relative overflow-hidden rounded-t-[120px] rounded-b-none bg-[#2d2c2c]  px-5 py-8 sm:px-10 sm:py-10 md:px-14 md:pt-12 md:pb-7">
            {/* Top inward curve/notch */}

            {/* Animated wave background */}
            <FooterWave className="z-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(17,17,19,0)_0%,rgba(17,17,19,0.55)_70%,rgba(17,17,19,0.95)_100%)]"
            />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div
                style={optimaStyle}
                className="grid grid-cols-2 gap-x-9 gap-y-3 text-[18px] font-[550] leading-normal"
              >
                <Link href="/" className={`inline-flex items-center pr-[9px] pb-[6px] transition-colors ${linkColor}`}>Home</Link>
                <Link href="/portfolio" className={`inline-flex items-center pr-[9px] pb-[6px] transition-colors ${linkColor}`}>Portfolio</Link>
                <Link href="/services" className={`inline-flex items-center pr-[9px] pb-[6px] transition-colors ${linkColor}`}>Services</Link>
                <Link href="/contact" className={`inline-flex items-center pr-[9px] pb-[6px] transition-colors ${linkColor}`}>Contact</Link>
              </div>

              <div className="w-full max-w-xl">
                <p
                  style={optimaStyle}
                  className="mb-3 text-[18px] leading-normal font-normal text-white"
                >
                  Still have a questions
                </p>
                <form
                  className="flex w-full items-center gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-[42px] w-full flex-1 rounded-[50px] border border-white bg-white px-5 text-[14px] font-normal leading-normal text-black/80 outline-none transition placeholder:font-sora placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal placeholder:text-black/40 focus:border-[#AE8C20] focus:ring-2 focus:ring-[#AE8C20]/25"
                  />
                  <button
                    type="submit"
                    className="flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-[50px] border border-[#AE8C20] bg-[#AE8C20] px-[34px] font-sora text-[15px] font-normal leading-none text-white transition hover:bg-[#c19a26]"
                  >
                    Send Us
                  </button>
                </form>
              </div>
            </div>

            <div className="relative z-10 mt-8 overflow-hidden">
              <motion.h2
                ref={brandRef}
                style={optimaStyle}
                className="flex w-full justify-center text-center flex-wrap items-end gap-y-1 text-[clamp(3rem,9.8vw,140px)] font-bold leading-normal tracking-[0.01em] text-white uppercase"
                initial={false}
                animate={brandInView ? "show" : "hidden"}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.12,
                    },
                  },
                }}
              >
                {brandWord.split("").map((char, idx) => (
                  <motion.span
                    key={`${char}-${idx}`}
                    variants={{
                      hidden: { y: 160, opacity: 0, filter: "blur(7px)", scale: 0.82, rotateZ: 2.2 },
                      show: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, rotateZ: 0 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 24,
                      mass: 1.05,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <div className="relative z-10 mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sora text-[14px] font-light leading-normal text-white">
                © {new Date().getFullYear()} Contenaissance. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-4 font-sora text-[14px] font-light leading-normal text-white">
                <Link href="#" className="transition hover:opacity-80">Privacy Policy</Link>
                <Link href="#" className="transition hover:opacity-80">Cookies Policy</Link>
                <span>
                  Website by{" "}
                  <a
                    href="https://ritzmediaworld.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ritzmediaworld-link relative inline-block transition-opacity duration-200 hover:opacity-90"
                  >
                    ritzmediaworld
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-5 right-5 z-[300]">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -6 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/10 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-all duration-300 group shadow-lg shadow-black/40 hover:shadow-amber-500/20 overflow-hidden"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 rounded-full ring-1 ring-white/10 opacity-100 transition-opacity duration-300" />
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            <circle
              cx="28"
              cy="28"
              r={ringRadius}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r={ringRadius}
              fill="none"
              stroke="rgb(251 191 36)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: smoothProgress }}
            />
          </svg>
          <ArrowUp 
            size={22} 
            className="relative z-10 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-amber-300 drop-shadow-lg" 
            strokeWidth={2.5}
          />
        </motion.button>
      </div>
    </>
  );
};

export default Footer;
