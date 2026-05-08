"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface SnowEffectProps {
    count?: number;
}

const seededRandom = (seed: number) => {
    const value = Math.sin(seed) * 10000;
    return value - Math.floor(value);
};

const SnowEffect: React.FC<SnowEffectProps> = ({ count = 60 }) => {
    // Framer Motion serializes motion styles differently on server vs client; render only after mount.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const snowflakes = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: seededRandom(i * 11 + 1) * 4 + 1,
            left: `${seededRandom(i * 13 + 2) * 100}%`,
            duration: seededRandom(i * 17 + 3) * 10 + 10, // 10s to 20s
            delay: seededRandom(i * 19 + 4) * 10,
            opacity: seededRandom(i * 23 + 5) * 0.5 + 0.2,
            blur: seededRandom(i * 29 + 6) * 2,
            drift: seededRandom(i * 31 + 7) * 50 - 25,
        }));
    }, [count]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: ['0vh', '110vh'],
                        opacity: [0, flake.opacity, flake.opacity, 0],
                        x: [0, flake.drift], // Subtle horizontal sway
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: 'absolute',
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        filter: `blur(${flake.blur}px)`,
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
                    }}
                />
            ))}
        </div>
    );
};

export default SnowEffect;
