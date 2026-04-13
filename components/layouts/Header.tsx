"use client";
/// <reference types="react" />
import React, { useEffect, useState, JSX } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Home, Clapperboard, Film, Mail, X } from "lucide-react";
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

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

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
      className="fixed top-0 left-0 w-full z-400 transition-colors duration-300 border-white/10"
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

        {/* MOBILE BUTTON */}
        <button
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
          className=" cursor-pointer inline-flex items-center justify-center rounded-full w-5 h-5 text-white"
        >
          <div className="flex flex-col items-end gap-1.25">
            <span className="block w-6 rounded-full" style={{ height: '3px', backgroundColor: 'white' }} />
            <span className="block w-9 rounded-full" style={{ height: '3px', backgroundColor: 'white' }} />
            <span className="block w-7 rounded-full" style={{ height: '3px', backgroundColor: 'white' }} />
          </div>
        </button>
      </div>


      {/* DESKTOP SLIDER */}
      {mobileOpen &&
        createPortal(
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-490 hidden lg:block"
            />

            {/* FULL WIDTH TOP SLIDE */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 left-0 w-full h-full z-500 hidden lg:block bg-linear-to-b from-[#0b0f1a] to-black "
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.35,
                  delay: 0.04,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-full h-full flex flex-col"
              >
                {/* CONTAINER */}
                <div className="max-w-400 mx-auto px-6 md:px-12 py-1 md:py-5 w-full flex flex-col h-full">

                  {/* TOP BAR */}
                  <div className="flex items-center justify-between h-23.75 mb-12">
                    <button
                      onClick={() => (window.location.href = "/")}
                      className="flex items-center group cursor-pointer"
                    >
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className={`h-15 md:h-16 transition-all duration-700 group-hover:scale-105 ${!isDarkMode ? "brightness-125 contrast-125" : ""
                          }`}
                      />
                    </button>

                    <button
                      onClick={() => setMobileOpen(false)}
                      className="w-12 h-12 rounded-full border border-white/10 hover:border-[#ab8922] bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer "
                    >
                      <X size={18} className="text-white hover:text-[#ab8922]" />
                    </button>
                  </div>

                  {/* MENU WITH STAGGER */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.2,
                        },
                      },
                    }}
                    className="flex flex-wrap w-full px-4 md:px-[12%] mx-auto pt-10 gap-y-12 text-justify justify-between"                  >
                    {navItems.map((item, idx) => (
                      <div key={item.key} className="overflow-hidden flex group relative">

                        {/* TEXT WRAPPER (animation applied here) */}
                        <motion.p
                          variants={{
                            hidden: { y: 120, opacity: 0 },
                            visible: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1], // exact same as your SCSS
                                delay: idx * 0.08,
                              },
                            },
                          }}
                          onClick={() => {
                            router.push(item.path);
                            setMobileOpen(false);
                          }}
                          className={`group cursor-pointer relative w-max pb-2 text-[40px] min-[1240px]:text-[52px] font-bold uppercase leading-[117%] transition-colors duration-300 ${currentPath === item.path
                            ? "text-[#ab8922]"
                            : "text-white hover:text-[#ab8922]"
                            }`}
                        >
                          {item.label}
                          <div
                            className={`pointer-events-none absolute left-0 bottom-0 h-0.5 w-full origin-left bg-[#ab8922] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${currentPath === item.path ? "scale-x-0 group-hover:scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                              }`}
                          />


                        </motion.p>
                      </div>
                    ))}
                  </motion.div>

                  {/* SOCIAL */}
                  <div className="mt-auto pt-5 border-t border-white/10 text-center">
                    <p className="text-[#ab8922] text-md font-bold tracking-[0.2em] uppercase mb-5">
                      Social Media
                    </p>

                    <div className="flex flex-row gap-6 justify-center text-sm uppercase">
                      {[
                        { name: "LinkedIn", url: "https://www.linkedin.com/company/contenaissance/" },
                        { name: "Instagram", url: "https://www.instagram.com/contenaissance/" },
                        { name: "Facebook", url: "https://www.facebook.com/people/Contenaissance/61579738437856/" },
                        { name: "YouTube", url: "https://www.youtube.com/@Contenaissance" },
                      ].map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-white hover:text-[#ab8922] transition"
                        >
                          {item.name}
                          <GoArrowUpRight />
                        </a>
                      ))}
                    </div>
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
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-500 lg:hidden bg-[#05070d] overflow-y-auto"
          >
            <div className="flex flex-col min-h-screen px-6 pt-6 pb-10 relative">
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <img src={logoUrl} alt="Logo" className="h-10 object-contain" />

                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Center Content */}
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-[11px] tracking-[0.4em] uppercase text-white/40 my-5">
                  Navigate
                </div>

                <div className="w-full max-w-130 space-y-4">
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
                      className=" cursor-pointer w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl text-white uppercase tracking-[0.35em] text-[12px] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {navIcons[item.key]}
                        {item.label}
                      </div>
                      <div className="w-10 h-px bg-white/20" />
                    </motion.button>
                  ))}

                  {/* CONTACT BUTTON */}
                  <button
                    onClick={() => {
                      router.push("/contact");
                      setMobileOpen(false);
                    }}
                    className="w-full mt-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-[0.35em] text-[12px]"
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