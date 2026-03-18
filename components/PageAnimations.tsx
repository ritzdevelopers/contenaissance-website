// "use client"

// import { useEffect } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger)

// export default function PageAnimations() {

//     useEffect(() => {

//         const ctx = gsap.context(() => {

//             const butterfly = document.querySelector(".butterfly")
//             const bird = document.querySelector(".butterfly img")

//             let prevX = 0

//             const rotateBird = gsap.quickTo(bird, "scaleX", {
//                 duration: 0.6,
//                 ease: "power2.out"
//             })
//             const rotateAngle = gsap.quickTo(butterfly, "rotation", {
//                 duration: 0.6,
//                 ease: "power2.out"
//             })
//             gsap.set(".butterfly", { autoAlpha: 0 })
//             gsap.set(bird, { scaleX: 1 })

//             if (window.innerWidth <= 767) {
//                 gsap.set(".contact-section", { y: "100vh" })
//             }

//             const mm = gsap.matchMedia()

//             /* ---------------- DESKTOP ANIMATION ---------------- */
//             mm.add("(min-width: 768px)", () => {

//                 const tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: ".page-wrapper",
//                         start: "top top",
//                         end: "bottom bottom",
//                         scrub: 1,
//                     },

//                     onUpdate: () => {

//                         const currentX = Number(gsap.getProperty(butterfly, "x")) || 0
//                         const delta = currentX - prevX
//                         // if (currentX > prevX) {
//                         //     rotateBird(-1)
//                         // }
//                         // else if (currentX < prevX) {
//                         //     rotateBird(1)
//                         // }
//                         if (delta > 0) {
//                             rotateBird(-1)
//                         } else if (delta < 0) {
//                             rotateBird(1)
//                         }

//                         // Smooth tilt based on speed
//                         const tilt = gsap.utils.clamp(-30, 30, delta * 0.2)
//                         rotateAngle(tilt)
//                         prevX = currentX
//                     }
//                 })

//                 tl.to(".butterfly", { autoAlpha: 1, duration: 0.01 })

//                     // center → right top
//                     .to(".butterfly", {
//                         x: 1000,
//                         y: -400,
//                         duration: 0.3,
//                         ease: "none"
//                     })

//                     // right → left
//                     .to(".butterfly", {
//                         x: -1600,
//                         y: 100,
//                         duration: 1,
//                         ease: "none"
//                     })

//                     // left → right
//                     .to(".butterfly", {
//                         x: 1000,
//                         y: 200,
//                         duration: 1,
//                         ease: "none"
//                     })

//                     // services section movement
//                     .to(".butterfly", {
//                         y: 600,
//                         duration: 1,
//                         ease: "none"
//                     })

//                     // contact section movement
//                     .to(".butterfly", {
//                         x: 1000,
//                         y: 400,
//                         duration: 0.6,
//                         ease: "none"
//                     })

//                     .to(".butterfly", {
//                         x: 0,
//                         y: -110,
//                         duration: 1,
//                         ease: "none"
//                     })
//             })


//             /* ---------------- MOBILE ANIMATION ---------------- */
//             mm.add("(max-width: 767px)", () => {

//                 const tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: ".page-wrapper",
//                         start: "top top",
//                         end: "bottom bottom",
//                         scrub: 1,
//                     },

//                     onUpdate: () => {

//                         const currentX = Number(gsap.getProperty(butterfly, "x")) || 0

//                         if (currentX > prevX) {
//                             rotateBird(-1)
//                         }
//                         else if (currentX < prevX) {
//                             rotateBird(1)
//                         }

//                         prevX = currentX
//                     }
//                 })

//                 tl.to(".butterfly", { autoAlpha: 1, duration: 0.01, scale: 2 })

//                     // smaller movements for mobile
//                     .to(".butterfly", {
//                         x: 180,
//                         y: -360,
//                         duration: 0.6,
//                         ease: "none"
//                     })

//                     .to(".butterfly", {
//                         x: -150,
//                         y: 80,
//                         duration: 1,
//                         ease: "none"
//                     })

//                     .to(".butterfly", {
//                         x: 300,
//                         y: -100,
//                         duration: 1,
//                         ease: "none"
//                     })

//                     .to(".butterfly", {
//                         y: 300,
//                         duration: 1,
//                         ease: "none"
//                     })

//                     .to(".butterfly", {
//                         // x: 620,
//                         x: 350,
//                         y: 0,
//                         duration: 0.6,
//                         ease: "none"
//                     })

//                     .to(".butterfly", {
//                         x: 0,
//                         y: -90,
//                         duration: 1,
//                         ease: "none"
//                     })
//             })


//             /* ---------------- CONTACT SECTION ANIMATION ---------------- */

//             // gsap.fromTo(
//             //     ".contact-section",
//             //     {
//             //         y: "120vh"
//             //     },
//             //     {
//             //         y: "0vh",
//             //         ease: "none",
//             //         scrollTrigger: {
//             //             trigger: ".bottom-section",
//             //             start: "top top",
//             //             end: "bottom bottom",
//             //             scrub: 2
//             //         }
//             //     }
//             // )

//             // gsap.to(".butterfly", {
//             //     zIndex: 0,
//             //     scrollTrigger: {
//             //         trigger: ".bottom-section",
//             //         start: "top top",
//             //         end: "bottom bottom",
//             //         scrub: true
//             //     }
//             // })

