
/// <reference types="react" />
import React, { JSX } from "react";
import { getAssetUrl } from "@/lib/assetUrl";

const CreativePortraits = () => {
    return (
        <section className="relative min-h-[110vh] md:min-h-[120vh] lg:min-h-[140vh] bg-black overflow-hidden flex items-center  ">

            {/* Gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#5A3917] via-black to-black"></div>

            <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 mx-auto px-6 sm:px-10 md:px-20 pb-52 md:pb-72 lg:pb-80 w-full">

                {/* Heading */}
                <h1 className="text-white font-normal leading-[0.9] text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight">
                    Creative
                    <br />
                    {/* @ts-ignore - JSX element is correctly supported */}
                    <span className="font-medium relative left-20 md:left-48 lg:left-64 z-10">
                        Portraits
                    {/* @ts-ignore - JSX element is correctly supported */}
                    </span>
                </h1>

                {/* Description */}
                <p className="max-w-[320px] text-gray-300 text-sm sm:text-base md:text-md md:mt-12">
                    In our studio, professional photographers models collaborate and take
                    special photos.
                </p>

                {/* Image 1 */}
                <img
                    src={getAssetUrl("assets/image/portfolio1.png")}
                    className="absolute top-[58%] sm:top-[56%] md:top-72 left-4 sm:left-10 md:left-20 
                     w-28 sm:w-36 md:w-52 lg:w-60 shadow-2xl rotate-[-8deg]"
                />

                {/* Image 2 */}
                <img
                    src={getAssetUrl("assets/image/portfolio2.png")}
                    className="absolute top-[64%] sm:top-[62%] md:top-80 left-[37%] sm:left-[34%] md:left-[29%] 
                    w-28 sm:w-36 md:w-52 lg:w-60 shadow-2xl rotate-[-8deg]"
                />

                {/* Image 3 */}
                <img
                    src={getAssetUrl("assets/image/portfolio3.png")}
                    className="absolute top-[46%] sm:top-[44%] md:top-44 left-[66%] sm:left-[62%] md:left-[50%] 
          w-28 sm:w-36 md:w-52 lg:w-60 shadow-2xl rotate-[-9deg]"
                />

                {/* Image 4 (hidden on very small screens) */}
                <img
                    src={getAssetUrl("assets/image/portfolio4.png")}
                    className="hidden sm:block absolute top-[74%] md:top-[50%] right-4 sm:right-10 md:right-20 
          w-28 sm:w-36 md:w-52 lg:w-60 shadow-2xl rotate-[-8deg]"
                />

            </div>
        </section>
    );
};

export default CreativePortraits;

