"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
    RoundedBox,
    ContactShadows,
    AdaptiveDpr,
    AdaptiveEvents,
} from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";


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
        "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772515416/service1_pg5wmy.mp4",
        "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651801/11_wnq0ki.mp4",
        "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651800/03_suriqe.mp4",
        "https://res.cloudinary.com/dbpx7aobb/video/upload/v1773651796/13_kn8ho3.mp4",
        // "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686226/reels_l0xg2y.mp4",
        "https://res.cloudinary.com/dbpx7aobb/video/upload/v1772686554/3d_wm31gf.mp4"
    ];

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();

        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

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

            {/* Spacer above (like Peach) */}
            {/* <div style={{ height: "30vh" }} /> */}

            {/* ===== STICKY SECTION ===== (taller = slower card movement per scroll) */}
            <section ref={sectionRef} className="relative h-[220vh] md:h-[320vh]">

                <div className="sticky top-[60px] md:top-[80px] h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] overflow-hidden">

                    {/* ===== 3D CANVAS ===== */}
                    <Canvas
                        shadows
                        // camera={{ position: [0, 1.1, 7.5], fov: 38 }}
                        camera={{
                            position: isMobile ? [0, 1, 6] : [0, 1.1, 7.5],
                            fov: isMobile ? 45 : 38,
                        }}
                        gl={{ antialias: true }}
                        className="absolute inset-0 pt-6"
                    >
                        <AdaptiveDpr pixelated />
                        <AdaptiveEvents />

                        <CardsScene
                            images={images}
                            progress={progress}
                        />
                    </Canvas>

                    {/* ===== CENTER HERO ===== */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="z-50 text-center max-w-3xl px-6">
                            <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight">
                                Visually<span className="font-medium">Stunning</span>
                                <br />
                                <span className="opacity-80">
                                    3D Websites with Power of AI
                                </span>
                            </h1>

                            <button className="pointer-events-auto mt-4 md:mt-6 px-6 md:px-8 py-3 md:py-4 rounded-2xl border border-white/40 backdrop-blur-md transition-all duration-500 hover:scale-105">
                                Book a Call
                            </button>

                        </div>
                    </div>

                </div>
            </section>

            {/* Spacer below */}
            <div style={{ height: "40vh" }} />

        </div>
    );
}