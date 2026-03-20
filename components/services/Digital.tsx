"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export default function Digital() {
    const previewRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

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
        return () => ctx.revert();

    }, [])

    // ----------------control video functionality play/pause
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
            className="relative w-full min-h-screen  text-white px-6 md:px-20 py-3">

            {/* Main Heading */}
            <div className="max-w-6xl">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    Digital-First Content
                    {/* Stories that captivate.
                    <br />
                    Intelligence that connects. */}
                </h1>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-16 mt-5 md:mt-20">
                {/* Left */}
                <div className="space-y-3 text-sm tracking-[0.1em] uppercase">
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Platform-Specific Content
                    </p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">AI-Driven Content Creation
                    </p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Contextually Relevant Content</p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Performance Optimization with AI Analytics</p>

                </div>

                {/* Right */}
                <div className="md:col-span-2 text-gray-300 text-md space-y-3 text-justify">
                    <p>
                        In a digital-first world, we consume content faster than ever, and it has to hit home right away. Through the use of AI, we create fast, appealing content for you that resonates with your audience. Our content engages online users instantly, whether they are visiting your website, scrolling your mobile app, or simply seeing it on social media.
                    </p>

                    <p>
                        Using advanced AI, we craft contextually relevant content that is tailored to meet the exact requirements of your target audience.  We know that each platform needs its own design, so the vibes of your content always suit the message at the right time.  Whether to help you move views on your advertising message, E-commerce business, or any web service, and more !

                    </p>

                    <p>
                        Translating the content into appropriate media as per the audience requirement ensures effective engagement. Through the use of AI analytics, we keep a track of engagement and optimize it for maximum effectiveness. Regardless of whether you are launching a product, building brand awareness, or running a campaign, our content delivers results on all digital platforms.

                    </p>
                </div>
            </div>


            <div
                ref={previewRef}
                className="w-[100vw] max-w-full aspect-video overflow-hidden will-change-transform rounded-3xl cursor-pointer"
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