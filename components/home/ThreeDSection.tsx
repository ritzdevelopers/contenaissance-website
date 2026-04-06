"use client";
/// <reference types="react" />
import { Canvas, useFrame } from "@react-three/fiber";
import {
    RoundedBox,
    ContactShadows,
    AdaptiveDpr,
    AdaptiveEvents,
} from "@react-three/drei";
import * as THREE from "three";
import React, { useRef, useEffect, useState, JSX } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ================= CARD =================
type CardProps = {
    url: string;
    index: number;
    progress: number;
}
function Card({ url, index, progress }: CardProps) {
    // const CARD_WIDTH = 2.1;
    // const CARD_HEIGHT = 3.6;
    const isMobile = window.innerWidth <= 768;

    const CARD_WIDTH = isMobile ? 1.5 : 2.1;
    const CARD_HEIGHT = isMobile ? 2.6 : 3.6;
    const CARD_DEPTH = 0.05;
    const CARD_RADIUS = 0.1;
    const ref = useRef<THREE.Mesh | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);

    useEffect(() => {
        const video = document.createElement("video");

        video.src = url;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        videoRef.current = video;

        const tex = new THREE.VideoTexture(video);

        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;

        const applyCoverFit = () => {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            if (!videoWidth || !videoHeight) return;

            const cardAspect = CARD_WIDTH / CARD_HEIGHT;
            const videoAspect = videoWidth / videoHeight;

            // Same feel as CSS object-cover: fill card, crop overflow.
            if (videoAspect > cardAspect) {
                const repeatX = cardAspect / videoAspect;
                tex.repeat.set(repeatX, 1);
                tex.offset.set((1 - repeatX) / 2, 0);
            } else {
                const repeatY = videoAspect / cardAspect;
                tex.repeat.set(1, repeatY);
                tex.offset.set(0, (1 - repeatY) / 2);
            }
            tex.needsUpdate = true;
        };

        video.addEventListener("loadedmetadata", applyCoverFit);
        if (video.readyState >= 1) applyCoverFit();

        setTexture(tex);

        video.play().catch(() => { });

        return () => {
            video.removeEventListener("loadedmetadata", applyCoverFit);
            video.pause();
        };
    }, [url]);

    // 🔊 Hover → sound ON
    const handlePointerOver = () => {
        if (videoRef.current) videoRef.current.muted = false;
    };

    const handlePointerOut = () => {
        if (videoRef.current) videoRef.current.muted = true;
    };

    useFrame(() => {
        if (!ref.current) return;

        const delay = index * 0.12;
        const t = progress - delay;

        if (t < 0 || t > 1.2) {
            ref.current.visible = false;
            return;
        }

        ref.current.visible = true;

        // ⭐ Orbit motion (RIGHT → LEFT)
        // const radius = 9;
        const radius = window.innerWidth <= 768 ? 5 : 9;

        const angle = THREE.MathUtils.lerp(
            -Math.PI * 0.6,
            Math.PI * 0.6,
            t
        );

        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius;

        ref.current.position.set(x, -0.2, z);

        // ⭐ 3D rotation
        ref.current.rotation.y = angle * 0.9;
        ref.current.rotation.x = 0.05;

        // ⭐ Focus scale
        const focus = 1 - Math.abs(t - 0.5) * 1.6;
        const scale = 0.9 + focus * 0.5;

        ref.current.scale.setScalar(scale);
    });

    if (!texture) return null;



    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {/* ⭐ Debit card style — long slim rectangle */}
            <RoundedBox
                args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
                radius={CARD_RADIUS}
                smoothness={4}
            >
                <meshStandardMaterial color="#0f0f0f" roughness={0.75} metalness={0} />
            </RoundedBox>

            {/* Video only on front face for clean card look */}
            <mesh position={[0, 0, CARD_DEPTH / 2 + 0.002]}>
                <planeGeometry args={[CARD_WIDTH - 0.08, CARD_HEIGHT - 0.08]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
        </mesh>
    );
}

type CardsSceneProps = {
    images: string[];
    progress: number;
}
function CardsScene({ images, progress }: CardsSceneProps) {
    return (
        <>
            <ambientLight intensity={0.5} />

            <directionalLight
                position={[6, 10, 6]}
                intensity={2.5}
                castShadow
            />

            <ContactShadows
                position={[0, -3, 0]}
                opacity={0.6}
                scale={20}
                blur={2.8}
            />

            <group>
                {images.map((img, i) => (
                    <Card key={i} url={img} index={i} progress={progress} />
                ))}
            </group>
        </>
    );
}

// ================= MAIN SECTION =================
interface ThreeDSectionProps {
    isDarkMode?: boolean;
}

