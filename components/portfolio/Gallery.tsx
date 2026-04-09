"use client";

/// <reference types="react" />
import React, { JSX } from "react";
import { PiImagesSquareBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";

const Gallery = () => {
  const images = [
    "/assets/portfolio/G1.jpg",
    "/assets/portfolio/G2.jpg",
    "/assets/portfolio/G3.jpg",
    "/assets/portfolio/G4.jpg",
    "/assets/portfolio/G5.jpg",
    "/assets/portfolio/G6.jpg",
    "/assets/portfolio/G7.png",
    "/assets/portfolio/G8.jpg",
  ];

  return (
    <section className="bg-zinc-950 text-white py-16 md:py-20 px-4 sm:px-6 md:px-10">
      
      {/* Heading */}
      <div className="text-center mx-auto mb-12 md:mb-16 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2rem,10vw,6rem)] font-bold tracking-tighter leading-none">
          My {/* @ts-ignore - JSX element is correctly supported */}
          <span className="font-semibold">Portfolio</span>
          {/* @ts-ignore - JSX element is correctly supported */}
           Gallery
        </h1>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. At scelerisque aenean platea
          sem magna. Sagittis risus lobortis egestas morbi dolor fusce sapien.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[280px]">

        {/* Row 1 */}
        <div className="col-span-12 md:col-span-5 overflow-hidden">
          <img
            src={images[0]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        <div className="col-span-6 md:col-span-4 overflow-hidden">
          <img
            src={images[1]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        <div className="col-span-6 md:col-span-3 md:row-span-2 overflow-hidden">
          <img
            src={images[2]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        {/* Row 2 */}
        <div className="col-span-12 md:col-span-4 overflow-hidden">
          <img
            src={images[3]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        <div className="col-span-12 md:col-span-5 overflow-hidden">
          <img
            src={images[4]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        <div className="col-span-6 md:col-span-4 overflow-hidden">
          <img
            src={images[5]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        {/* Row 3 */}
        <div className="col-span-6 md:col-span-3 md:row-span-2 overflow-hidden">
          <img
            src={images[6]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        <div className="col-span-12 md:col-span-5 overflow-hidden">
          <img
            src={images[7]}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-150"
          />
        </div>

        {/* Stats Section */}
        <div className="col-span-12 md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-center gap-6 p-4 md:p-6">

          <div className="flex items-center gap-4">
            <PiImagesSquareBold size={35} />
            <div>
              <h3 className="text-3xl md:text-6xl font-medium">2500+</h3>
              <p className="text-gray-400 text-sm md:text-xl">Satisfied Clients</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TbUsers className="text-3xl md:text-4xl" />
            <div>
              <h3 className="text-3xl md:text-6xl font-medium">750m</h3>
              <p className="text-gray-400 text-sm md:text-xl">Pictures Captured</p>
            </div>
          </div>

        </div>

        {/* Content Section */}
        <div className="col-span-12 md:col-span-5 p-4 md:p-8 flex flex-col justify-center">
          <p className="text-gray-400 text-sm mb-6 leading-7">
            Lorem ipsum dolor sit amet consectetur. Duis maecenas enim id arcu
            parturient in faucibus venenatis. Risus aenean penatibus vivamus
            habitasse erat dis.
          </p>

          <button className="bg-white text-black px-6 py-2 rounded-full font-medium w-fit hover:bg-gray-200 transition">
            Full Portfolio
          </button>
        </div>

      </div>
    </section>
  );
};

export default Gallery;