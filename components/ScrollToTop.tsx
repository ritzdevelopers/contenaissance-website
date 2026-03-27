"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll
    window.scrollTo(0, 0);

    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Kill all GSAP ScrollTriggers
    const ScrollTrigger =
      require("gsap/ScrollTrigger").ScrollTrigger;

    ScrollTrigger.getAll().forEach((t: any) => t.kill());

  }, [pathname]);

  return null;
}