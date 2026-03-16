"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MosaicProps { isDarkMode?: boolean; }

/* =========================
   Scroll Weight Heading
========================= */
function ScrollWeightHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  // Animate font weight 200 → 900
  const fontWeight = useTransform(scrollYProgress, [0, 1], [100, 900]);

  // Optional small scale for premium feel
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.p
      ref={ref}
      style={{ fontWeight, scale }}
      className="text-6xl text-white uppercase "
    >
      {children}
    </motion.p>
  );
}

/* =========================
   Sliding Row Component
========================= */
function SlidingRow({
  children,
  direction = 1,
}: {
  children: React.ReactNode;
  direction?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const moveDistance = 120; // increase for stronger effect

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [direction * -moveDistance, direction * moveDistance]
  );

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ x }}
        className="flex gap-4 w-max will-change-transform"
      >
        <div className="flex gap-4">{children}</div>
        <div className="flex gap-4">{children}</div>
        <div className="flex gap-4">{children}</div>
      </motion.div>
    </div>
  );
}

/* =========================
   Main Section
========================= */
export default function Mosaic({ isDarkMode }: MosaicProps) {
  return (
    <main className="bg-zinc-950 min-h-screen p-4 space-y-4 overflow-x-hidden">

      {/* ROW 1 */}
      <SlidingRow direction={-1}>
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053124/h2_f5kt1b.jpg" />
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053124/h1_wj1sgy.jpg" />
        <TileText>
          <ScrollWeightHeading>ÉDITION</ScrollWeightHeading>
        </TileText>
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053124/h3_knswia.jpg" />
      </SlidingRow>

      {/* ROW 2 */}
      <SlidingRow direction={1}>
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053124/h6_wstn38.jpg" />
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053124/h5_aqew4y.jpg" />
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053124/h4_gjqgbg.jpg" />
        <TileText>
          <ScrollWeightHeading>LIMITÉE</ScrollWeightHeading>
        </TileText>
      </SlidingRow>

      {/* ROW 3 */}
      <SlidingRow direction={-1}>
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053125/h12_wdw5ea.jpg" />
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053125/h8_lfwloh.jpg" />
        <TileText>
          <ScrollWeightHeading>1500</ScrollWeightHeading>
        </TileText>
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053125/h9_vu1vfx.jpg" />
      </SlidingRow>

      {/* ROW 4 */}
      <SlidingRow direction={1}>
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053125/h7_ou4go8.jpg" />
        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053125/h11_lehnu9.jpg" />

        <TileImage src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773053125/h10_e6ax7u.jpg" />
        <TileText>
          <ScrollWeightHeading>PIÈCES</ScrollWeightHeading>
        </TileText>
      </SlidingRow>

    </main>
  );
}

/* =========================
   Reusable Tiles
========================= */

function TileImage({ src }: { src: string }) {
  return (
    <div className="w-auto h-auto overflow-hidden flex-shrink-0">
      <img
        src={src}
        alt=""
        className="w-auto h-auto object-cover"
      />
    </div>
  );
}

function TileText({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[320px] h-[140px] flex items-center justify-center flex-shrink-0">
      {children}
    </div>
  );
}