"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getAssetUrl } from "@/lib/assetUrl"

gsap.registerPlugin(ScrollTrigger)

export default function Bottom({ children }: { children?: React.ReactNode }) {

    // const sectionRef = useRef<HTMLDivElement>(null)
    // const videoRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {

    //     const ctx = gsap.context(() => {

    //         const mm = gsap.matchMedia()

    //         /* ---------------- DESKTOP ---------------- */
    //         mm.add("(min-width: 768px)", () => {

    //             // Desktop pe CSS scale override karo
    //             gsap.set(videoRef.current, { clearProps: "transform" })
    //             gsap.set(".contact-section", { y: "120vh" })

    //             const tl = gsap.timeline({
    //                 scrollTrigger: {
    //                     trigger: sectionRef.current,
    //                     start: "top 30%",
    //                     end: "+=200%",
    //                     scrub: 1,
    //                     pin: true,
    //                     pinSpacing: true,
    //                 }
    //             })

    //             tl.fromTo(
    //                 videoRef.current,
    //                 { scale: 0.5 },
    //                 { scale: 1, ease: "none" },
    //                 0
    //             )

    //             tl.fromTo(
    //                 ".contact-section",
    //                 { y: "120vh" },
    //                 { y: "0vh", ease: "none" },
    //                 0
    //             )
    //         })

    //         /* ---------------- MOBILE ---------------- */
    //         mm.add("(max-width: 767px)", () => {

    //             gsap.set(videoRef.current, { force3D: true })
    //             gsap.set(".contact-section", { y: "60vh" })

    //             const tl = gsap.timeline({
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

    //             tl.fromTo(
    //                 videoRef.current,
    //                 { scale: 0.75 },
    //                 { scale: 1, ease: "power1.out" },
    //                 0
    //             )

    //             tl.fromTo(
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
            className="bottom-section relative w-full flex items-center justify-center z-0 overflow-visible"
        >
            <div
                // ref={videoRef}
                className="video-wrapper w-full h-full flex items-end justify-center"
            >
                {/* <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    className="w-full h-full object-cover rounded-xl pointer-events-none"
                >
                    <source
                        src="/assets/Video/footer.mp4"
                        type="video/mp4"
                    />
                </video> */}

                <img
                    src={getAssetUrl("assets/image/Group.png")}
                    alt="Footer Image"
                    className="w-full h-full object-contain rounded-xl pointer-events-none"
                />
                {children}
            </div>
        </section>
    )
}