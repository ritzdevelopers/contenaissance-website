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

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PageAnimations() {

    useEffect(() => {

        const ctx = gsap.context(() => {

            const butterfly = document.querySelector(".butterfly")
            const bird = document.querySelector<HTMLImageElement>(".butterfly img")

            gsap.set(".butterfly", { autoAlpha: 1, duration: 0.01 })
            gsap.set(bird, { scaleX: 1 })

            const mm = gsap.matchMedia()

            /* ---------------- DESKTOP ANIMATION ---------------- */
            mm.add("(min-width: 768px)", () => {
                let timelineDirection = 1;
                let lastTime = 0;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                    onUpdate: function () {
                        const currentTime = this.time();
                        timelineDirection = currentTime > lastTime ? 1 : -1;
                        lastTime = currentTime;
                    }
                });

                const stepY = 150;
                const stepX = 800;
                const butterflyHoverScale = 1.30;

                tl.set(".butterfly", {
                    x: 0,
                    y: -window.innerHeight * 0.15,
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
                            duration: 3.0,
                            ease: "linear"
                        });
                    } else {
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            y: stepY,
                            duration: 15.5,
                            ease: "linear"
                        });
                    }

                    const pauseDuration =
                        i === 0 ? 0.1 :
                            i < 4 ? 1.0 :
                                i === 4 ? 1.5 :
                                    i === 5 ? 2.9 :
                                        i === 6 ? 3.0 :
                                            1.0;

                    tl.to(".butterfly", {
                        y: `-=${400}`,
                        duration: pauseDuration,
                        ease: "none",
                    });

                    //--------------butterfly change on step 6 and 7 -----------
                    if (i === 6) {
                        tl.addLabel("step6Start");

                        // Forward - on step 6  with image change
                        tl.add(() => {
                            if (timelineDirection === 1) {
                                setTimeout(() => {
                                    bird && (bird.src = "/assets/image/footer-butterfly.gif");
                                    console.log("🎯 Forward Step 6: footer-butterfly.gif (delayed)");
                                }, 800);
                            }
                        }, "step6Start+=0.5");

                        tl.addLabel("step6End", `+=${pauseDuration}`);
                    }

                    // Step 7  reverse image change
                    if (i === 7) {
                        tl.addLabel("step7Start");

                        // Reverse - step 7  image change
                        tl.add(() => {
                            if (timelineDirection === -1) {
                                bird && (bird.src = "/assets/image/new1.gif");
                                console.log("🎯 Reverse Step 7: new1.gif (immediate)");
                            }
                        }, "step7Start");
                    }

                    if (i === 0) {
                        tl.to(".butterfly", {
                            scale: butterflyHoverScale,
                            duration: 1,
                            ease: "power2.out",
                        });
                    }

                    direction *= -1;
                }

                tl.to(bird, { scaleX: 1, duration: 0.01 }, "<");

                tl.to(".butterfly", {
                    x: 120,
                    y: window.innerHeight - 650,
                    scale: 1,
                    duration: 3.5,
                    ease: "power2.out"
                });
            });

            /* ---------------- MOBILE ANIMATION ---------------- */
            // ─── Mobile (<768px) — scaled-down version ────────────────────────────────
            mm.add("(max-width: 767px)", () => {
                let timelineDirection = 1;
                let lastTime = 0;

                // On mobile: narrower swing, smaller vertical steps, fewer loops
                const stepY = 150;
                const stepX = window.innerWidth * 0.70; // ~38vw instead of fixed 800px
                const butterflyHoverScale = 1.5;        // subtler scale-up on small screens
                const STEPS = 6;                          // fewer zigzag passes (was 8)

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".page-wrapper",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                    },
                    onUpdate: function () {
                        const currentTime = this.time();
                        timelineDirection = currentTime > lastTime ? 1 : -1;
                        lastTime = currentTime;
                    }
                });

                tl.set(".butterfly", {
                    x: 0,
                    y: -window.innerHeight * 0.10, // slightly less offset on mobile
                    autoAlpha: 1,
                    scale: 1.0                      // start smaller on mobile
                });

                let direction = -1;

                for (let i = 0; i < STEPS; i++) {

                    tl.to(bird, {
                        scaleX: direction === -1 ? 1 : -1,
                        duration: 0.01
                    }, "<");

                    // Horizontal sweep — shorter duration for quicker mobile scroll feel
                    if (i === 0) {
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            duration: 4.0,
                            ease: "linear"
                        });
                    } else {
                        tl.to(".butterfly", {
                            x: direction * stepX,
                            y: stepY,
                            duration: 10.0, // was 15.5 — proportionally shorter
                            ease: "linear"
                        });
                    }

                    // Pause durations — shortened to match fewer steps
                    const pauseDuration =
                        i === 0 ? 3.0 :
                            i < 3 ? 3.0 :
                                i === 3 ? 3.5 :
                                    3.0;

                    tl.to(".butterfly", {
                        y: `-=${350}`,         // was 400 — less vertical travel on mobile
                        duration: pauseDuration,
                        ease: "none",
                    });

                    // ── Image swap on step 3 (was step 6 on desktop) ──────────────────
                    if (i === 3) {
                        tl.addLabel("mobileStep3Start");
                        tl.add(() => {
                            if (timelineDirection === 1) {
                                setTimeout(() => {
                                    bird && (bird.src = "/assets/image/new.gif");
                                }, 800);
                            }
                        }, "mobileStep3Start+=0.5");
                    }

                    // ── Reverse image swap on last step ───────────────────────────────
                    if (i === STEPS - 1) {
                        tl.addLabel("mobileLastStep");
                        tl.add(() => {
                            if (timelineDirection === -1) {
                                bird && (bird.src = "/assets/image/new1.gif");
                            }
                        }, "mobileLastStep");
                    }

                    if (i === 0) {
                        tl.to(".butterfly", {
                            scale: butterflyHoverScale,
                            duration: 1,
                            ease: "power2.out",
                        });
                    }
                    direction *= -1;
                }

                tl.to(bird, { scaleX: 1, duration: 0.01 }, "<");

                // Final landing — land closer to center on narrow screens
                tl.to(".butterfly", {
                    x: 0,                              // center instead of x:120
                    y: window.innerHeight - 400,       // slightly higher landing point
                    scale: 1.0,
                    duration: 2.5,
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

    }, [])

    return null
}