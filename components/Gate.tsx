"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Gate() {

    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const ctx = gsap.context(() => {

            gsap.set(".door-left", { rotateY: -20})
            gsap.set(".door-right", { rotateY: 20 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".gate-top",
                    start: "top top",
                    end: "+=1000",
                    scrub: true
                }
            })

            // doors open here
            tl.to(".door-left", {
                rotateY: -105,
                ease: "power2.out"
            })

            tl.to(".door-right", {
                rotateY: 105,
                ease: "power2.out"
            }, "<")

        }, container)

        // BUTTERFLY animation 
        gsap.fromTo(
            ".butterfly",
            {
                scale: 0.2
            },
            {
                scale: 0.8, // increase size as desired
                scrollTrigger: {
                    trigger: ".gate-top",
                    start: "top top",
                    end: "+=1000",
                    scrub: true
                }
            }
        )

        return () => ctx.revert()

    }, [])

    return (

        <section
            ref={container}
            className="gate-top relative h-screen w-full flex items-center justify-center bg-neutral-900 overflow-hidden"
            style={{ perspective: "2000px" }}
        >

            <div className="absolute w-[500px] h-[500px] bg-pink-300/30 blur-[200px] rounded-full z-0" />

            <div className="relative flex w-full h-[90vh] px-5 z-10">

                {/* LEFT DOOR */}
                <div className="door-left relative w-1/2 h-full origin-left bg-white border border-gray-200 shadow-2xl">
                    <div className="absolute inset-8 border-4 border-gray-200 rounded-lg" />
                    <div className="absolute top-20 left-10 right-10 bottom-1/2 border-4 border-gray-200 rounded-lg" />
                    <div className="absolute bottom-20 left-10 right-10 top-1/2 border-4 border-gray-200 rounded-lg" />
                    <div className="absolute inset-0 shadow-inner" />
                </div>

                {/* RIGHT DOOR */}
                <div className="door-right relative w-1/2 h-full origin-right bg-white border border-gray-200 shadow-2xl">
                    <div className="absolute inset-8 border-4 border-gray-200 rounded-lg" />
                    <div className="absolute top-20 left-10 right-10 bottom-1/2 border-4 border-gray-200 rounded-lg" />
                    <div className="absolute bottom-20 left-10 right-10 top-1/2 border-4 border-gray-200 rounded-lg" />
                    <div className="absolute inset-0 shadow-inner" />
                </div>

            </div>

        </section>
    )
}