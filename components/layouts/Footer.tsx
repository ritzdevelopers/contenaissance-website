
"use client";
/// <reference types="react" />
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface FooterProps {
  isDarkMode: boolean;
  currentPage?: 'home' | 'portfolio' | 'services' | 'contact';
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, currentPage, navigateTo }) => {
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

  return (
    <>
      <footer className="bg-zinc-950 pt-5 " />
      <div className="fixed bottom-5 right-5 z-300">
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
