"use client"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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
                        src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773733459/2_1_1_1_kpcs3b.png"
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
                        href="#services"
                        className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition font-bold"
                    >
                        Explore AI
                    </Link>
                </div>
            </div>

            {/* Footer Links */}
            {/* <div className="relative z-10 grid grid-cols-3 gap-4 sm:gap-8 mt-6 md:mt-8 mb-6 text-center text-[10px] sm:text-xs max-w-4xl mx-auto w-full">

                <div>
                    <p className="text-white/90 font-bold tracking-widest mb-2 text-[9px] sm:text-xs">NAVIGATION</p>
                    <ul className="space-y-1">
                        <li><a href="#hero" className="hover:text-white/70">Home</a></li>
                        <li><a href="#genai" className="hover:text-white/70">Services</a></li>
                        <li><a href="#aiquote" className="hover:text-white/70">Portfolio</a></li>
                        <li><a href="#reels" className="hover:text-white/70">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <p className="text-white/90 font-bold tracking-widest mb-2 text-[9px] sm:text-xs">RESOURCES</p>
                    <ul className="space-y-1">
                        <li><a href="#blog" className="hover:text-white/70">Blog</a></li>
                        <li><a href="#tutorials" className="hover:text-white/70">Tutorials</a></li>
                        <li><a href="#guides" className="hover:text-white/70">Guides</a></li>
                        <li><a href="#support" className="hover:text-white/70">Support</a></li>
                    </ul>
                </div>

                <div>
                    <p className="text-white/90 font-bold tracking-widest mb-2 text-[9px] sm:text-xs">CONTACT</p>
                    <ul className="space-y-1">
                        <li><a href="#contact" className="hover:text-white/70">Contact Us</a></li>
                        <li><a href="#about" className="hover:text-white/70">About</a></li>
                        <li><a href="#careers" className="hover:text-white/70">Careers</a></li>
                    </ul>
                </div>

            </div> */}

        </section>
    )
}