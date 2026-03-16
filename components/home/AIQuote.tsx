
import React from 'react';
import { motion } from 'framer-motion';

interface AIQuoteProps {
    isDarkMode: boolean;
}

const AIQuote: React.FC<AIQuoteProps> = ({ isDarkMode }) => {
    const arialFont = { fontFamily: 'Arial, sans-serif' };

    // High-quality timeline/evolution visual
    const timelineImageUrl = "https://res.cloudinary.com/df4ax8siq/image/upload/v1769166382/New-Image-03_twboif.png";

    // Create a list of items for the marquee to ensure distinct spacing and variety
    const visualItems = [1, 2, 3, 4];

    return (
        <section className="pt-0 pb-2 md:pb-2 px-0 relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-zinc-950">
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

            {/* Full-Screen Horizontal Display Section */}
            <div className="w-full relative overflow-hidden py-4">
                {/* The Marquee Container */}
                <motion.div
                    className="flex flex-nowrap gap-6 sm:gap-10 md:gap-20 lg:gap-24 px-6 sm:px-12 md:px-24"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 45,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ width: 'fit-content' }}
                >
                    {/* Map over items twice for a seamless infinite loop */}
                    {[...visualItems, ...visualItems].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 group relative"
                        >
                            {/* Card Container with reduced image dimensions (approx 40% smaller than previous) */}
                            <div className="relative overflow-hidden bg-zinc-900/40 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-14 backdrop-blur-md transition-all duration-700 hover:bg-zinc-900/60 hover:border-white/20 hover:scale-[1.02]">
                                <img
                                    src={timelineImageUrl}
                                    alt={`AI Evolution Step ${item}`}
                                    // Heights decreased by 40% from previous sizes to match "40% decrease" request
                                    // Previous: 32 -> New: 20 | Previous: 64 -> New: 40 | Previous: 22.5rem -> New: 13.5rem
                                    className="h-20 md:h-40 lg:h-[13.5rem] w-auto max-w-full object-contain block brightness-110 contrast-125 transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Subtle Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Decorative label for card separation */}
                            <div className=" text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-400">
                                    Step {item}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Edge Faders for full-screen blending */}
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
