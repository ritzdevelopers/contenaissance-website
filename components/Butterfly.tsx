  "use client"

  export default function Butterfly() {
    return (
      <div className="butterfly fixed left-1/2 top-[55%] md:top-[56%] lg:top-[57%] -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
        <div className="relative h-auto w-76 max-w-[min(94vw,26rem)] sm:w-76 md:w-88 lg:w-[30rem]">
          <img
            className="butterfly-primary relative z-10 block h-auto w-full object-contain"
            src="/assets/Video/16buttterfly.gif"
            alt="Bird animation"
          />
          <div className="butterfly-footer-wrap pointer-events-none absolute inset-0 z-[11] flex items-center justify-center opacity-0">
            <img
              className="butterfly-footer block h-auto max-h-full w-full object-contain"
              src="/assets/image/footer-butterfly.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  }