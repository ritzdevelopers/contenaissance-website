
"use client"
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface PortProps {
  isDarkMode: boolean;
}

const BrandFilmCard: React.FC<{
  title: string;
  video: string;
  category: string;
  isDarkMode: boolean;
  index: number;
}> = ({ title, video, category, isDarkMode, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      // Unmute and ensure it's playing with sound
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => {
        console.warn("Audio/Video playback failed:", e);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      // Mute and continue silent loop
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  };

  return (
    <motion.div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        zIndex: 50,
        boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.08)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="relative w-[calc(100vw-2rem)] sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex-shrink-0 transition-all cursor-pointer group bg-zinc-900"
    >
      {/* Video content - using single ref for perfectly synced audio/video */}
      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        whileTap={{ scale: 1.06 }}
        className="absolute inset-0 w-full h-full max-w-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
        <source src={video} type="video/mp4" />
      </motion.video>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Brand Labeling */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center px-6">
        <motion.span 
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          className="text-[8px] md:text-[10px] font-bold tracking-[0.5em] uppercase text-white mb-2 block"
        >
          {category}
        </motion.span>
        <h4 className="text-sm md:text-xl font-bold tracking-tight text-white leading-tight mb-3 uppercase font-sora">
          {title}
        </h4>
        <div className="w-12 h-[1px] bg-blue-500/50 mx-auto rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-blue-500" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2.5rem] ring-1 ring-white/10 pointer-events-none" />

      {/* Modern Audio status indicator */}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-8 right-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <div className="flex gap-[3px] items-end h-3">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i}
                animate={{ height: [4, 14, 6, 12, 4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                className="w-[2px] bg-blue-400 rounded-full"
              />
            ))}
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-blue-400">Cinematic Audio</span>
        </motion.div>
      )}
    </motion.div>
  );
};

const Port: React.FC<PortProps> = ({ isDarkMode }) => {
  const brandFilms = useMemo(() => [
    {
      title: "Gulshan Luxury",
      category: "Architectural Narrative",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651789/07_wmp4jw.mp4"
    },
    {
      title: "Namah Wellness",
      category: "Cinematic Identity",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651795/04_c8jpqe.mp4"
    },
    {
      title: "MPF Narrative",
      category: "Horizontal Narrative",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651797/06_pazrtc.mp4"
    },
    {
      title: "RMW Synthesis",
      category: "Neural Core",
      video: "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651790/08_dwrbhx.mp4"
    },
    // {
    //   title: "Lumora Safari",
    //   category: "Immersive Design",
    //   video: "https://res.cloudinary.com/df4ax8siq/video/upload/v1769086501/Lumora__Jungle_Safari_1_1_rzdyik.mp4"
    // }
  ], []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const mobilePadding = 32;
    const amount = window.innerWidth < 768 
      ? (el.clientWidth - mobilePadding)
      : 500;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="pt-10 md:pt-20 pb-6 max-w-full overflow-hidden relative bg-zinc-950">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .port-marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .port-marquee-container:hover .port-marquee-inner {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mb-6 md:mb-8 flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-10 sm:w-12 md:w-16 h-[1px] bg-blue-500/30" />
          <span className="whitespace-nowrap text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase text-white/40 tracking-[0.35em] md:tracking-[0.5em] lg:tracking-[0.6em]">
            Featured Productions
          </span>
          <div className="w-10 sm:w-12 md:w-16 h-[1px] bg-blue-500/30" />
        </motion.div>
        <h2 className="text-[clamp(2.25rem,7vw,7.5rem)] font-bold tracking-tighter text-white uppercase font-sora text-center leading-[0.8] mb-4">
          Brand Films
        </h2>
      </div>

      <div className="relative w-full pt-6 pb-1">
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-zinc-950 to-transparent z-40 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-zinc-950 to-transparent z-40 pointer-events-none" />

        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll('left')}
            className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white z-[200] hover:bg-white hover:text-black transition-all shadow-2xl ${canScrollLeft ? '' : 'opacity-40 pointer-events-none'}`}
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
            className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white z-[200] hover:bg-white hover:text-black transition-all shadow-2xl ${canScrollRight ? '' : 'opacity-40 pointer-events-none'}`}
          >
            <ChevronRight size={24} />
          </motion.button>
        </AnimatePresence>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-0 sm:gap-8 md:gap-16 overflow-x-auto no-scrollbar px-4 sm:px-8 md:px-12"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {brandFilms.map((film, index) => (
            <div key={index} className="flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
              <BrandFilmCard 
                title={film.title}
                video={film.video}
                category={film.category}
                isDarkMode={isDarkMode}
                index={index}
              />
            </div>
          ))}
          {/* <div className="w-10 md:w-24 flex-shrink-0" /> */}
        </div>
      </div>

    </section>
  );
};

export default Port;
