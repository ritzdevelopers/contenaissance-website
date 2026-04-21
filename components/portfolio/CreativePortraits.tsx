
/// <reference types="react" />
import React, { JSX } from "react";
import { getAssetUrl } from "@/lib/assetUrl";

const CreativePortraits = () => {
    return (
        <section className="relative min-h-[110vh] md:min-h-[120vh] lg:min-h-[140vh] bg-black overflow-hidden flex items-center  ">

            {/* Gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#5A3917] via-zinc-950 to-zinc-950"></div>

            <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 mx-auto px-6 sm:px-10 md:px-20 pb-52 md:pb-72 lg:pb-80 w-full">

                {/* Heading */}
                <h1 className="text-white font-normal leading-[0.9] text-5xl sm:text-7xl md:text-7xl lg:text-9xl tracking-tight">
                    Creative
                    <br />
                    {/* @ts-ignore - JSX element is correctly supported */}
                    <span className="font-medium relative left-20 md:left-48 lg:left-64 z-10">
                        Portraits
                        {/* @ts-ignore - JSX element is correctly supported */}
                    </span>
                </h1>

                {/* Description */}
                <p className="w-full md:w-[350px] lg:w-[480px] flex-shrink-0   
               text-gray-300 text-sm md:text-xs lg:text-base xl:text-base md:mt-6 lg:mt-12">
                    We bring together elite creators, advanced AI, and strategic direction to craft visual experiences that position brands at the top - not just in the market, but in perception.
                </p>

                {/* Image 1 */}
               <img
                    src={getAssetUrl("assets/image/portfolio1.png")}
                    className="creative-portraits-img creative-portraits-img-1 absolute top-[58%] md:top-[56%] lg:top-72 left-4 sm:left-10 md:left-20 w-28 sm:w-36 md:w-47 lg:w-48 xl:w-60 shadow-2xl rotate-[-8deg]"
                />

                {/* Image 2 */}
                <img
                    src={getAssetUrl("assets/image/portfolio2.png")}
                    className="creative-portraits-img creative-portraits-img-2 absolute top-[64%] md:top-[62%] lg:top-[62%] xl:top-80 left-[37%] md:left-[37%] lg:left-[29%] xl:left-[29%] 
                    w-28 sm:w-36 md:w-47 lg:w-48 xl:w-60 shadow-2xl rotate-[-8deg]"
                />

                {/* Image 3 */}
                <img
                    src={getAssetUrl("assets/image/portfolio3.png")}
                    className="creative-portraits-img creative-portraits-img-3 absolute top-[46%] sm:top-[44%] md:top-47 lg:top-48 xl:top-44 left-[66%] sm:left-[62%] lg:left-[48%] xl:left-[50%] w-28 sm:w-36 md:w-50 lg:w-54 xl:w-60 shadow-2xl rotate-[-9deg]"
                />

                {/* Image 4 (hidden on very small screens) */}
                <img
                    src={getAssetUrl("assets/image/portfolio4.png")}
                    className="creative-portraits-img creative-portraits-img-4 hidden lg:block absolute top-[74%] md:top-[50%] right-4 sm:right-10 md:right-20 w-28 sm:w-36 md:w-52 lg:w-52 xl:w-60 shadow-2xl rotate-[-8deg]"
                />  

            </div>
        </section>
    );
};

export default CreativePortraits;

