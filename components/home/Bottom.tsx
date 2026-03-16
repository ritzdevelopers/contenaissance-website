"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Bottom({ children }: { children?: React.ReactNode }) {

    const sectionRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const ctx = gsap.context(() => {

            const mm = gsap.matchMedia()

            /* ---------------- DESKTOP ---------------- */
            mm.add("(min-width: 768px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 30%",
                        end: "+=200%",
                        scrub: true,
                        pin: true
                    }
                })

                tl.fromTo(
                    videoRef.current,
                    { scale: 0.5 },
                    { scale: 1, ease: "none" }
                )

            })


            /* ---------------- MOBILE ---------------- */
            mm.add("(max-width: 767px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 40%",
                        end: "+=120%",   // shorter scroll distance
                        scrub: true,
                        pin: true
                    }
                })

                tl.fromTo(
                    videoRef.current,
                    { scale: 0.8 },   // bigger start so it doesn't look tiny
                    { scale: 1, ease: "none" }
                )

            })

        }, sectionRef)

        return () => ctx.revert()

    }, [])

    return (
        <section
            ref={sectionRef}
            className="bottom-section relative min-h-[80vh] md:h-[110vh] w-full overflow-hidden flex items-center justify-center z-0"
        >
            <div
                ref={videoRef}
                className="w-full h-full flex items-center justify-center"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    className="w-full h-full object-cover rounded-xl"
                >
                    <source
                        src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1773056667/end_jezeuc.mp4"
                        type="video/mp4"
                    />
                </video>

                {children}
            </div>
        </section>
    )
}