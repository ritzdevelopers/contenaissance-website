"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function StorySections() {

    useEffect(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        })

        tl.to(".butterfly", { x: 300, y: 200 })
        tl.to(".butterfly", { x: 700, y: 400 })
        tl.to(".butterfly", { x: 200, y: 600 })

    }, [])

    return (

        <>
            <section className="h-screen bg-neutral-900"></section>
            {/* <section className="h-screen bg-neutral-800"></section>
            <section className="h-screen bg-neutral-700"></section> */}
        </>

    )

}