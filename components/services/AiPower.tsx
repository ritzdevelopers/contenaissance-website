"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export default function AiPower() {
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
            className="relative w-full min-h-screen  text-white px-6 md:px-20 py-10">

            {/* Main Heading */}
            <div className="max-w-6xl">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    AI Power Compaigns
                    {/* Stories that captivate.
                    <br />
                    Intelligence that connects. */}
                </h1>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-16 mt-5 md:mt-20">
                {/* Left */}
                <div className="space-y-3 text-sm tracking-[0.1em] uppercase">
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Maximize Marketing Impact</p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Data-Driven Decisions
                    </p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Market Analysis & Optimization</p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Scalable AI Campaigns</p>

                </div>

                {/* Right */}
                <div className="md:col-span-2 text-gray-300 text-md space-y-3 text-justify">
                    <p>
                        Make full use of the potential of your marketing campaigns to drive better results and increase profits. We use AI technology to create data-driven strategies to help you reach your intended audience as effectively as possible. We closely examine how users behave and what campaigns look like, we make sure you do not waste any of your dollars.
                    </p>

                    <p>
                        The use of AI technology can enhance your marketing campaigns in all aspects. We analyze and predict the market from the vast data. The accurate analysis helps to optimize the campaigns. Our approach guarantees the fulfilment of all performance objectives, resulting in substantial returns on your ad expenditures
                    </p>

                    <p>
                        Incorporate AI into the heart of your marketing campaign and you will easily scale your marketing campaigns. By relying on our data-driven strategies, it is easy to adapt to market trends and consumer behavior to keep your marketing campaigns effective. AI powered marketing campaigns provide result-driven services, from social media marketing to email marketing.

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
                        src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1772515260/expert_cztbxe.mp4"
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