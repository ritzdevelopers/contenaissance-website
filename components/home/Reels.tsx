
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { X } from "lucide-react";

interface ReelsProps {
  isDarkMode: boolean;
}

const ReelCard: React.FC<{
  title: string;
  video: string;
  isDarkMode: boolean;
  index: number;
}> = ({ title, video, isDarkMode, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.warn("Reel playback failed:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 0.8, delay: index * 0.1 },
        scale: { duration: 0.8, delay: index * 0.1 }
      }}
      whileHover={{
        y: -15,
        zIndex: 50,
        boxShadow: "0 30px 60px -15px rgba(59, 130, 246, 0.2)"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        scrollSnapAlign: 'center'
      }}
      className="relative h-[550px] aspect-[9/16] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 flex-shrink-0 transition-all cursor-pointer bg-zinc-900 group w-[calc(100vw-2rem)] sm:w-auto sm:max-w-[320px]"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full max-w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Content */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="absolute bottom-8 left-0 right-0 text-center px-6"
      >
        <motion.h4
          className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white leading-none mb-3 font-sora"
        >
          {title}
        </motion.h4>
        <motion.div
          animate={{ width: isHovered ? 40 : 20 }}
          className="h-[1.5px] bg-[#ab8922] mx-auto rounded-full"
        />
      </div>

      {/* Audio Status Overlay */}
      <div className="absolute top-6 right-6 z-10">
        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 transition-colors group-hover:border-blue-500/50">
          {isHovered ? <Volume2 size={12} className="text-blue-400" /> : <VolumeX size={12} className="text-white/40" />}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

const Reels: React.FC<ReelsProps> = ({ isDarkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);


  const baseReels = useMemo(() => [
    {
      title: "Storytelling",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651791/09_tbp1q7.mp4"
    },
    {
      title: "AI Model",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686554/3d_wm31gf.mp4"
    },
    {
      title: "Cinematic Flow",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651789/01_mrmw5v.mp4p4"
    },
    {
      title: "Neural Core",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651787/05_ucknoc.mp4"
    },
    {
      title: "AI Model",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651789/01_mrmw5v.mp4"
    },
    {
      title: "",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686226/reels_l0xg2y.mp4"
    },
  ], []);

  const reels = [...baseReels, ...baseReels]; // duplicate for infinite illusion

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < (scrollWidth - clientWidth - 20));
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const halfWidth = container.scrollWidth / 2;
    container.scrollLeft = halfWidth;
    positionRef.current = halfWidth;

    const speed = 0.5;

    const autoScroll = () => {
      if (!isPausedRef.current) {
        positionRef.current += speed;
        container.scrollLeft = positionRef.current;

        if (positionRef.current >= container.scrollWidth - container.clientWidth) {
          positionRef.current = halfWidth;
        }

        if (positionRef.current <= 0) {
          positionRef.current = halfWidth;
        }
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    isPausedRef.current = true;

    const mobilePadding = 32;
    const scrollAmount =
      window.innerWidth < 768
        ? scrollRef.current.clientWidth - mobilePadding
        : 500;

    positionRef.current += direction === 'left' ? -scrollAmount : scrollAmount;

    scrollRef.current.scrollTo({
      left: positionRef.current,
      behavior: 'smooth'
    });

    // Resume auto scroll after 2 seconds
    setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  return (
    <section className=" pt-2 pb-4 md:pb-12 relative overflow-hidden flex flex-col items-center bg-zinc-950">
      {/* Dynamic Background Glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full blur-[140px] pointer-events-none bg-blue-600/10 opacity-50" /> */}

      <div className="mb-4 px-6 max-w-[1400px] w-full flex flex-col items-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          {/* <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-blue-500/20" />
            <div className="w-12 h-[1px] bg-blue-500/20" />
          </div> */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2rem,10vw,11rem)] font-bold tracking-tighter text-center leading-none font-sora text-white">
            AI Reels
          </h2>
        </motion.div>
      </div>

      {/* Modern Slider Container */}
      <div className="relative w-full max-w-[1600px] mx-auto z-30 group/slider">

        {/* Navigation Buttons */}
        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll('left')}
            className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white z-50 hover:bg-white hover:text-black transition-all shadow-2xl ${canScrollLeft ? '' : 'opacity-40 pointer-events-none'}`}
          >
            <ChevronLeft size={24} />
          </motion.button>
        </AnimatePresence>

        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll('right')}
            className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white z-50 hover:bg-white hover:text-black transition-all shadow-2xl ${canScrollRight ? '' : 'opacity-40 pointer-events-none'}`}
          >
            <ChevronRight size={24} />
          </motion.button>
        </AnimatePresence>

        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 sm:gap-8 md:gap-6 overflow-x-auto no-scrollbar px-4 sm:px-10 md:px-24 py-10"
          style={{
            scrollSnapType: 'none',
            perspective: '2000px'
          }}
        >
          {reels.map((reel, index) => (
            <div key={index} className="flex-shrink-0 cursor-pointer"
              onClick={() => setActiveVideo(reel.video)}
            >
              <ReelCard
                title={reel.title}
                video={reel.video}
                isDarkMode={isDarkMode}
                index={index}
              />
            </div>
          ))}

          {/* Spacer to allow for better alignment at end */}
          {/* <div className="w-10 md:w-24 flex-shrink-0" /> */}
        </div>


        {/* Cinematic Edge Faders */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none z-30" />
      </div>
      {/* -----------------------Pop up video------------------- */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-6 py-10"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-[90vh] bg-black rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition"
              >
                <X size={24} />
              </button>

              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reels;