//             mm.add("(min-width: 768px)", () => {
//                 gsap.fromTo(
//                     ".contact-section",
//                     { y: "120vh" },
//                     {
//                         y: "0vh",
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: ".bottom-section",
//                             start: "top top",
//                             end: "bottom bottom",
//                             scrub: 2,
//                         },
//                     }
//                 );

//                 gsap.to(".butterfly", {
//                     zIndex: 0,
//                     scrollTrigger: {
//                         trigger: ".bottom-section",
//                         start: "top top",
//                         end: "bottom bottom",
//                         scrub: true,
//                     },
//                 });
//             });

//             /* ── MOBILE ── */
//             mm.add("(max-width: 767px)", () => {

//                 gsap.fromTo(
//                     ".contact-section",
//                     { y: "60vh" },          // start just below the viewport
//                     {
//                         y: "0vh",
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: ".bottom-section",
//                             start: "top top",        // once the section is pinned
//                             end: "+=200%",    // when the pin releases
//                             scrub: 0.5,
//                             invalidateOnRefresh: true,
//                         },
//                     }
//                 );

//                 gsap.to(".butterfly", {
//                     zIndex: 0,
//                     scrollTrigger: {
//                         trigger: ".bottom-section",
//                         start: "top top",
//                         end: "+=200%",
//                         scrub: true,
//                     },
//                 });
//             });
//         });

//         return () => ctx.revert()

//     }, [])

//     return null
// }


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
                duration: 0.6,
                ease: "power2.out"
            })
            const rotateAngle = gsap.quickTo(butterfly, "rotation", {
                duration: 0.6,
                ease: "power2.out"
            })

            gsap.set(".butterfly", { autoAlpha: 0 })
            gsap.set(bird, { scaleX: 1 })

            if (window.innerWidth <= 767) {
                gsap.set(".contact-section", { y: "100vh" })
            }

            // ── Ticker: RAF pe chalta hai (max 60fps)
            // onUpdate scroll events pe chalta tha — mobile pe 100+ events/sec = jitter
            // Ticker scroll events se independent hai — smooth guaranteed
            const onTick = () => {
                if (!butterfly) return
                const currentX = Number(gsap.getProperty(butterfly, "x")) || 0
                const delta = currentX - prevX

                if (Math.abs(delta) > 0.1) {
                    if (delta > 0) rotateBird(-1)
                    else if (delta < 0) rotateBird(1)

                    // Desktop tilt — mobile pe rotateAngle call nahi hoga (mm ke bahar hai)
                    const tilt = gsap.utils.clamp(-30, 30, delta * 0.2)
                    rotateAngle(tilt)
                }

                prevX = currentX
            }

            // Ticker add — butterfly visible hone pe
            gsap.ticker.add(onTick)

            const mm = gsap.matchMedia()

            /* ---------------- DESKTOP ANIMATION ---------------- */
            mm.add("(min-width: 768px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        // onUpdate HATAYA — ticker handle kar raha hai
                    },
                })

                tl.to(".butterfly", { autoAlpha: 1, duration: 0.01 })
                    .to(".butterfly", { x: 1000, y: -400, duration: 0.3, ease: "none" })
                    .to(".butterfly", { x: -1600, y: 100, duration: 1, ease: "none" })
                    .to(".butterfly", { x: 1000, y: 200, duration: 1, ease: "none" })
                    .to(".butterfly", { y: 600, duration: 1, ease: "none" })
                    .to(".butterfly", { x: 1000, y: 400, duration: 0.6, ease: "none" })
                    .to(".butterfly", { x: 0, y: -110, duration: 1, ease: "none" })
            })

            /* ---------------- MOBILE ANIMATION ---------------- */
            mm.add("(max-width: 767px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        // onUpdate HATAYA — ticker handle kar raha hai
                    },
                })

                tl.to(".butterfly", { autoAlpha: 1, duration: 0.01, scale: 2 })
                    .to(".butterfly", { x: 180, y: -360, duration: 0.6, ease: "none" })
                    .to(".butterfly", { x: -150, y: 80, duration: 1, ease: "none" })
                    .to(".butterfly", { x: 300, y: -100, duration: 1, ease: "none" })
                    .to(".butterfly", { y: 300, duration: 1, ease: "none" })
                    .to(".butterfly", { x: 350, y: 0, duration: 0.6, ease: "none" })
                    .to(".butterfly", { x: 0, y: -90, duration: 1, ease: "none" })
            })

            /* ---------------- CONTACT SECTION ANIMATION ---------------- */

            mm.add("(min-width: 768px)", () => {
                gsap.fromTo(
                    ".contact-section",
                    { y: "120vh" },
                    {
                        y: "0vh",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".bottom-section",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 2,
                        },
                    }
                )

                gsap.to(".butterfly", {
                    zIndex: 0,
                    scrollTrigger: {
                        trigger: ".bottom-section",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                })
            })

            /* ── MOBILE ── */
            mm.add("(max-width: 767px)", () => {

                gsap.fromTo(
                    ".contact-section",
                    { y: "60vh" },
                    {
                        y: "0vh",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".bottom-section",
                            start: "top top",
                            end: "+=200%",
                            scrub: 0.5,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.to(".butterfly", {
                    zIndex: 0,
                    scrollTrigger: {
                        trigger: ".bottom-section",
                        start: "top top",
                        end: "+=200%",
                        scrub: true,
                    },
                })
            })

        })

        return () => {
            ctx.revert()
            gsap.ticker.remove(() => { }) // ctx.revert() ticker bhi clean karega
        }

    }, [])

    return null
}