export default function ThreeDSection({ isDarkMode }: ThreeDSectionProps) {
    const images = [
        "/assets/Video/15.mp4",
        "/assets/Video/14.mp4",
        "/assets/Video/13.mp4",
        "/assets/Video/12.mp4",
        // "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686226/reels_l0xg2y.mp4",
        "/assets/Video/09.mp4"
    ];

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const mobilePinRef = useRef<HTMLDivElement | null>(null);
    const mobileTrackRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const mm = ScrollTrigger.matchMedia({
            "(max-width: 767px)": () => {
                const pin = mobilePinRef.current;
                const track = mobileTrackRef.current;
                if (!pin || !track) return () => { };

                gsap.set(track, { x: 0 });

                const tween = gsap.to(track, {
                    x: () => {
                        const w = pin.offsetWidth;
                        const tw = track.scrollWidth;
                        return Math.min(0, w - tw);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: pin,
                        start: "top 60px",
                        end: () => {
                            const w = pin.offsetWidth;
                            const tw = track.scrollWidth;
                            const travel = Math.max(0, tw - w);
                            return `+=${travel + 80}`;
                        },
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                requestAnimationFrame(() => ScrollTrigger.refresh());

                return () => {
                    tween.scrollTrigger?.kill();
                    tween.kill();
                    gsap.set(track, { clearProps: "x" });
                };
            },
        });

        return () => (mm as any).revert();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || window.innerWidth < 768) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            const total = rect.height - vh;
            const scrolled = THREE.MathUtils.clamp(-rect.top, 0, total);

            const p = total === 0 ? 0 : scrolled / total;

            setProgress(p);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-zinc-950 text-white">

            {/* Mobile: vertical scroll drives horizontal cards (ScrollTrigger) */}
            <section className="relative md:hidden pt-4 pb-10">
                <div className="px-5 pb-8 text-center">
                    <h1 className="text-2xl font-light leading-tight tracking-tight">
                        Visually
                        {/* @ts-ignore - JSX span element is correctly supported */}
                        <span className="font-medium">Stunning</span>
                        <br />
                        {/* @ts-ignore - JSX span element is correctly supported */}
                        <span className="opacity-80 text-[0.95em]">
                            3D Websites with Power of AI
                        {/* @ts-ignore - JSX span element is correctly supported */}
                        </span>
                    </h1>
                    <button
                        type="button"
                        onClick={() => router.push("/contact")}
                        className="mt-5 px-6 py-3 rounded-2xl border border-white/40 backdrop-blur-md transition-transform active:scale-[0.98]"
                    >
                        Book a Call
                    </button>
                </div>

                <div
                    ref={mobilePinRef}
                    className="relative h-[min(72vh,560px)] overflow-hidden"
                >
                    <div
                        ref={mobileTrackRef}
                        className="flex h-full w-max items-center gap-4 pl-5 pr-8 will-change-transform"
                    >
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="shrink-0 w-55 aspect-9/16 rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-white/10"
                            >
                            {/* @ts-ignore - JSX video element is correctly supported */}
                                <video
                                    src={src}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                            {/* @ts-ignore - JSX video element is correctly supported */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Desktop: sticky 3D scroll section */}
            <section
                ref={sectionRef}
                className="relative hidden md:block h-[320vh]"
            >
                <div className="sticky top-20 h-[calc(100vh-80px)] overflow-hidden z-21 ">
                    <Canvas
                        shadows
                        camera={{
                            position: [0, 1.1, 7.5],
                            fov: 38,
                        }}
                        gl={{ antialias: true }}
                        className="absolute inset-0 pt-6"
                    >
                        <AdaptiveDpr pixelated />
                        <AdaptiveEvents />

                        <CardsScene images={images} progress={progress} />
                    </Canvas>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="z-50 text-center max-w-3xl px-6">
                            <h1 className="text-3xl md:text-[32px] lg:text-[46px] font-light leading-tight tracking-tight">
                                Visually
                                {/* @ts-ignore - JSX span element is correctly supported */}
                                <span className="font-medium">Stunning</span>
                                <br />
                                {/* @ts-ignore - JSX span element is correctly supported */}
                                <span className="opacity-80">
                                    3D Websites with Power of AI
                                {/* @ts-ignore - JSX span element is correctly supported */}
                                </span>
                            </h1>

                            <button
                                type="button"
                                onClick={() => router.push("/contact")}
                                className="pointer-events-auto cursor-pointer mt-6 px-8 py-2 md:py-3 lg:py-4 rounded-2xl border border-white/40 backdrop-blur-md transition-all duration-500 hover:scale-105"
                            >
                                Book a Call
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="hidden md:block" style={{ height: "40vh" }} />
        </div>
    );
}