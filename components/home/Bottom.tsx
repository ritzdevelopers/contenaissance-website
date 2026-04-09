"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getAssetUrl } from "@/lib/assetUrl"

gsap.registerPlugin(ScrollTrigger)

export default function Bottom({ children }: { children?: React.ReactNode }) {

    const sectionRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {

    //     const ctx = gsap.context(() => {

    //         const mm = gsap.matchMedia()

    //         /* ---------------- DESKTOP ---------------- */
    //         mm.add("(min-width: 768px)", () => {

    //             gsap.set(".contact-section", { y: "100%" })

    //             gsap.timeline({
    //                 scrollTrigger: {
    //                     trigger: sectionRef.current,
    //                     start: "top 30%",
    //                     end: "+=200%",
    //                     scrub: 1,
    //                     pin: true,
    //                     pinSpacing: true,
    //                 }
    //             })
    //             .fromTo(
    //                 ".contact-section",
    //                 { y: "100%" },
    //                 { y: "0%", ease: "none" },
    //                 0
    //             )
    //         })

    //         /* ---------------- MOBILE ---------------- */
    //         mm.add("(max-width: 767px)", () => {

    //             gsap.set(".contact-section", { y: "60vh" })

    //             gsap.timeline({
    //                 scrollTrigger: {
    //                     trigger: sectionRef.current,
    //                     start: "top top",
    //                     end: "+=200%",
    //                     scrub: 0.5,
    //                     pin: true,
    //                     pinSpacing: true,
    //                     fastScrollEnd: true,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })
    //             .fromTo(
    //                 ".contact-section",
    //                 { y: "60vh" },
    //                 { y: "0vh", ease: "none" },
    //                 0
    //             )
    //         })

    //     }, sectionRef)

    //     return () => ctx.revert()

    // }, [])

    return (
        <section
            // ref={sectionRef}
            className="bottom-section relative w-full flex items-center justify-center z-0 overflow-hidden"
        >
            <div className="video-wrapper w-full flex items-end justify-center">
                <img
                    src={getAssetUrl("assets/image/Group.png")}
                    alt="Footer Image"
                    className="w-full object-contain rounded-xl pointer-events-none"
                />
                {children}
            </div>
        </section>
    )
}