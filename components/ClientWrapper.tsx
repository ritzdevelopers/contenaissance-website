"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Loader from "@/components/Loader"
import AnimatedCursor from "@/components/AnimatedCursor"

const LOADER_SESSION_KEY = "contenaissance-loader-dismissed"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [pageLoaded, setPageLoaded] = useState(false)
    const [loaderDismissed, setLoaderDismissed] = useState(() => {
        if (typeof window === "undefined") return false
        return window.sessionStorage.getItem(LOADER_SESSION_KEY) === "1"
    })
    const contentRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const targetRef = useRef({ x: 0, y: 0 })
    const currentRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleLoad = () => setPageLoaded(true)

        if (loaderDismissed) {
            setPageLoaded(true)
            return
        }

        if (document.readyState === "complete") {
            setPageLoaded(true)
        } else {
            window.addEventListener("load", handleLoad)
        }

        return () => window.removeEventListener("load", handleLoad)
    }, [])

    useEffect(() => {
        if (!loaderDismissed) return
        window.sessionStorage.setItem(LOADER_SESSION_KEY, "1")
    }, [loaderDismissed])

    useEffect(() => {
        const el = contentRef.current
        if (!el) return
        gsap.set(el, { opacity: loaderDismissed ? 1 : 0 })
    }, [loaderDismissed])

    useEffect(() => {
        if (!loaderDismissed) {
            document.body.classList.add("overflow-hidden")
            return () => {
                document.body.classList.remove("overflow-hidden")
            }
        }

        document.body.classList.remove("overflow-hidden")
    }, [loaderDismissed])

    useEffect(() => {
        const STRENGTH = 18
        const EASE = 0.055
        const root = document.documentElement

        const applyVars = () => {
            const { x, y } = currentRef.current
            root.style.setProperty("--site-parallax-x", `${x}px`)
            root.style.setProperty("--site-parallax-y", `${y}px`)
        }

        const tick = () => {
            const c = currentRef.current
            const t = targetRef.current
            c.x += (t.x - c.x) * EASE
            c.y += (t.y - c.y) * EASE
            applyVars()

            if (Math.abs(t.x - c.x) > 0.04 || Math.abs(t.y - c.y) > 0.04) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                c.x = t.x
                c.y = t.y
                applyVars()
                rafRef.current = null
            }
        }

        const startLoop = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        const updateFromPoint = (clientX: number, clientY: number) => {
            const nx = (clientX / window.innerWidth - 0.5) * 2
            const ny = (clientY / window.innerHeight - 0.5) * 2
            targetRef.current.x = -nx * STRENGTH
            targetRef.current.y = -ny * STRENGTH
            startLoop()
        }

        const onMouseMove = (e: MouseEvent) => updateFromPoint(e.clientX, e.clientY)
        const onMouseLeave = () => {
            targetRef.current.x = 0
            targetRef.current.y = 0
            startLoop()
        }
        const onTouchMove = (e: TouchEvent) => {
            if (!e.touches.length) return
            const t = e.touches[0]
            updateFromPoint(t.clientX, t.clientY)
        }
        const onTouchEnd = () => {
            targetRef.current.x = 0
            targetRef.current.y = 0
            startLoop()
        }
        const onDeviceOrientation = (e: DeviceOrientationEvent) => {
            if (e.gamma == null || e.beta == null) return
            const nx = Math.max(-1, Math.min(1, e.gamma / 25))
            const ny = Math.max(-1, Math.min(1, (e.beta - 20) / 35))
            targetRef.current.x = -nx * STRENGTH
            targetRef.current.y = -ny * STRENGTH
            startLoop()
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mouseleave", onMouseLeave)
        window.addEventListener("touchmove", onTouchMove, { passive: true })
        window.addEventListener("touchend", onTouchEnd, { passive: true })
        window.addEventListener("deviceorientation", onDeviceOrientation)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mouseleave", onMouseLeave)
            window.removeEventListener("touchmove", onTouchMove)
            window.removeEventListener("touchend", onTouchEnd)
            window.removeEventListener("deviceorientation", onDeviceOrientation)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
            root.style.setProperty("--site-parallax-x", "0px")
            root.style.setProperty("--site-parallax-y", "0px")
        }
    }, [])

    const handleExitStart = useCallback(() => {
        const el = contentRef.current
        if (!el) return
        gsap.fromTo(
            el,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            }
        )
    }, [])

    return (
        <>
            <AnimatedCursor />
            {!loaderDismissed && (
                <Loader
                    pageLoaded={pageLoaded}
                    onExitStart={handleExitStart}
                    onComplete={() => setLoaderDismissed(true)}
                />
            )}
            <div ref={contentRef} className="min-h-0 opacity-0">
                {children}
            </div>
        </>
    )
}
