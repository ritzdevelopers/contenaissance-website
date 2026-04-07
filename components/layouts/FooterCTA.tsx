"use client"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getAssetUrl } from "@/lib/assetUrl";

export default function FooterCTA() {
    const router = useRouter();


    // const handleContactClick = () => {
    //     const contactSection = document.getElementById("contact");

    //     if (contactSection) {
    //         contactSection.scrollIntoView({ behavior: "smooth" });
    //     } else {
    //         // fallback if user is on another page
    //         router.push("/#contact");
    //     }
    // };
    return (
        <section  className="contact-section absolute left-0 w-full min-h-screen px-4 sm:px-8 md:px-16 z-[100] flex flex-col justify-center pt-60 md:pt-65  pointer-events-auto">

            {/* Top CTA */}
            <div className="relative z-[100] flex flex-col items-center text-center px-4 sm:px-6">

                <button
                    onClick={() => router.push("/")}
                    className="flex items-center group outline-none cursor-pointer">

                    <img
                        src={getAssetUrl("assets/image/logo.png")}
                        alt="Contenaissance Logo"
                        className="h-[36px] sm:h-[48px] md:h-[5rem] cursor-pointer w-auto object-contain transition-all duration-700 group-hover:scale-105"
                    />
                </button>

                {/* Heading */}
                <h1 className="mt-0 md:mt-5 italic font-serif text-lg sm:text-2xl md:text-3xl font-light leading-tight max-w-2xl mt-1 md:mt-2 text-white">
                    Creating Wonders With AI
                </h1>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mt-3 md:mt-4 text-xs sm:text-sm">
                    <Link
                        href="/contact"
                        
                        className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition font-bold"
                    >
                        Contact Us
                    </Link>
                    {/* <button
                        onClick={handleContactClick}
                        className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition font-bold cursor-pointer"
                    >
                        Contact Us
                    </button> */}
                    <Link
                        href="/services"
                        className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition font-bold"
                    >
                        Explore AI
                    </Link>
                </div>
            </div>

           
           

        </section>
    )
}