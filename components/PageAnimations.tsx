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
            gsap.set(bird, { scaleX: 1.10 })

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
                const butterflyHoverScale = 1.40;

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

                tl.to(bird, { scaleX: 1.10, duration: 0.01 }, "<");

                tl.to(".butterfly", {
                    x: 120,
                    y: window.innerHeight - 580,
                    scale: 1,
                    duration: 3.5,
                    ease: "power2.out"
                });
            });

            /* ---------------- MOBILE ANIMATION ---------------- */
            // Same timeline structure as desktop; horizontal amplitude scales with viewport.
            mm.add("(max-width: 767px)", () => {
                let timelineDirection = 1;
                let lastTime = 0;

                const w = window.innerWidth;
                const h = window.innerHeight;
                const stepY = 150;
                const stepX = 800 * (w / 768);
                const butterflyHoverScale = 1.30;
                const finalX = Math.min(120, w * 0.32);
                const finalY = h - Math.min(650, h * 0.72);

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

                tl.set(".butterfly", {
                    x: 0,
                    y: -h * 0.15,
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

                    if (i === 6) {
                        tl.addLabel("step6Start");

                        tl.add(() => {
                            if (timelineDirection === 1) {
                                setTimeout(() => {
                                    bird && (bird.src = "/assets/image/footer-butterfly.gif");
                                }, 800);
                            }
                        }, "step6Start+=0.5");

                        tl.addLabel("step6End", `+=${pauseDuration}`);
                    }

                    if (i === 7) {
                        tl.addLabel("step7Start");

                        tl.add(() => {
                            if (timelineDirection === -1) {
                                bird && (bird.src = "/assets/image/new1.gif");
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
                    x: finalX,
                    y: finalY,
                    scale: 1,
                    duration: 3.5,
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