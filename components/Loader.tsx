"use client"
/// <reference types="react" />

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function Loader() {
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const circleRef = useRef<SVGCircleElement | null>(null)

    const [progress, setProgress] = useState(0)
    const progressRef = useRef(0)

    useEffect(() => {
        let isMounted = true

        const ctx = gsap.context(() => {

            // 🔄 circle rotate
            gsap.to(circleRef.current, {
                rotate: 360,
                duration: 1.6,
                ease: "linear",
                repeat: -1,
                transformOrigin: "50% 50%",
            })

            // ✨ text animation
            gsap.from(".loader-text", {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.3,
                ease: "power2.out",
            })

        }, loaderRef)

        // 🎯 smooth progress
        const animateProgress = (target: number, onComplete?: () => void) => {
            gsap.to(progressRef, {
                current: target,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true,
                onUpdate: () => {
                    setProgress(Math.round(progressRef.current))
                },
                onComplete
            })
        }

        progressRef.current = 0

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

        // ⚡ fake progress till 90
        const interval = setInterval(() => {
            if (progressRef.current < 90) {
                animateProgress(progressRef.current + 1)
            }
        }, 200)

        // 📦 asset loader (FIXED)
        const waitForSpecificAssets = () => {
            const assets = [
                "/assets/image/new1.gif",
                "/assets/image/footer-butterfly.gif"
            ]

            let loaded = 0
            const total = assets.length

            const update = () => {
                loaded++

                const real = (loaded / total) * 100
                const target = Math.min(real, 90)

                animateProgress(target)

                // ✅ all assets loaded
                if (loaded === total) {

                    clearInterval(interval)
                    gsap.killTweensOf(progressRef)

                    animateProgress(100, () => {
                        hideLoader()
                    })
                }
            }

            assets.forEach((src) => {
                const img = new Image()
                img.src = src

                let called = false
                const safeUpdate = () => {
                    if (called) return
                    called = true
                    update()
                }

                // ✅ FIX: handle cached images
                if (img.complete) {
                    safeUpdate()
                } else {
                    img.onload = safeUpdate
                    img.onerror = safeUpdate
                }
            })
        }

        const onLoad = () => {
            waitForSpecificAssets()
        }

        if (document.readyState === "complete") {
            onLoad()
        } else {
            window.addEventListener("load", onLoad, { once: true })
        }

        return () => {
            isMounted = false
            clearInterval(interval)
            window.removeEventListener("load", onLoad)
            ctx.revert()
        }

    }, [])

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 bg-black z-9999 flex items-center justify-center px-4"
        >
            <div className="relative text-center w-full max-w-37.5 sm:max-w-42.5">

                {/* 🔵 SVG Loader */}
                <svg className="w-full h-auto" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="stroke-gray-700"
                        strokeWidth="2"
                        fill="none"
                    />

                    <circle
                        ref={circleRef}
                        cx="60"
                        cy="60"
                        r="50"
                        className="stroke-[#a47c02]"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="80 414"
                    />
                </svg>

                {/* 🧿 Logo */}
                <img
                    src="/assets/image/logo.png"
                    alt="logo"
                    className="absolute top-20 md:top-22 left-1/2 
                               w-15 sm:w-20 md:w-25 
                               -translate-x-1/2 -translate-y-1/2"
                />

                {/* 📊 Progress UI */}
                <div className="loader-text mt-6 text-[#a47c02]">

                    {/* % */}
                    <h2 className="text-xl md:text-2xl font-semibold">
                        {progress}%
                    </h2>

                    {/* bar */}
                    <div className="w-full h-1 bg-gray-700 mt-3 rounded overflow-hidden">
                        <div
                            className="h-full bg-[#a47c02] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}