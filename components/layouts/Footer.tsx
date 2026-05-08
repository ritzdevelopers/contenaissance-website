"use client";
/// <reference types="react" />
import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import FooterWave from "./FooterWave";
import { getAssetUrl } from "@/lib/assetUrl";

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
  const brandLogoUrl = getAssetUrl("assets/image/logo.png");
  const linkColor = isDarkMode ? "text-white/78 hover:text-white" : "text-zinc-700 hover:text-zinc-950";
  const footerBg = isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-950";
  const optimaStyle = { fontFamily: "Optima, Segoe UI, Candara, Noto Sans, sans-serif" };

  return (
    <>
      <footer className="relative z-10 pt-6 sm:pt-10 bg-[rgba(17,17,19,0.90)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30 bg-[rgba(17,17,19,0.90)]" />

        <div className="mx-auto">
          <div className="relative overflow-hidden rounded-t-[40px] sm:rounded-t-[70px] md:rounded-t-[100px] lg:rounded-t-[120px] rounded-b-none bg-[#2d2c2c] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:pt-12 md:pb-7 lg:px-14">
            {/* Top inward curve/notch */}

            {/* Animated wave background */}
            <FooterWave className="z-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(17,17,19,0)_0%,rgba(17,17,19,0.55)_70%,rgba(17,17,19,0.95)_100%)]"
            />

            <div className="relative z-10 flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between md:gap-8 lg:gap-0">
              {/* Nav links + Logo — stacks on mobile, side-by-side on md+ */}
              <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:w-auto md:justify-start md:gap-10 lg:gap-14">
                <div
                  style={optimaStyle}
                  className="grid w-full max-w-[320px] grid-cols-2 justify-items-center gap-x-4 gap-y-2.5 text-[14px] sm:w-auto sm:max-w-none sm:justify-items-start sm:gap-x-7 sm:text-[16px] md:text-[18px] font-[550] leading-normal"
                >
                  <Link href="/" className={`inline-flex items-center justify-center pb-[6px] transition-colors sm:justify-start sm:pr-[9px] ${linkColor}`}>Home</Link>
                  <Link href="/portfolio" className={`inline-flex items-center justify-center pb-[6px] transition-colors sm:justify-start sm:pr-[9px] ${linkColor}`}>Portfolio</Link>
                  <Link href="/services" className={`inline-flex items-center justify-center pb-[6px] transition-colors sm:justify-start sm:pr-[9px] ${linkColor}`}>Services</Link>
                  <Link href="/contact" className={`inline-flex items-center justify-center pb-[6px] transition-colors sm:justify-start sm:pr-[9px] ${linkColor}`}>Contact</Link>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    id="footer-logo"
                    src={brandLogoUrl}
                    alt="Contenaissance"
                    className="h-auto w-[78px] sm:w-[92px] md:w-[min(22vw,130px)] object-contain"
                  />
                </div>
              </div>

              <div className="w-full md:max-w-[460px] lg:max-w-xl">
                <p
                  style={optimaStyle}
                  className="mb-3.5 text-center sm:text-left text-[16px] sm:text-[17px] md:text-[18px] leading-normal font-normal text-white"
                >
                  Still have a questions
                </p>
                <form
                  className="mx-auto mt-1 flex w-full flex-col items-stretch gap-3.5 sm:mx-0 sm:mt-0 sm:flex-row sm:items-center sm:gap-2.5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="h-[50px] w-full flex-1 rounded-[50px] border-2 border-white bg-white py-4 sm:py-5 px-6 sm:px-5 mx-auto text-[15px] sm:text-[15px] font-medium leading-normal text-black/90 shadow-[0_8px_22px_rgba(0,0,0,0.24)] outline-none transition placeholder:font-sora placeholder:text-[15px] placeholder:font-normal placeholder:leading-normal placeholder:text-black/60 focus:border-[#AE8C20] focus:ring-2 focus:ring-[#AE8C20]/35"
                  />
                  <button
                    type="submit"
                    className="flex h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-[50px] border-2 border-[#AE8C20] bg-[#AE8C20] px-6 font-sora text-[16px] font-semibold sm:w-auto sm:px-[34px] sm:text-[15px] leading-none text-white shadow-[0_10px_24px_rgba(174,140,32,0.38)] transition hover:bg-[#c19a26]"
                  >
                    Send Us
                  </button>
                </form>
              </div>
            </div>

            <div className="relative z-10 mt-4 flex flex-col gap-3 border-t border-white/10 pt-5 sm:pt-8 pb-2 pr-0 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center font-sora text-[11px] sm:text-left sm:text-[13px] lg:text-[14px] font-light leading-normal text-white">
                © {new Date().getFullYear()} Contenaissance. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-center gap-2 sm:gap-4 font-sora text-[11px] sm:text-[13px] lg:text-[14px] font-light leading-normal text-white">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Link href="#" className="transition hover:opacity-80">Privacy Policy</Link>
                  <Link href="#" className="transition hover:opacity-80">Cookies Policy</Link>
                </div>
                <span className="text-center sm:text-left">
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
