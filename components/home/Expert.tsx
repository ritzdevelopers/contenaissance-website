"use client";
/// <reference types="react" />
import { motion } from "framer-motion";
import { useLayoutEffect, useEffect, useRef, JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import { getAssetUrl } from "@/lib/assetUrl";
// import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ExpertSectionProps {
    isDarkMode?: boolean;
}

export default function Expert({ isDarkMode }: ExpertSectionProps) {
    const router = useRouter();

    const videoRef1 = useRef<HTMLVideoElement | null>(null);
    const videoRef2 = useRef<HTMLVideoElement | null>(null);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);

    const secondSectionRef = useRef<HTMLDivElement | null>(null);
    const leftRef = useRef<HTMLDivElement | null>(null);
    const rightRef = useRef<HTMLDivElement | null>(null);

    const handleMouseEnter = (video: HTMLVideoElement | null) => {
        if (video) {
            video.muted = false;
            video.volume = 1;
        }
    };

    const handleMouseLeave = (video: HTMLVideoElement | null) => {
        if (video) {
            video.muted = true;
            video.volume = 0;
        }
    };

    // const pathname = usePathname();

    useEffect(() => {
        if (!sectionRef.current || !previewRef.current) return;

        const mm = gsap.matchMedia();

        // Small screens: no pin (better on iOS / short viewports), subtler scale scrub
        mm.add("(max-width: 767px)", () => {
            gsap.fromTo(
                previewRef.current,
                {
                    scale: 0.88,
                    borderRadius: "16px",
                },
                {
                    scale: 1,
                    borderRadius: "12px",
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 88%",
                        end: "top 28%",
                        scrub: 0.85,
                        pin: false,
                        invalidateOnRefresh: true,
                    },
                }
            );

            if (!secondSectionRef.current || !leftRef.current || !rightRef.current)
                return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: secondSectionRef.current,
                    start: "top 82%",
                    toggleActions: "play reverse play reverse",
                    invalidateOnRefresh: true,
                },
            });

            tl.from(leftRef.current, {
                opacity: 0,
                y: 28,
                duration: 0.65,
                ease: "power3.out",
            }).from(
                rightRef.current,
                {
                    opacity: 0,
                    y: 28,
                    duration: 0.65,
                    ease: "power3.out",
                },
                "-=0.35"
            );
        });

        // Tablet: pinned scrub with a shorter travel than desktop
        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
            gsap.fromTo(
                previewRef.current,
                {
                    scale: 0.55,
                    borderRadius: "24px",
                    transformOrigin: "50% 100%",
                    y: 48,
                },
                {
                    scale: 1,
                    borderRadius: "0px",
                    y: 0,
                    transformOrigin: "50% 100%",
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 32%",
                        end: "+=65%",
                        scrub: 1.2,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            if (!secondSectionRef.current || !leftRef.current || !rightRef.current)
                return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: secondSectionRef.current,
                    start: "top 78%",
                    toggleActions: "play reverse play reverse",
                    invalidateOnRefresh: true,
                },
            });

            tl.from(leftRef.current, {
                opacity: 0,
                x: -56,
                duration: 0.75,
                ease: "power3.out",
            }).from(
                rightRef.current,
                {
                    opacity: 0,
                    x: 56,
                    duration: 0.75,
                    ease: "power3.out",
                },
                "-=0.38"
            );
        });

        // Large screens: full hero scale + pin
        mm.add("(min-width: 1024px)", () => {
            gsap.fromTo(
                previewRef.current,
                {
                    scale: 0.3,
                    borderRadius: "30px",
                },
                {
                    scale: 1,
                    borderRadius: "0px",
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 30%",
                        end: "+=80%",
                        scrub: 1.5,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            if (!secondSectionRef.current || !leftRef.current || !rightRef.current)
                return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: secondSectionRef.current,
                    start: "top 75%",
                    toggleActions: "play reverse play reverse",
                    invalidateOnRefresh: true,
                },
            });

            tl.from(leftRef.current, {
                opacity: 0,
                x: -80,
                duration: 0.8,
                ease: "power3.out",
            }).from(
                rightRef.current,
                {
                    opacity: 0,
                    x: 80,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.4"
            );
        });

        const onResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            mm.revert();
        };
    }, []);

    return (
        <div className="bg-zinc-950 overflow-x-hidden">
            {/* -----------First section----- */}
            <div
                ref={sectionRef}
                className="w-full flex justify-center mb-14 md:mb-10 px-4 md:px-10 z-23"
            >
                <div
                    ref={previewRef}
                    onMouseEnter={() => handleMouseEnter(videoRef1.current)}
                    onMouseLeave={() => handleMouseLeave(videoRef1.current)}
                    className="w-full max-w-full h-45 sm:h-60 md:h-auto rounded-2xl overflow-hidden  cursor-pointer "
                >   
                    <video
                        ref={videoRef1}
                        src={getAssetUrl("assets/Video/08.MP4")}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* --------------second section--------------- */}
            <motion.section
                className="relative text-white overflow-hidden"
                ref={secondSectionRef}
            >
                <div
                    className="
                    max-w-full mx-auto
                    px-4 sm:px-8 lg:px-16
                    py-5 sm:py-10 lg:pb-16
                    flex flex-col-reverse lg:flex-row
                    items-center justify-between
                    gap-12 lg:gap-5
                "
                >
                    <motion.div ref={leftRef} className="w-full lg:w-1/2 z-10">
                        <h1
                            className="text-center md:text-start text-[clamp(1.5rem,5vw,1rem)]
                            font-light leading-[1.1] tracking-tight
                            md:text-[clamp(2rem,5vw,2.5rem)]
                            mb-6
                        "
                        >
                            Get your <span className="font-bold">3D Website</span> with
                            <br />
                            <span className="opacity-80"> Our Expert Designers.</span>
                        </h1>
                        <p className="text-white/70 text-sm sm:text-base max-w-md mb-8">
                            We craft immersive, high-end 3D experiences that elevate your
                            brand beyond flat design.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => router.push('/contact')}
                                className="cursor-pointer
                                w-full sm:w-auto
                                px-6 py-3
                                text-sm sm:text-base
                                border border-white
                                rounded-xl
                                bg-transparent
                                hover:bg-white hover:text-black
                                transition-all duration-300
                            "
                            >
                                Book Now
                            </button>
                        </div>
                    </motion.div>

                    {/* Video section */}
                    <motion.div
                        ref={rightRef}
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center relative mt-1 lg:mt-0"
                    >
                        <div
                            onMouseEnter={() => handleMouseEnter(videoRef2.current)}
                            onMouseLeave={() => handleMouseLeave(videoRef2.current)}
                            className="w-full cursor-pointer"
                        >
                            <video
                                ref={videoRef2}
                                src={getAssetUrl("assets/Video/06.mp4")}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="none"
                                className="w-full h-full  rounded-2xl shadow-2xl  bg-black object-contain lg:object-contain"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}