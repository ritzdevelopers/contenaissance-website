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
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source
          src="https://res.cloudinary.com/dbpx7aobb/video/upload/q_auto,f_auto/v1773056668/Start_yqxfut.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  )
}