"use client"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroll() {

    useEffect(() => {

        const lenis = new Lenis()
        let rafId: number

        function raf(time: number) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        // ✅ Cleanup — yeh pehle nahi tha, isliye scroll stuck hota tha
        return () => {
            lenis.destroy()
            cancelAnimationFrame(rafId)
        }

    }, [])

    return null
}