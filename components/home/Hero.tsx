"use client"

import { getAssetUrl } from "@/lib/assetUrl"

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pointer-events-none h-[60vh] sm:h-[90vh] xs:h-[70vh] bg-zinc-950">
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={(e) => e.currentTarget.play()}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source
          src="/assets/Video/Start-1.mp4"
          type="video/mp4"
        />
      </video> */}
      {/* <video
        id="video"
        crossOrigin="anonymous"
        playsInline
        autoPlay
        loop
        muted
        preload="auto"
        className=""
      >
        <source src="/assets/Video/light.mp4" type="video/mp4" />
      </video> */}
      <img
        src={getAssetUrl("assets/image/home.png")}
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover will-change-transform bg-zinc-950"
      />
      <div className="absolute inset-0 pointer-events-none 
bg-gradient-to-t 
from-zinc-950/100 
via-zinc-950/30 
to-transparent" />
    </section>
  )
}

