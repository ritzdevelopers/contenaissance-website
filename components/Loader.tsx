"use client"
/// <reference types="react" />
import { useEffect, useRef, JSX } from "react"
import gsap from "gsap"

export default function Loader() {
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const circleRef = useRef<SVGCircleElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // start instantly
            gsap.to(circleRef.current, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.out",
            })

            gsap.to(".progress-ring", {
                rotate: 360,
                duration: 2,
                repeat: -1,
                ease: "linear",
                transformOrigin: "50% 50%",
            })

            gsap.from(".loader-text", {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.3,
                ease: "power2.out",
            })

            // hide AFTER loading feel (not actual load)
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                delay: 2.2,
                ease: "power2.out",
                onComplete: () => {
                    if (loaderRef.current) {
                        loaderRef.current.style.display = "none"
                    }
                },
            })

        }, loaderRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 bg-black z-9999 flex items-center justify-center px-4"
        >
            <div className="relative text-center w-full max-w-37.5 sm:max-w-42.5">

                {/* SVG Loader */}
                <svg
                    className="progress-ring w-full h-auto"
                    viewBox="0 0 120 120"
                >
                    {/* background circle */}
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="stroke-gray-700"
                        strokeWidth="2"
                        fill="none"
                    />

                    {/* animated circle */}
                    <circle
                        ref={circleRef}
                        cx="60"
                        cy="60"
                        r="50"
                        className="ring-progress stroke-[#a47c02]"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="314"
                        strokeDashoffset="314"
                    />
                </svg>

                {/* Logo */}
                <img
                    src="/assets/image/logo.png"
                    alt="logo"
                    className="absolute top-20 md:top-22 left-1/2 
                               w-15 sm:w-20 md:w-25 
                               -translate-x-1/2 -translate-y-1/2"
                />

                {/* Text */}
                <div className="loader-text mt-4 sm:mt-6 text-[#a47c02] text-center -translate-x-3.75 md:-translate-x-10">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-left">
                        Contenaissance.com
                    </h2>
                </div>

            </div>
        </div>
    )
}