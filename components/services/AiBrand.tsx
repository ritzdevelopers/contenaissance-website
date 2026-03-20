"use client"

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export default function AiBrand() {
    const previewRef = useRef<HTMLDivElement>(null);
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
            className="relative w-full min-h-screen  text-white px-6 md:px-20 py-20">

            {/* Main Heading */}
            <div className="max-w-6xl">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    AI Brand Films
                    {/* Stories that captivate.
                    <br />
                    Intelligence that connects. */}
                </h1>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-16 mt-5 md:mt-20">
                {/* Left */}
                <div className="space-y-3 text-sm tracking-[0.1em] uppercase">
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">AI-Powered Brand Films</p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Generative AI Storytelling</p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">Interactive Brand Experiences</p>
                    <p className="font-bold bg-gradient-to-r from-[#fff4b0] via-[#FFD700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">AI Cinematic Marketing</p>

                    {/* <div className="mt-12 space-y-3 text-gray-400 tracking-widest pt-12">
                        <p className="hover:text-white cursor-pointer">
                            LinkedIn ↗
                        </p>
                        <p className="hover:text-white cursor-pointer">
                            Website ↗
                        </p>
                    </div> */}
                </div>

                {/* Right */}
                <div className="md:col-span-2 text-gray-300 text-md  space-y-3 text-justify">
                    <p>
                        Find out how 3D technology powered by AI can change the story of your brand into the cinema. Our group employs the use of generative AI to produce amazing brand videos that mesh live-action with virtual environments to ensure a built-up visual experience. Our brand films powered by AI enhance your company's story engaging viewers with captivating visuals and creative narrative.
                    </p>

                    <p>
                        Through our AI brand films, the audience can become emotionally attached to your brand and be more aware of it. We combine the latest AI technology with traditional storytelling to create a brand film that is better than the competition. A unique audiovisual and interactive experience leaves a lasting impression and significantly enhances your brand value.

                    </p>

                    <p>
                        AI brand films are the marketing of the future whether you need a corporate presentation, a digital ad, or something for social media. With our creative approach, we’ll ensure that your brand stands apart from the competition and is an experience to remember. AI filmmaking tells the story of your brand in the most futuristic and attention-grabbing way possible.

                    </p>
                </div>
            </div>


            {/* TOP video section */}
           
                <div
                    ref={previewRef}
                    className="w-[100vw] max-w-full aspect-video overflow-hidden will-change-transform rounded-3xl cursor-pointer"
                    style={{ transformOrigin: "center center" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1772515416/service1_pg5wmy.mp4"
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