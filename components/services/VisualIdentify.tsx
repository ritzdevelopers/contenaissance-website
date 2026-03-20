"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function VisualIdentify() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const previewRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(previewRef.current,
                {
                    scale: 0.3,
                    borderRadius: "10px"
                },
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
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                }
            )
        })
    })

    // ----------------controlling the videos---------
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.volume = 0;
        }
    };
    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen  text-white px-6 md:px-20 py-5 pointer">

            {/* Main Heading */}
            <div className="max-w-6xl">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    Visual Identify System
                    {/* Stories that captivate.
                    <br />
                    Intelligence that connects. */}
                </h1>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-16 mt-5 md:mt-20">
                {/* Left */}
                <div className="space-y-3 text-sm tracking-[0.1em] uppercase">
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                        AI-Driven Branding Frameworks
                    </p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Custom Design Systems
                    </p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Visual Identity Solutions
                    </p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">UI/UX Design & Interactive Assets
                    </p>

                </div>


                {/* Right */}
                <div className="md:col-span-2 text-gray-300 text-md space-y-3 text-justify">
                    <p>
                        Coin a powerful AI-driven visual identity system which can precisely and strategically define your brand and its behavior in the long-term. We develop scalable branding frameworks to ensure visual consistency at all touchpoints, including the digital world, print and social media, packaging, advertising, and experiences. Each element is made so that its message is recognisable, strengthened by the brand identity selected that will operate firmly on the market.
                    </p>

                    <p>
                        We will establish the suitable visual language, brand aesthetic, and intelligent design systems within today’s Ai-enabled ecosystem, in keeping with your organizational values, industry practices, and competitive landscape. All the elements, from detailed brand guidelines and visual governance frameworks to logo architecture, colour psychology, typography systems and iconography, is created to ensure consistency and adaptability as your brand evolves.

                    </p>

                    <p>
                        We offer comprehensive visual identity solutions including logotypes, colour palettes, typographic hierarchies, digital assets, UI/UX components, packaging imagery, brand collateral, motion graphics and interactive design systems. We provide long-term brand value, connection, and recall by creating a pleasing identity through effective design that speaks to your audience and differentiates you in a crowded online and offline marketplace.

                    </p>
                </div>
            </div>

            <div
                ref={previewRef}
                className="w-[100vw] max-w-full aspect-video overflow-hidden will-change-transform rounded-3xl cursor-pointer mt-2 md:mt-0"
                style={{ transformOrigin: "center center" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    ref={videoRef}
                    src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651790/08_dwrbhx.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

        </section>
    );
}