"use client";
/// <reference types="react" />
import React, { useEffect, useRef, JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { getAssetUrl } from "@/lib/assetUrl";

gsap.registerPlugin(ScrollTrigger);
interface InteractiveProps {
    isDarkMode?: boolean;
}

export default function Interactive({ isDarkMode }: InteractiveProps) {
    const router = useRouter();
    const sectionRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const videoRef1 = useRef<HTMLVideoElement | null>(null);
    const videoRef2 = useRef<HTMLVideoElement | null>(null);

    const handleMouseEnter = (video: HTMLVideoElement | null) => {
        if (video) {
            video.muted = false;
            video.volume = 1;

            video.play().catch(() => {
                console.log("Autoplay with sound blocked");
            });
        }
    };

    const handleMouseLeave = (video: HTMLVideoElement | null) => {
        if (video) {
            video.muted = true;
            video.volume = 0;
        }
    };


    useEffect(() => {
        if (!sectionRef.current || !previewRef.current || !headingRef.current) return;

        const mm = gsap.matchMedia();

        const headingFade = (
            start: string,
            end: string,
            scrub: number,
            toOpacity: number
        ) => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 1 },
                {
                    opacity: toOpacity,
                    ease: "none",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start,
                        end,
                        scrub,
                        invalidateOnRefresh: true,
                    },
                }
            );
        };

         const cloudDrift = (
            midX: string,
            frontX: string,
            midDur: number,
            frontDur: number
        ) => {
            gsap.to("#cloud-2", {
                x: midX,
                duration: midDur,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
            gsap.to("#cloud-3", {
                x: frontX,
                duration: frontDur,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        };

        // Small viewports: no pin (stable on iOS / short screens), light scrub scale
        mm.add("(max-width: 767px)", () => {
            gsap.fromTo(
                previewRef.current,
                { scale: 0.9, borderRadius: "16px" },
                {
                    scale: 1,
                    borderRadius: "12px",
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 88%",
                        end: "top 22%",
                        scrub: 0.85,
                        pin: false,
                        invalidateOnRefresh: true,
                    },
                }
            );
            headingFade("top 90%", "top 38%", 0.85, 0.45);
            cloudDrift("-12%", "14%", 30, 18);
        });

        // Tablet: pinned hero with less travel than desktop; scale from bottom so 768px pin + zoom feels stable
        mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
            gsap.fromTo(
                previewRef.current,
                {
                    scale: 0.52,
                    borderRadius: "22px",
                    transformOrigin: "50% 100%",
                    y: 64,
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
                        start: "top top",
                        end: "+=68%",
                        scrub: 1.45,
                        pin: ".pin-wrapper",
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );
            headingFade("top 82%", "top 12%", 1, 0.25);
            cloudDrift("-20%", "26%", 38, 22);
        });

        // Desktop and up: full pin + scale range
        mm.add("(min-width: 1024px)", () => {
            gsap.fromTo(
                previewRef.current,
                { scale: 0.3, borderRadius: "30px" },
                {
                    scale: 1,
                    borderRadius: "0px",
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=80%",
                        scrub: 1.5,
                        pin: ".pin-wrapper",
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );
            headingFade("top 80%", "top 10%", 1, 0.2);
            cloudDrift("-25%", "30%", 40, 20);
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
        <section
            ref={sectionRef}
            className="relative bg-zinc-950 text-white overflow-x-hidden"
        >
            {/* TOP video section */}
            <div className="pin-wrapper relative w-full flex justify-center py-5 md:py-10 lg:py-28 z-25">

                <div
                    ref={previewRef}
                    onMouseEnter={() => handleMouseEnter(videoRef1.current)}
                    onMouseLeave={() => handleMouseLeave(videoRef1.current)}

                    className="w-full max-w-350 aspect-video overflow-hidden rounded-xl md:rounded-none will-change-transform px-4 md:px-0 cursor-pointer"
                    style={{ transformOrigin: "center center" }}
                >
                    {/* @ts-ignore - JSX video element is correctly supported */}
                    <video
                        ref={videoRef1}
                        src={getAssetUrl("assets/Video/04.mp4")}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-contain md:object-cover rounded-xl md:rounded-xl"
                    />
                </div>
            </div>

            {/* CONTENT section */}
            <div className="relative z-20 max-w-350 mx-auto px-5 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
                <h1
                    ref={headingRef}
                    className="text-[1.5rem] md:text-[2.5rem] lg:text-[clamp(2rem,8vw,4.2rem)]  leading-tight font-light mb-14"
                    style={{ opacity: 0.5 }}
                >
                    {/* @ts-ignore - JSX span element is correctly supported */}
                    Launch your   <span className="font-extrabold">
                        Interactive 3D Website
                        {/* @ts-ignore - JSX span closing element */}
                    </span> with Stunning Visuals
                </h1>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                        {/* BACK CLOUD (slow + big) */}
                        {/* <img
                            src={getAssetUrl("assets/image/cloud.png")}
                            className="absolute top-10 left-0 w-[180%] opacity-20"
                            id="cloud-1"
                        /> */}

                        {/* MID CLOUD */}
                        <img
                            src={getAssetUrl("assets/image/cloud.png")}
                            className="absolute top-50 left-[-20%]  opacity-45"
                            id="cloud-2"
                        />

                        {/* FRONT CLOUD (faster) */}
                        <img
                            src={getAssetUrl("assets/image/cloud.png")}
                            className="absolute top-50 left-[-10%]  opacity-60"
                            id="cloud-3"
                        />

                    </div>
                    <div className="flex flex-row sm:flex-row gap-4 sm:gap-6 items-center sm:items-center md:justify-end px-0 md:px-0 ">

                        {/* Book Now */}
                        <button
                            onClick={() => router.push("/contact")}
                            className="relative overflow-hidden w-full max-w-55 sm:w-auto px-6 py-3 border border-white/20 text-white group rounded-xl whitespace-nowrap cursor-pointer">
                            {/* @ts-ignore - JSX span element is correctly supported */}
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                            {/* @ts-ignore - JSX span element is correctly supported */}
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-black ">
                                Book Now
                                {/* @ts-ignore - JSX span closing element */}
                            </span>
                        </button>

                        {/* Get Started */}
                        <button
                            onClick={() => router.push("/services")}
                            className="rounded-xl relative overflow-hidden w-full max-w-55 sm:w-auto px-6 py-3 border border-white/20 text-black bg-white group whitespace-nowrap cursor-pointer">
                            {/* @ts-ignore - JSX span element is correctly supported */}
                            <span className="absolute inset-0 bg-zinc-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                            {/* @ts-ignore - JSX span element is correctly supported */}
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                                Get started
                                {/* @ts-ignore - JSX span closing element */}
                            </span>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <div
                            onMouseEnter={() => handleMouseEnter(videoRef2.current)}
                            onMouseLeave={() => handleMouseLeave(videoRef2.current)}
                            className="w-full max-w-70 sm:max-w-80 md:max-w-95 lg:max-w-105 h-120 sm:h-105 md:h-115 lg:h-130 cursor-pointer">
                            {/* @ts-ignore - JSX video element is correctly supported */}
                            <video
                                ref={videoRef2}
                                src={getAssetUrl("assets/Video/11.mp4")}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="none"
                                className="w-full h-full object-cover md:object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
