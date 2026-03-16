"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PageAnimations() {

    useEffect(() => {

        const ctx = gsap.context(() => {

            const butterfly = document.querySelector(".butterfly")
            const bird = document.querySelector(".butterfly img")

            let prevX = 0

            gsap.set(".butterfly", { autoAlpha: 0 })
            gsap.set(bird, { scaleX: 1 })

            const mm = gsap.matchMedia()

            /* ---------------- DESKTOP ANIMATION ---------------- */
            mm.add("(min-width: 768px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },

                    onUpdate: () => {

                        const currentX = Number(gsap.getProperty(butterfly, "x")) || 0

                        if (currentX > prevX) {
                            gsap.to(bird, { scaleX: -1, duration: 0.2 })
                        }
                        else if (currentX < prevX) {
                            gsap.to(bird, { scaleX: 1, duration: 0.2 })
                        }

                        prevX = currentX
                    }
                })

                tl.to(".butterfly", { autoAlpha: 1, duration: 0.01 })

                    // center → right top
                    .to(".butterfly", {
                        x: 800,
                        y: -400,
                        duration: 0.6,
                        ease: "none"
                    })

                    // right → left
                    .to(".butterfly", {
                        x: -600,
                        y: 100,
                        duration: 1,
                        ease: "none"
                    })

                    // left → right
                    .to(".butterfly", {
                        x: 800,
                        y: -200,
                        duration: 1,
                        ease: "none"
                    })

                    // services section movement
                    .to(".butterfly", {
                        y: 600,
                        duration: 1,
                        ease: "none"
                    })

                    // contact section movement
                    .to(".butterfly", {
                        x: 750,
                        y: 400,
                        duration: 0.6,
                        ease: "none"
                    })

                    .to(".butterfly", {
                        x: 0,
                        y: -110,
                        duration: 1,
                        ease: "none"
                    })
            })


            /* ---------------- MOBILE ANIMATION ---------------- */
            mm.add("(max-width: 767px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },

                    onUpdate: () => {

                        const currentX = Number(gsap.getProperty(butterfly, "x")) || 0

                        if (currentX > prevX) {
                            gsap.to(bird, { scaleX: -1, duration: 0.2 })
                        }
                        else if (currentX < prevX) {
                            gsap.to(bird, { scaleX: 1, duration: 0.2 })
                        }

                        prevX = currentX
                    }
                })

                tl.to(".butterfly", { autoAlpha: 1, duration: 0.01 ,scale:2})

                    // smaller movements for mobile
                    .to(".butterfly", {
                        x: 180,
                        y: -160,
                        duration: 0.6,
                        ease: "none"
                    })

                    .to(".butterfly", {
                        x: -150,
                        y: 80,
                        duration: 1,
                        ease: "none"
                    })

                    .to(".butterfly", {
                        x: 200,
                        y: -100,
                        duration: 1,
                        ease: "none"
                    })

                    .to(".butterfly", {
                        y: 300,
                        duration: 1,
                        ease: "none"
                    })

                    .to(".butterfly", {
                        x: 140,
                        y: 200,
                        duration: 0.6,
                        ease: "none"
                    })

                    .to(".butterfly", {
                        x: 0,
                        y: -60,
                        duration: 1,
                        ease: "none"
                    })
            })


            /* ---------------- CONTACT SECTION ANIMATION ---------------- */

            gsap.fromTo(
                ".contact-section",
                {
                    y: "120vh"
                },
                {
                    y: "0vh",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".bottom-section",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2
                    }
                }
            )

            gsap.to(".butterfly", {
                zIndex: 0,
                scrollTrigger: {
                    trigger: ".bottom-section",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            })

        })

        return () => ctx.revert()

    }, [])

    return null
}