"use client";

import { useEffect, useRef } from "react";

interface FooterWaveProps {
  className?: string;
  lineColor?: string;
  lineCount?: number;
  speed?: number;
}

const FooterWave: React.FC<FooterWaveProps> = ({
  className = "",
  lineColor = "255, 255, 255",
  lineCount = 90,
  speed = 0.55,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    const start = performance.now();
    const segments = 180;

    // Tilted plane → 2D (same math as the reference-style wireframe band)
    const tiltAngle = 0.18;
    const sinT = Math.sin(tiltAngle);
    const cosT = Math.cos(tiltAngle);

    const draw = (now: number) => {
      const t = ((now - start) / 1000) * speed;
    
      ctx.clearRect(0, 0, width, height);
    
      ctx.lineWidth = 1;
    
      const centerY = height * 0.52;
    
      // tighter wave band like screenshot
      const planeHalfDepth = Math.min(height * 0.22, 120);
    
      // bigger vertical deformation
      const waveScale = Math.min(height * 0.42, 220);
    
      for (let i = 0; i < lineCount; i++) {
        const u = (i / (lineCount - 1)) * 2 - 1;
    
        ctx.beginPath();
    
        for (let s = 0; s <= segments; s++) {
          const px = s / segments;
          const x = (px - 0.5) * 2;
    
          // Strong center envelope
          const centerEnvelope = Math.pow(Math.sin(px * Math.PI), 2.8);
    
          // Lines near center become more active
          const depthEnvelope = Math.pow(1 - Math.abs(u), 1.4);
    
          // Main flowing wave
          const wave1 =
            Math.sin(x * 3.0 - t * 1.8 + u * 1.6) * 0.9;
    
          // Secondary distortion
          const wave2 =
            Math.sin(x * 7.5 + t * 1.2 - u * 2.0) * 0.25;
    
          // Fine detail ripple
          const wave3 =
            Math.sin(x * 14.0 - t * 0.8 + u * 4.0) * 0.08;
    
          const wave = wave1 + wave2 + wave3;
    
          const h =
            wave *
            centerEnvelope *
            depthEnvelope;
    
          // Perspective squeeze near edges
          const perspective =
            1 - Math.abs(x) * 0.22;
    
          const screenX = px * width;
    
          const screenY =
            centerY +
            u * planeHalfDepth * perspective -
            h * waveScale * perspective;
    
          if (s === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
    
        // brighter center glow
        const fade = Math.pow(1 - Math.abs(u), 1.8);
    
        const alpha =
          0.02 + fade * 0.35;
    
        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
    
        ctx.stroke();
      }
    
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [lineColor, lineCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default FooterWave;
