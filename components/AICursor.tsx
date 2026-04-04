"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AICursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2 };

    // GSAP QuickTo for ultra-smooth performance
    const xTo = gsap.quickTo(mouse, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(mouse, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    // Neural Network / AI Dust Particle System
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 40;
        this.y = y + (Math.random() - 0.5) * 40;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        
        // ChatGPT-like AI colors (cyan, blue, purple, magenta)
        const hues = [190, 220, 260, 290];
        const hue = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsla(${hue}, 100%, 75%, ${Math.random() * 0.6 + 0.4})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.05) this.size -= 0.05;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particlesArray: Particle[] = [];
    let time = 0;

    const handleParticles = () => {
      // Add particles smoothly tracking the GSAP-animated mouse
      particlesArray.push(new Particle(mouse.x, mouse.y));
      particlesArray.push(new Particle(mouse.x, mouse.y));

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Neural network connections
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 70) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(140, 210, 255, ${0.15 - distance / 460})`;
            ctx!.lineWidth = 0.6;
            ctx!.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx!.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx!.stroke();
          }
        }

        if (particlesArray[i].size <= 0.05) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    };

    let animationFrameId: number;

    const animate = () => {
      time += 0.02;
      
      // Clear with trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // ChatGPT Voice Mode / AI Core Glow Effect
      // We make it pulsate slightly
      const pulse = Math.sin(time) * 15;
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0, 
        mouse.x, mouse.y, 90 + pulse
      );
      
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)"); // White hot core
      gradient.addColorStop(0.2, "rgba(100, 200, 255, 0.5)"); // Cyan middle
      gradient.addColorStop(0.5, "rgba(120, 80, 255, 0.2)"); // Purple outer
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100 + pulse, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset composite operation for particles
      ctx.globalCompositeOperation = "source-over";
      
      handleParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-100"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
