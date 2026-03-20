import Bottom from "@/components/home/Bottom";
import Contact from "@/components/layouts/Contact";
import FooterCTA from "@/components/layouts/FooterCTA";

export default function ContactPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen">
      <section >
        <Contact isDarkMode={isDarkMode} />
      </section>
      <div className="mt-[100vh] md:mt-[120vh]">
        <Bottom >
          <FooterCTA />
        </Bottom>
      </div>
    </main>
  )
}