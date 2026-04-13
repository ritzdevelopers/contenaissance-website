  "use client"
  import { getAssetUrl } from "@/lib/assetUrl";

  export default function Butterfly() {
    return (
      <div className="butterfly fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none  ">
        <img
          src={getAssetUrl("assets/image/new1.gif")}
          className="h-auto w-65 max-w-[min(92vw,22rem)] object-contain sm:w-64 md:w-75 lg:w-80 xl:w-96 2xl:w-100"
          alt="Bird animation"
        />
        
      </div>
    )
  }