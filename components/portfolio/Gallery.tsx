"use client";

import React from "react";
import { PiImagesSquareBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1767431199061-3237ddd5de9f?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1772630204917-5e649dcb0d68?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1624700636207-a02b569c9457?w=600&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1771589559652-5db731a039ea?w=600&auto=format&fit=crop&q=60",
  ];

  return (
    <section className="bg-black text-white py-16 md:py-20 px-4 sm:px-6 md:px-10">
      
      {/* Heading */}
      <div className="text-center mx-auto mb-12 md:mb-16 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2rem,10vw,6rem)] font-bold tracking-tighter leading-none">
          My <span className="font-semibold">Portfolio</span> Gallery
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