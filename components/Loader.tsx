"use client"
/// <reference types="react" />
import { useEffect, useRef, JSX } from "react"
import gsap from "gsap"
import { getAssetUrl } from "@/lib/assetUrl"

export default function Loader() {
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const circleRef = useRef<SVGCircleElement | null>(null)

    useEffect(() => {
        let isMounted = true
        let circleTween: gsap.core.Tween | null = null
        let ringRotateTween: gsap.core.Tween | null = null

        const ctx = gsap.context(() => {

            // Stroke keeps animating until page is ready (killed in hideLoader)
            circleTween = gsap.to(circleRef.current, {
                strokeDashoffset: 0,
                duration: 1.25,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
            })

            ringRotateTween = gsap.to(".progress-ring", {
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

        }, loaderRef)

        const hideLoader = () => {
            if (!isMounted || !loaderRef.current) return

            circleTween?.kill()
            ringRotateTween?.kill()

            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    if (loaderRef.current) {
                        loaderRef.current.style.display = "none"
                    }
                },
            })
        }

        const waitForMediaToLoad = () => {
            const images = Array.from(document.querySelectorAll("img"))
            const videos = Array.from(document.querySelectorAll("video"))
            const pendingPromises: Promise<void>[] = []

            images.forEach((img) => {
                if (img.complete) return

                pendingPromises.push(
                    new Promise((resolve) => {
                        const onLoadOrError = () => {
                            img.removeEventListener("load", onLoadOrError)
                            img.removeEventListener("error", onLoadOrError)
                            resolve()
                        }

                        img.addEventListener("load", onLoadOrError, { once: true })
                        img.addEventListener("error", onLoadOrError, { once: true })
                    })
                )
            })

            videos.forEach((video) => {
                if (video.readyState >= 3 || video.ended) return

                pendingPromises.push(
                    new Promise((resolve) => {
                        const onReadyOrError = () => {
                            video.removeEventListener("loadeddata", onReadyOrError)
                            video.removeEventListener("canplaythrough", onReadyOrError)
                            video.removeEventListener("error", onReadyOrError)
                            resolve()
                        }

                        video.addEventListener("loadeddata", onReadyOrError, { once: true })
                        video.addEventListener("canplaythrough", onReadyOrError, { once: true })
                        video.addEventListener("error", onReadyOrError, { once: true })
                    })
                )
            })

            if (!pendingPromises.length) {
                hideLoader()
                return
            }

            Promise.all(pendingPromises).then(hideLoader)
        }

        const onWindowLoaded = () => {
            waitForMediaToLoad()
        }

        if (document.readyState === "complete") {
            onWindowLoaded()
        } else {
            window.addEventListener("load", onWindowLoaded, { once: true })
        }

        return () => {
            isMounted = false
            window.removeEventListener("load", onWindowLoaded)
            ctx.revert()
        }
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