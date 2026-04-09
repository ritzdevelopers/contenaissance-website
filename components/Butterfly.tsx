  "use client"
  import { getAssetUrl } from "@/lib/assetUrl";

  export default function Butterfly() {
    return (
      <div className="butterfly fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none  ">
        <img
          src={getAssetUrl("assets/image/new1.gif")}
          className="w-sm h-auto object-contain"
          alt="Bird animation"
        />
        
      </div>
    )
  }