"use client"

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pointer-events-none h-[110vh] sm:h-[90vh] xs:h-[70vh]">
      <video
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
          src="/assets/Video/Start.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  )
}