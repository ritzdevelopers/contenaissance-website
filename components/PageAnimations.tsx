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

            const rotateBird = gsap.quickTo(bird, "scaleX", {
                duration: 1,
                ease: "power2.out"
            })
            const rotateAngle = gsap.quickTo(butterfly, "rotation", {
                duration: 1,
                ease: "power2.out"
            })
            gsap.set(".butterfly", { autoAlpha: 0 })
            gsap.set(bird, { scaleX: 1 })

            const mm = gsap.matchMedia()

            /* ---------------- DESKTOP ANIMATION ---------------- */
            mm.add("(min-width: 768px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },

                    onUpdate: () => {

                        const currentX = Number(gsap.getProperty(butterfly, "x")) || 0
                        const delta = currentX - prevX
                        // if (currentX > prevX) {
                        //     rotateBird(-1)
                        // }
                        // else if (currentX < prevX) {
                        //     rotateBird(1)
                        // }
                        if (delta > 0) {
                            rotateBird(-1)
                        } else if (delta < 0) {
                            rotateBird(1)
                        }

                        // Smooth tilt based on speed
                        const tilt = gsap.utils.clamp(-30, 30, delta * 0.2)
                        rotateAngle(tilt)
                        prevX = currentX
                    }
                })

                tl.to(".butterfly", { autoAlpha: 1, duration: 0.01 })

                    // center → right top
                    .to(".butterfly", {
                        x: 1000,
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
                        x: 1000,
                        y: 200,
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
                        x: 1000,
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
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },

                    onUpdate: () => {

                        const currentX = Number(gsap.getProperty(butterfly, "x")) || 0

                        if (currentX > prevX) {
                            rotateBird(-1)
                        }
                        else if (currentX < prevX) {
                            rotateBird(1)
                        }

                        prevX = currentX
                    }
                })

                tl.to(".butterfly", { autoAlpha: 1, duration: 0.01, scale: 2 })

                    // smaller movements for mobile
                    .to(".butterfly", {
                        x: 180,
                        y: -360,
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
                        x: 300,
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
                        // x: 620,
                        x: 150,
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