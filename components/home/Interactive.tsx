"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
interface InteractiveProps {
    isDarkMode?: boolean;
}

export default function Interactive({ isDarkMode }: InteractiveProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !previewRef.current || !headingRef.current) return;

        const ctx = gsap.context(() => {
            // Preview animation
            gsap.fromTo(
                previewRef.current,
                {
                    scale: 0.30, //  smaller from start
                    borderRadius: "30px",
                },
                {
                    scale: 1,
                    borderRadius: "0px",
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=80%", //  more scroll distance
                        scrub: 1.5,     //  smoother interpolation
                        pin: ".pin-wrapper",
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Heading opacity animation (decrease on scroll)
            gsap.fromTo(
                headingRef.current,
                { opacity: 1 },
                {
                    opacity: 0.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        end: "top 10%",
                        scrub: 1,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const videoRef1 = useRef<HTMLVideoElement | null>(null);
    const videoRef2 = useRef<HTMLVideoElement | null>(null);
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
    return (
        <section
            ref={sectionRef}
            className="relative bg-zinc-950 text-white overflow-x-hidden"
        >
            {/* TOP video section */}
            <div className="pin-wrapper relative w-full flex justify-center py-12 md:py-20 lg:py-28 z-25">

                <div
                    ref={previewRef}
                    onMouseEnter={() => handleMouseEnter(videoRef1.current)}
                    onMouseLeave={() => handleMouseLeave(videoRef1.current)}

                    className="w-full max-w-[1400px] aspect-video overflow-hidden will-change-transform cursor-pointer" style={{ transformOrigin: "center center" }}
                >
                    <video
                        ref={videoRef1}
                        src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1772515416/service1_pg5wmy.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>

            {/* CONTENT section */}
            <div className="relative z-20 max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20 py-10 md:py-16">
                <h1
                    ref={headingRef}
                    className="text-[clamp(2rem,8vw,4.2rem)] leading-tight font-light mb-14"
                    style={{ opacity: 0.5 }}
                >
                    Launch your   <span className="font-extrabold">
                        Interactive 3D Website
                    </span> with Stunning Visuals
                </h1>

                <div

                    className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center md:justify-end px-10 md:px-0 ">

                        {/* Book Now */}
                        <button className="relative overflow-hidden w-full max-w-[220px] sm:w-auto px-6 py-3 border border-white/20 text-white group rounded-xl whitespace-nowrap">
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-black ">
                                Book Now
                            </span>
                        </button>

                        {/* Get Started */}
                        <button className="rounded-xl relative overflow-hidden w-full max-w-[220px] sm:w-auto px-6 py-3 border border-white/20 text-black bg-white group whitespace-nowrap">
                            <span className="absolute inset-0 bg-zinc-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                                Get started
                            </span>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <div
                            onMouseEnter={() => handleMouseEnter(videoRef2.current)}
                            onMouseLeave={() => handleMouseLeave(videoRef2.current)}
                            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] 
                            h-[280px] sm:h-[420px] md:h-[460px] lg:h-[520px] cursor-pointer">
                            <video
                                ref={videoRef2}
                                src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1772515349/interactive_ahvxx6.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="none"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
