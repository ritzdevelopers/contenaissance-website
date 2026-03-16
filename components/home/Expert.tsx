"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExpertSectionProps {
    isDarkMode?: boolean;
}

export default function Expert({ isDarkMode }: ExpertSectionProps) {

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

    useEffect(() => {
        if (!sectionRef.current || !previewRef.current) return;

        const ctx = gsap.context(() => {

            gsap.fromTo(
                previewRef.current,
                {
                    scale: 0.30,
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
                        pin: true, // easier than pin-wrapper
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // !-------Second section animation -------------------

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: secondSectionRef.current,
                    start: "top 75%",
                    toggleActions: "play reverse play reverse",
                },
            });

            tl.from(leftRef.current, {
                opacity: 0,
                x: -80,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
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
        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);

    //! -------------second section--------------------
    // const container = {
    //     hidden: {},
    //     show: {
    //         transition: {
    //             staggerChildren: 0.25
    //         }
    //     }
    // };

    // const slideLeft: Variants = {
    //     hidden: { opacity: 0, x: -80 },
    //     show: {
    //         opacity: 1,
    //         x: 0,
    //         transition: { duration: 0.8, ease: "easeOut" }
    //     }
    // };

    // const slideRight: Variants = {
    //     hidden: { opacity: 0, x: 80 },
    //     show: {
    //         opacity: 1,
    //         x: 0,
    //         transition: { duration: 0.8, ease: "easeOut" }
    //     }
    // };
    return (
        <div className="bg-zinc-950">
            {/* -----------First section----- */}
            <div
                ref={sectionRef}
                className="w-full flex justify-center mb-14 md:mb-10 px-5 md:px-10"
            >
                <div
                    ref={previewRef}
                    onMouseEnter={() => handleMouseEnter(videoRef1.current)}
                    onMouseLeave={() => handleMouseLeave(videoRef1.current)}
                    className="w-full max-w-full h-[180px] sm:h-[240px] md:h-auto rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
                >
                    <video
                        ref={videoRef1}
                        src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1772515369/service2_rdybf5.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-contain "
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
                    px-6 sm:px-8 lg:px-16
                    py-5 sm:py-10 lg:pb-16
                    flex flex-col-reverse lg:flex-row
                    items-center justify-between
                    gap-12 lg:gap-0
                "
                >

                    <motion.div
                        ref={leftRef}
                        className="w-full lg:w-1/2 z-10"
                    >
                        <h1
                            className="
                            font-light leading-[1.1] tracking-tight
                            text-[clamp(2rem,5vw,2.5rem)]
                            mb-6
                        "
                        >
                            Get your <span className="font-bold">3D Website</span> with
                            <br />
                            <span className="opacity-80"> Our Expert Designers.</span>
                        </h1>
                        <p className="text-white/70 text-sm sm:text-base max-w-md mb-8">
                            We craft immersive, high-end 3D experiences that elevate your brand
                            beyond flat design.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                className="
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
                        className="w-full lg:w-1/2 flex justify-center items-center relative mt-1 lg:mt-0"
                    >
                        <motion.div

                            onMouseEnter={() => handleMouseEnter(videoRef2.current)}
                            onMouseLeave={() => handleMouseLeave(videoRef2.current)}
                            className="w-full sm:w-[340px] md:w-[420px] lg:w-[520px] xl:w-[500px] max-w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px] xl:h-[280px] cursor-pointer">
                            <video
                                ref={videoRef2}
                                src="https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651797/06_pazrtc.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="none"
                                className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/20 bg-black object-cover"

                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section >
        </div >

    );
}