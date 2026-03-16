
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

const Hero1: React.FC<HeroProps> = ({ isDarkMode, navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 1000], [1, 0]);
  const y = useTransform(scrollY, [0, 1000], [0, -40]);

  const backgroundVideoUrl = "https://res.cloudinary.com/df4ax8siq/video/upload/v1769062622/SV93YW50X3lvdV8yMDI2MDEyMjExNDZfbXAzczFfZ3hqYmpw.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="hero1 relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-12 o px-6 transition-colors duration-700 bg-zinc-950"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 ">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload='none'
          className={`w-full h-full max-w-full object-cover transition-opacity duration-2000 ${isDarkMode ? 'opacity-70' : 'opacity-40'}`}
        >
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
        
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950' 
            : 'bg-gradient-to-b from-zinc-950/60 via-zinc-950/90 to-zinc-950'
        }`} />
        
        <div className={`absolute inset-0 backdrop-blur-[1px] ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} />
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-[1600px] flex flex-col items-center"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-4 lg:gap-16">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-6"
            >
              <div className="w-[1px] h-3 bg-blue-500/50" />
              <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase font-sora text-white/70  [word-spacing:0.7em]">
                Ritz Gen AI Storytelling Studio
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.04em] leading-[0.8] font-Ariel text-white">
                Grow
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.04em] leading-[0.8] font-serif-brand text-white">
                Brand
              </h1>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="text-sm md:text-lg lg:text-xl font-medium italic font-serif-brand lowercase tracking-[0.2em] ml-0 sm:ml-2 md:ml-4 -mt-1 md:-mt-2 text-white"
            >
              with
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center select-none w-full sm:w-auto justify-center"
          >
            <span className="text-[6rem] sm:text-[12rem] md:text-[14rem] lg:text-[28rem] font-medium tracking-[-0.05em] leading-none font-Ariel relative bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-300 to-blue-600">
              AI
              
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  className="absolute -top-4 -right-6 md:-top-8 md:-right-10 w-6 h-6 md:w-16 md:h-16 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: "backOut" }}
                >
                  <motion.div 
                    className="absolute w-full h-full z-10 bg-white"
                    style={{ clipPath: 'polygon(50% 0%, 54% 46%, 100% 50%, 54% 54%, 50% 100%, 46% 54%, 0% 50%, 46% 46%)' }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full blur-[1px] shadow-[0_0_15px_rgba(255,255,255,1)] z-20" />
                  <motion.div 
                    className="absolute inset-0 rounded-full opacity-40 blur-[20px] md:blur-[30px] bg-blue-500"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center text-center mt-6 md:mt-4">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-lg sm:text-xl md:text-3xl max-w-5xl font-light leading-none tracking-tight px-4 text-white"
          >
            Transform your brand with <span className="font-medium text-white">AI-Powered cinematic storytelling.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 md:mt-14"
          >
            <motion.button 
              onClick={() => navigateTo?.('portfolio')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full sm:w-auto max-w-[340px] px-10 py-5 rounded-full font-bold uppercase tracking-[0.1em] text-[11px] flex items-center justify-center gap-5 transition-all shadow-2xl bg-white text-zinc-950 shadow-white/5 hover:bg-[#ab8922] hover:text-white"
            >
              Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero1;
