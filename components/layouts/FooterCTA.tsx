import Link from "next/link";

export default function FooterCTA() {
    return (
        <section className="contact-section absolute top-[40%] md:top-[49%] left-0 w-full min-h-screen px-4 sm:px-8 md:px-16 z-[100] mt-10 md:mt-8">

            {/* Top CTA */}
            <div className="relative z-[100] flex flex-col items-center text-center px-4 sm:px-6">

                <button className="flex items-center group outline-none">
                    <img
                        src="https://res.cloudinary.com/dbpx7aobb/image/upload/v1773663948/Mask_group_33_lkwukz.png"
                        alt="Contenaissance Logo"
                        className="h-[40px] sm:h-[56px] md:h-[5rem] w-auto object-contain transition-all duration-700 group-hover:scale-105"
                    />
                </button>

                {/* Heading */}
                <h1 className="italic font-serif text-xl sm:text-2xl md:text-3xl font-light leading-tight max-w-2xl mt-0 md:mt-2">
                    Creating Wonders With AI
                </h1>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-2 md:mt-2 text-sm">

                    <Link
                        href="/contact"
                        className="px-4 py-1 rounded-full border border-white/70 hover:bg-white hover:text-black transition font-bold"
                    >
                        Contact Us
                    </Link>

                    <Link
                        href="#services"
                        className="px-4 py-1 rounded-full bg-white text-black hover:bg-gray-200 transition font-bold"
                    >
                        Explore AI
                    </Link>

                </div>
            </div>

            {/* Footer Links */}
            <div className="relative z-10 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-2 md:mt-3 mb-4 text-center text-xs max-w-4xl mx-auto">

                {/* Navigation */}
                <div>
                    <p className="text-white/90 font-bold tracking-widest mb-1 md:mb-1">NAVIGATION</p>
                    <ul className="space-y-0 md:space-y-0">
                        <li><a href="#hero" className="hover:text-white/70">Home</a></li>
                        <li><a href="#genai" className="hover:text-white/70">Services</a></li>
                        <li><a href="#aiquote" className="hover:text-white/70">Portfolio</a></li>
                        <li><a href="#reels" className="hover:text-white/70">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <p className="text-white/90 font-bold tracking-widest  mb-1 md:mb-1">RESOURCES</p>
                    <ul className="space-y-0 md:space-y-0">
                        <li><a href="#blog" className="hover:text-white/70">Blog</a></li>
                        <li><a href="#tutorials" className="hover:text-white/70">Tutorials</a></li>
                        <li><a href="#guides" className="hover:text-white/70">Guides</a></li>
                        <li><a href="#support" className="hover:text-white/70">Support</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <p className="text-white/90 font-bold tracking-widest mb-1 md:mb-1">CONTACT</p>
                    <ul className="space-y-0 md:space-y-0">
                        <li><a href="#contact" className="hover:text-white/70">Contact Us</a></li>
                        <li><a href="#about" className="hover:text-white/70">About</a></li>
                        <li><a href="#careers" className="hover:text-white/70">Careers</a></li>
                    </ul>
                </div>

            </div>

        </section>
    )
}