"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Home, Clapperboard, Film, Mail, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";

interface HeaderProps {
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const logoUrl =
    "https://res.cloudinary.com/dbpx7aobb/image/upload/v1773733459/2_1_1_1_kpcs3b.png";

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
      className="fixed top-0 left-0 w-full z-[400] transition-colors duration-300 border-white/10"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-1 md:py-5 flex items-center justify-between h-[95px]">
        {/* LOGO */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center group outline-none cursor-pointer"
        >
          <img
            src={logoUrl}
            alt="Contenaissance Logo"
            className={`h-[60px] sm:h-[5px] md:h-[4rem] w-auto max-w-full object-contain transition-all duration-700 group-hover:scale-105 ${!isDarkMode ? "brightness-125 contrast-125" : ""
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

        <div className="w-[42px] hidden md:block" />

        {/* MOBILE BUTTON */}
        <button
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
          className=" cursor-pointer inline-flex items-center justify-center rounded-full w-5 h-5 text-white"
        >
          <div className="flex flex-col items-end gap-[5px]">
            <span className="block w-6 h-[3px] bg-white rounded-full" />
            <span className="block w-9 h-[3px] bg-white rounded-full" />
            <span className="block w-7 h-[3px] bg-white rounded-full" />
          </div>
        </button>
      </div>


      {/* DESKTOP SIDE SLIDER */}
      {mobileOpen &&
        createPortal(
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed    hidden md:block"
            />

            {/* SLIDER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              className="fixed top-0 right-0 h-full w-[420px] z-[500] hidden md:flex bg-gradient-to-b from-[#0b0f1a] to-black border-l border-white/10 backdrop-blur-xl"
            >
              <div className="flex flex-col w-full p-10">

                {/* TOP BAR */}
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[11px] tracking-[0.4em] uppercase text-white/40">
                    Navigation
                  </span>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className=" cursor-pointer w-11 h-11 rounded-full border border-white/10 
              bg-white/5 hover:bg-white/10 flex items-center justify-center 
              transition"
                  >
                    <X size={18} className="text-white" />
                  </button>
                </div>

                {/* MENU */}
                <div className="flex flex-col">

                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: idx * 0.1,              // stagger buttons top-to-bottom
                        type: "spring",
                        stiffness: 120,
                        damping: 15
                      }}
                      onClick={() => {
                        router.push(item.path);
                        setMobileOpen(false);
                      }}
                      className={`group  text-left text-[3rem] font-bold  uppercase cursor-pointer
                transition-all duration-300 hover:text-[#ab8922] ${currentPath === item.path
                          ? "text-[#ab8922]"
                          : "text-white "
                        }`}
                    >
                      <span className="flex items-center justify-between">

                        <span className="flex items-center gap-4">
                          {/* {navIcons[item.key]} */}
                          {item.label}
                        </span>

                        {/* <span className="w-10 h-[1px] bg-white/20 group-hover:bg-[#ab8922] transition" /> */}

                      </span>
                    </motion.button>
                  ))}
                </div>


                <div className="mt-auto pt-3 border-t border-white/10">

                  <p className="text-[#ab8922] text-md font-bold tracking-[0.2em] uppercase mb-2">
                    Social Media
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm tracking-[0.2em] uppercase">

                    <a
                      href="https://www.facebook.com/people/Contenaissance/61579738437856/"
                      target="_blank"
                      className="flex items-center  text-white hover:text-[#ab8922] hover:font-bold transition group"
                    >
                      <span>LinkedIn</span>
                      <GoArrowUpRight className="text-lg opacity-60 transition hover:font-bold" />
                    </a>

                    <a
                      href="https://www.instagram.com/contenaissance/"
                      target="_blank"
                      className="flex items-center  text-white hover:text-[#ab8922] transition hover:font-bold group"                    >
                      <span>Instagram</span>
                      <GoArrowUpRight className="text-lg opacity-60 transition hover:font-bold" />
                    </a>

                    <a
                      href="https://www.facebook.com/people/Contenaissance/61579738437856/"
                      target="_blank"
                      className="flex items-center  text-white hover:text-[#ab8922] transition hover:font-bold group"                      >
                      <span>Facebook</span>
                      <GoArrowUpRight className="text-lg opacity-60 transition hover:font-bold" />

                    </a>

                    <a
                      href="https://www.youtube.com/@Contenaissance"
                      target="_blank"
                      className="flex items-center  text-white hover:text-[#ab8922] transition group hover:font-bold"                    >
                      <span>YouTube</span>
                      <GoArrowUpRight className="text-lg opacity-60  transition hover:font-bold" />
                    </a>

                  </div>
                </div>

              </div>
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
            className="fixed inset-0 z-[500] md:hidden bg-[#05070d] overflow-y-auto"
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
                <span className="text-[11px] tracking-[0.4em] uppercase text-white/40 my-5">
                  Navigate
                </span>

                <div className="w-full max-w-[520px] space-y-4">
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
                      className=" cursor-pointer w-full px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white uppercase tracking-[0.35em] text-[12px] flex items-center justify-between"
                    >
                      <span className="flex items-center gap-4">
                        {navIcons[item.key]}
                        {item.label}
                      </span>
                      <span className="w-10 h-[1px] bg-white/20" />
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
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/30">
                  Ritz Gen AI Storytelling Studios
                </span>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </motion.header>
  );
};

export default Header;