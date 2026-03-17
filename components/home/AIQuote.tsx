
import React from 'react';
import { motion } from 'framer-motion';

interface AIQuoteProps {
    isDarkMode: boolean;
}

const AIQuote: React.FC<AIQuoteProps> = ({ isDarkMode }) => {
    const arialFont = { fontFamily: 'Arial, sans-serif' };

    // High-quality timeline/evolution visual
    const timelineImageUrl = "https://res.cloudinary.com/dbpx7aobb/image/upload/v1773730198/image_4_2_kuzssj.png";

    // Repeated images per row for a long strip; we duplicate the row for seamless loop
    const slideCopies = 8;

    return (
        <section className="pt-0 pb-2 md:pb-2 px-0 relative flex flex-col items-center justify-center transition-colors duration-700 bg-zinc-950">
            <div className="max-w-[1600px] mx-auto text-center relative z-20 w-full flex flex-col items-center px-6">
                {/* Quote Header Text */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-0 mb-6 md:mb-8"
                >
                    <h2
                        style={arialFont}
                        className="text-xl md:text-3xl lg:text-4xl font-normal tracking-tight leading-tight mb-4 text-white/80"
                    >
                        "AI is changing so fast in 2026"
                    </h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <motion.h3
                            style={arialFont}
                            animate={{
                                opacity: [0.95, 1, 0.95],
                                scale: [1, 1.01, 1]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-[clamp(2rem,10vw,11rem)] font-bold tracking-tighter text-white leading-none"
                        >
                            But are you?
                        </motion.h3>
                    </motion.div>
                </motion.div>
            </div>

            {/* Full-Screen Horizontal Display Section — seamless infinite slider */}
            <div className="w-full relative overflow-hidden py-4">
                <motion.div
                    className="flex flex-nowrap w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                >
                    {/* Row 1: strip of images (same content duplicated in Row 2 for seamless loop) */}
                    <div className="flex flex-nowrap shrink-0">
                        {Array.from({ length: slideCopies }).map((_, i) => (
                            <img
                                key={`a-${i}`}
                                src={timelineImageUrl}
                                alt=""
                                className="h-24 md:h-40 lg:h-56 w-auto shrink-0 object-contain"
                            />
                        ))}
                    </div>
                    {/* Row 2: exact duplicate — at -50% we're here, so loop is invisible */}
                    <div className="flex flex-nowrap shrink-0">
                        {Array.from({ length: slideCopies }).map((_, i) => (
                            <img
                                key={`b-${i}`}
                                src={timelineImageUrl}
                                alt=""
                                className="h-24 md:h-40 lg:h-56 w-auto shrink-0 object-contain"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Edge faders for blending */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-zinc-950 via-zinc-950/60 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Decorative center line for alignment feel */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                className=""
            />
        </section>
    );
};

export default AIQuote;
