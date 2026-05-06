"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getAssetUrl } from "@/lib/assetUrl"

gsap.registerPlugin(ScrollTrigger)

export default function Bottom({ children }: { children?: React.ReactNode }) {

    const sectionRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {

        const ctx = gsap.context(() => {

            gsap.fromTo(imageRef.current,
                { y: 200, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1,
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()

    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] overflow-hidden flex items-end justify-center 
           "
        >
            {/*  Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-transparent z-0" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent z-0" />
            {/*  Foreground Image (slides from bottom) */}
            <div className="relative  w-full flex justify-center items-end">
                <img
                    ref={imageRef}
                    src={getAssetUrl("assets/image/footer.png")}
                    alt="Footer Image"
                    className="w-full object-contain"
                />
            </div>
            {children}
        </section>
    )
}