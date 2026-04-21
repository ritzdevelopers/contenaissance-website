"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function Loader() {
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const circleRef = useRef<SVGCircleElement | null>(null)

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let isMounted = true

        // 🔄 circle rotate
        gsap.to(circleRef.current, {
            rotate: 360,
            duration: 1.6,
            ease: "linear",
            repeat: -1,
            transformOrigin: "50% 50%",
        })

        const hideLoader = () => {
            if (!isMounted || !loaderRef.current) return

            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    loaderRef.current!.style.display = "none"
                },
            })
        }

        // 🎯 FAKE PROGRESS (2.5 sec total)
        let current = 0

        const interval = setInterval(() => {
            current += 2   // speed control (increase/decrease)

            if (current >= 100) {
                current = 100
                setProgress(current)

                clearInterval(interval)

                // 👇 100% dikhega, then hide
                setTimeout(() => {
                    hideLoader()
                }, 500)

            } else {
                setProgress(current)
            }

        }, 50) // speed (lower = faster)

        return () => {
            isMounted = false
            clearInterval(interval)
        }

    }, [])

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 bg-black z-9999 flex items-center justify-center px-4"
        >
            <div className="relative text-center w-full max-w-37.5 sm:max-w-42.5">

                {/* SVG */} 
                <svg className="w-full h-auto" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" className="stroke-gray-700" strokeWidth="2" fill="none" />
                    <circle
                        ref={circleRef}
                        cx="60"
                        cy="60"
                        r="50"
                        className="stroke-[#a47c02]"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="80 414"
                    />
                </svg>

                {/* Logo */}
                <img
                    src="/assets/image/logo.png"
                    alt="logo"
                    className="absolute top-20 left-1/2 w-20 -translate-x-1/2 -translate-y-1/2"
                />

                {/* Progress */}
                <div className="mt-6 text-[#a47c02]">

                    {/* % */}
                    <h2 className="text-xl font-semibold">
                        {progress}%
                    </h2>

                    {/* bar */}
                    <div className="w-full h-1 bg-gray-700 mt-3 rounded overflow-hidden">
                        <div
                            className="h-full bg-[#a47c02] transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}