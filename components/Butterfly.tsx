"use client"

export default function Butterfly() {
  return (
    <div className="butterfly fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-0 ">
      <img
        src="/assets/image/butterfly1.gif"
        className="w-sm h-auto object-contain will-change-transform"

        alt="Bird animation"
      />
    </div>
  )
}