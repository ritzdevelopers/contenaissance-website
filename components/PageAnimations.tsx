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
// -----docfile - final-animation.txt

"use client"

import { useEffect, useRef, useState, } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PageAnimations() {
    const [scrollCount, setScrollY] = useState(0);
    useEffect(() => {

        const ctx = gsap.context(() => {

            const butterfly = document.querySelector(".butterfly")
            const bird = document.querySelector(".butterfly img")

            gsap.set(".butterfly", { autoAlpha: 1, duration: 0.01 })
            gsap.set(bird, { scaleX: 1 })

            const mm = gsap.matchMedia()

            /* ---------------- DESKTOP ANIMATION ---------------- */
            mm.add("(min-width: 768px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1, // ⬅️ slower scroll sync
                    },
                });

                const stepY = 150;
                const stepX = 800;
                const butterflyHoverScale = 1.30;

                tl.set(".butterfly", {
                    x: 0,
                    y: -window.innerHeight * 0.15, // ⬅️ 15% upper
                    autoAlpha: 1,
                    scale: 1
                });
                let direction = -1;

                for (let i = 0; i < 8; i++) {

                    tl.to(bird, {
                        scaleX: direction === -1 ? 1 : -1,
                        duration: 0.01
                    }, "<");

                    if (i === 0) {
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            duration: 6.0, // ⬅️ slower move
                            ease: "linear"
                        });
                    } else {
                        ``
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            y: stepY,
                            duration: 15.5, // ⬅️ slower move
                            ease: "linear"
                        });
                    }

                    // ⬇️ smoother pauses
                    const pauseDuration =
                        i < 4 ? 1.0 :
                            i === 4 ? 1.5 :
                                i === 5 ? 2.9 :
                                    i === 6 ? 3.0 :
                                        3.5;

                    tl.to(".butterfly", {
                        y: `-=${500}`,
                        duration: pauseDuration,
                        ease: "none",
                        ...(i === 7 ? { scale: 1 } : {}),
                    });

                    if (i === 0) {
                        tl.to(".butterfly", {
                            scale: butterflyHoverScale,
                            duration: 1, // ⬅️ slower scale
                            ease: "power2.out",
                        });
                    }

                    direction *= -1;
                }

                tl.to(bird, { scaleX: 1, duration: 0.01 }, "<");
                tl.call(() => {
                    if (bird) {
                        (bird as HTMLImageElement).src = "/assets/image/new.gif"; // ⬅️ new butterfly
                    }
                });

                tl.to(".butterfly", {
                    x: 0,
                    y: window.innerHeight - 500,
                    scale: 1,
                    duration: 1.5, // ⬅️ smoother landing
                    ease: "power2.out"
                });

            });

            /* ---------------- MOBILE ANIMATION ---------------- */
            mm.add("(max-width: 767px)", () => {

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                    },
                });

                const stepY = 500;   // smaller vertical movement
                const stepX = 220;   // controlled horizontal (no overflow)
                const butterflyHoverScale = 1.25;

                tl.set(".butterfly", { x: 0, y: 0, autoAlpha: 1, scale: 1 });

                let direction = -1;

                for (let i = 0; i < 8; i++) {

                    // flip direction
                    tl.to(bird, {
                        scaleX: direction === -1 ? 1 : -1,
                        duration: 0.01
                    }, "<");

                    // zig-zag move (NO initial drop)
                    if (i === 0) {
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            duration: 2.0,
                            ease: "power2.out"
                        });
                    } else {
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            y: stepY,
                            duration: 1.2,
                            ease: "power2.inOut"
                        });
                    }

                    // hover (lighter for mobile); last pause returns scale to 1
                    const mobilePauseDuration =
                        i < 4 ? 1.5 :
                            i === 4 ? 2.5 :
                                i === 5 ? 3.8 :
                                    i === 6 ? 4.2 :
                                        5.0;

                    tl.to(".butterfly", {
                        y: `-=${200}`,
                        duration: mobilePauseDuration,
                        ease: "none",
                        ...(i === 7 ? { scale: 1 } : {}),
                    });

                    if (i === 0) {
                        tl.to(".butterfly", {
                            scale: butterflyHoverScale,
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    }

                    direction *= -1;
                }

                // final settle
                tl.to(bird, { scaleX: 1, duration: 0.01 }, "<");

                tl.to(".butterfly", {
                    x: 0,
                    y: window.innerHeight - 250,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });

            });

            /* ---------------- CONTACT SECTION ANIMATION (MOVED TO BOTTOM.TSX) ---------------- */

            mm.add("(min-width: 768px)", () => {

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
            gsap.ticker.remove(() => { })
        }

    }, []);



    const prevScrollRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            const prev = prevScrollRef.current;

            if (current > prev) {
                setScrollY((prev) => prev + 1); // scrolling down
            } else if (current < prev) {
                setScrollY((prev) => prev - 1); // scrolling up
            }

            prevScrollRef.current = current;

            console.log("COUNT:", scrollCount);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return null
}