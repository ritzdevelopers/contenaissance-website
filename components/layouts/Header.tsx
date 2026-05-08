"use client";
/// <reference types="react" />
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Globe, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";
import { getAssetUrl } from "@/lib/assetUrl";

interface HeaderProps {
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const logoUrl = getAssetUrl("assets/image/logo.png");
  const websitePopupVideoUrl = getAssetUrl("assets/Video/website_popup to view.mp4");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const expertiseVideoRef = useRef<HTMLVideoElement | null>(null);

  const navItems = [
    { key: "home", path: "/", label: "Studio" },
    { key: "services-page", path: "/services", label: "Services" },
    { key: "portfolio", path: "/portfolio", label: "Portfolio" },
    { key: "contact", path: "/contact", label: "Contact" },
  ];

  const handleExpertiseVideoEnter = () => {
    const video = expertiseVideoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play();
  };

  const handleExpertiseVideoLeave = () => {
    const video = expertiseVideoRef.current;
    if (!video) return;
    video.muted = true;
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
      const l = (window as any).lenis;
      if (l?.stop) l.stop();
    } else {
      document.body.classList.remove("overflow-hidden");
      const l = (window as any).lenis;
      if (l?.start) l.start();
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      const l = (window as any).lenis;
      if (l?.start) l.start();
    };
  }, [mobileOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 8);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{
        y: hidden ? "-60px" : "0px",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
      transition={{ y: { duration: 0.4 }, opacity: { duration: 0.35 } }}
      className="fixed top-0 left-0 w-full z-[400] transition-colors duration-300 border-white/10"
    >
      <div className="max-w-400 mx-auto px-6 md:px-12 py-1 md:py-5 flex items-center justify-between h-23.75">
        {/* LOGO */}
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center group  cursor-pointer"
        >
          <img
            src={logoUrl}
            alt="Contenaissance Logo"
            className={`h-15 sm:h-1.25 md:h-16 w-auto max-w-full object-contain transition-all duration-700 group-hover:scale-105 ${!isDarkMode ? "brightness-125 contrast-125" : ""
              }`}
          />
        </button>

        {/* DESKTOP NAV */}
        {/* <nav className="hidden md:flex items-center gap-10 text-[13px] font-bold tracking-[0.05em] uppercase">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => router.push(item.path)}
              className={`transition-all duration-300 outline-none cursor-pointer ${currentPath === item.path ? "text-[#ab8922]" : "text-white"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav> */}

        <div className="w-10.5 hidden lg:block" />

        {/* MOBILE BUTTON — pill with "Menu" + bars */}
        <button
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
          className="cursor-pointer inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 hover:bg-white/15 px-5 py-2.5 text-white transition-colors"
        >
          <span className="text-[15px] font-medium leading-none">Menu</span>
          <span className="flex items-end gap-[3px] h-4">
            <span className="block w-[2px] h-2.5 bg-white rounded-full" />
            <span className="block w-[2px] h-4 bg-white rounded-full" />
            <span className="block w-[2px] h-3 bg-white rounded-full" />
          </span>
        </button>
      </div>


      {/* DESKTOP SLIDER — portal must not be wrapped by AnimatePresence (breaks mount) */}
      {mobileOpen &&
        createPortal(
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[490] bg-black/60 backdrop-blur-sm"
            />

            {/* FULL WIDTH TOP SLIDE — shop shutter */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.6,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="fixed top-0 left-0 z-[500] h-full w-full overflow-y-auto bg-linear-to-b from-[#0b0f1a] to-black"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex min-h-screen w-full flex-col"
              >
                <div className="mx-auto flex w-full max-w-[1320px] items-start justify-center px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8">
                  <div className="relative w-full">
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="absolute right-1 top-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-[#ab8922] sm:right-2 sm:top-2 sm:h-12 sm:w-12 md:-right-15 md:top-2 md:h-14 md:w-14 md:-translate-y-1/2 md:text-white/55"
                    >
                      <X size={20} />
                    </button>
                    <motion.section
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,#171717_0%,#111111_100%)] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
                    >
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                      <button
                        onClick={() => (window.location.href = "/")}
                        className="group flex cursor-pointer items-center gap-4"
                      >
                        <img src={logoUrl} alt="Contenaissance" className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                        {/* <span className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-white/90 transition-colors group-hover:text-white">Contenaissance</span> */}
                      </button>
                      {/* <p className="text-[32px] font-normal text-white/45">Stories, Engineered.</p> */}
                    </div>

                    <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
                      <div className="border-r border-white/10 p-3 sm:p-5 md:p-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                          Company
                        </p>
                        <div className="mt-4 space-y-1.5 sm:mt-6 sm:space-y-2 lg:mt-9 lg:space-y-2.5">
                          {navItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={() => {
                                router.push(item.path);
                                setMobileOpen(false);
                              }}
                              className={`block cursor-pointer border-0 bg-transparent p-0 text-left text-[24px] font-semibold leading-[1] tracking-[-0.02em] transition-colors duration-200 sm:text-[30px] md:text-[38px] lg:text-[48px] ${currentPath === item.path ? "text-[#ab8922]" : "text-white/90 hover:text-white"
                                }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>

                        <button
                          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-2 text-[12px] text-white/80 shadow-sm transition-colors hover:bg-white/10 sm:mt-7 sm:gap-3 sm:px-4 sm:py-2.5 sm:text-[14px] md:mt-10 md:px-5 md:py-3 md:text-[18px]"
                          type="button"
                        >
                          <Globe size={16} />
                          English
                          <ChevronDown size={14} />
                        </button>
                      </div>

                      <div className="p-3 sm:p-5 md:p-7">
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                          Expertise
                        </p>

                        <motion.div
                          initial={{ y: 18, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className=" p-3"
                        >
                          <video
                            ref={expertiseVideoRef}
                            src={websitePopupVideoUrl}
                            playsInline
                            muted
                            loop
                            autoPlay
                            preload="metadata"
                            onMouseEnter={handleExpertiseVideoEnter}
                            onMouseLeave={handleExpertiseVideoLeave}
                            onFocus={handleExpertiseVideoEnter}
                            onBlur={handleExpertiseVideoLeave}
                            className="h-[190px] w-full rounded-[14px] object-cover sm:h-[230px] md:h-[300px] lg:h-[350px]"
                          />
                        </motion.div>

                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.08em] text-white/70 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:text-[13px]">
                          {[
                            { name: "LinkedIn", url: "https://www.linkedin.com/company/contenaissance/" },
                            { name: "Instagram", url: "https://www.instagram.com/contenaissance/" },
                            { name: "Meta", url: "https://www.facebook.com/people/Contenaissance/61579738437856/" },
                            { name: "YouTube", url: "https://www.youtube.com/@Contenaissance" },
                          ].map((item) => (
                            <a
                              key={item.name}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 transition-colors hover:text-[#ab8922]"
                            >
                              {item.name}
                              <GoArrowUpRight />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    </motion.section>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>,
          document.body
        )}
    </motion.header>
  );
};

export default Header;