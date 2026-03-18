"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {

    useEffect(() => {

        const isMobile = window.innerWidth <= 767

        
        if (isMobile) {
            ScrollTrigger.config({ ignoreMobileResize: true })
            return
        }

        // ── Desktop only: Lenis ──
        let lenis: any
        let rafHandler: (time: number) => void

        const initLenis = async () => {
            const LenisModule = await import("lenis")
            const Lenis = LenisModule.default

            lenis = new Lenis({
                duration: 1.4,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 0.85,
                infinite: false,
                // touchMultiplier: 0 — 
            })

            lenis.on("scroll", ScrollTrigger.update)

            rafHandler = (time: number) => lenis.raf(time * 1000)
            gsap.ticker.add(rafHandler)
            gsap.ticker.lagSmoothing(0)
        }

        initLenis()

        return () => {
            if (lenis) lenis.destroy()
            if (rafHandler) gsap.ticker.remove(rafHandler)
        }

    }, [])

    return null
}