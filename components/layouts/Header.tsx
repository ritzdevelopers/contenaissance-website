"use client";
/// <reference types="react" />
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Home, Clapperboard, Film, Mail, X, Globe, ChevronDown } from "lucide-react";
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

  const navIcons: any = {
    home: <Home size={16} className="opacity-80" />,
    "services-page": <Clapperboard size={16} className="opacity-80" />,
    portfolio: <Film size={16} className="opacity-80" />,
    contact: <Mail size={16} className="opacity-80" />,
  };

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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[490] hidden lg:block"
            />

            {/* FULL WIDTH TOP SLIDE — shop shutter */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.6,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="fixed top-0 left-0 w-full h-full z-[500] hidden lg:block bg-linear-to-b from-[#0b0f1a] to-black overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-full h-full flex flex-col"
              >
                <div className="mx-auto flex h-full w-full max-w-[1320px] items-start justify-center px-6 py-6 md:px-10 md:py-8">
                  <div className="relative w-full">
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="absolute -right-15 top-2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/55 transition-colors hover:bg-white/10 hover:text-[#ab8922]"
                    >
                      <X size={22} />
                    </button>
                    <motion.section
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,#171717_0%,#111111_100%)] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
                    >
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
                      <button
                        onClick={() => (window.location.href = "/")}
                        className="group flex cursor-pointer items-center gap-4"
                      >
                        <img src={logoUrl} alt="Contenaissance" className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                        {/* <span className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-white/90 transition-colors group-hover:text-white">Contenaissance</span> */}
                      </button>
                      {/* <p className="text-[32px] font-normal text-white/45">Stories, Engineered.</p> */}
                    </div>

                    <div className="grid grid-cols-[250px_1fr]">
                      <div className="border-r border-white/10 p-5 md:p-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                          Company
                        </p>
                        <div className="mt-9 space-y-2.5">
                          {navItems.map((item) => (
                            <button
                              key={item.key}
                              onClick={() => {
                                router.push(item.path);
                                setMobileOpen(false);
                              }}
                              className={`block cursor-pointer border-0 bg-transparent p-0 text-left text-[48px] font-semibold leading-[0.98] tracking-[-0.02em] transition-colors duration-200 ${currentPath === item.path ? "text-[#ab8922]" : "text-white/90 hover:text-white"
                                }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>

                        <button
                          className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-[18px] text-white/80 shadow-sm transition-colors hover:bg-white/10"
                          type="button"
                        >
                          <Globe size={20} />
                          English
                          <ChevronDown size={18} />
                        </button>
                      </div>

                      <div className="p-5 md:p-7">
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
                            className="h-[350px] w-full rounded-[14px] object-cover"
                          />
                        </motion.div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-[13px] uppercase tracking-[0.08em] text-white/70">
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

      {/* MOBILE MENU */}
      {mobileOpen &&
        createPortal(
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[500] lg:hidden bg-[#05070d] overflow-y-auto"
          >
            <div className="relative flex min-h-screen flex-col px-5 pb-10 pt-5 sm:px-8 sm:pt-6 md:px-12">
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <img src={logoUrl} alt="Logo" className="h-10 object-contain sm:h-12" />

                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white sm:h-12 sm:w-12"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Center Content */}
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="my-5 text-[11px] uppercase tracking-[0.4em] text-white/40 sm:my-6">
                  Navigate
                </div>

                <div className="w-full max-w-[680px] space-y-4">
                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * idx }}
                      onClick={() => {
                        router.push(item.path);
                        setMobileOpen(false);
                      }}
                      className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-5 py-4 text-[12px] uppercase tracking-[0.28em] text-white backdrop-blur-xl sm:px-6 sm:text-[13px] md:py-5 md:text-[14px]"
                    >
                      <div className="flex items-center gap-4">
                        {navIcons[item.key]}
                        {item.label}
                      </div>
                      <div className="h-px w-10 bg-white/20" />
                    </motion.button>
                  ))}

                  {/* CONTACT BUTTON */}
                  <button
                    onClick={() => {
                      router.push("/contact");
                      setMobileOpen(false);
                    }}
                    className="mt-6 w-full rounded-full bg-white py-3 text-[12px] font-bold uppercase tracking-[0.32em] text-black sm:text-[13px]"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="mt-12 text-center">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/30">
                  Ritz Gen AI Storytelling Studios
                </p>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </motion.header>
  );
};

export default Header;