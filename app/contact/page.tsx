import Bottom from "@/components/home/Bottom";
import Contact from "@/components/layouts/Contact";
import FooterCTA from "@/components/layouts/FooterCTA";

export default function ContactPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen bg-zinc-950">
      <section >
        <Contact isDarkMode={isDarkMode} />
      </section>
      <div className="mt-[1vh] md:mt-[2vh] bg-zinc-950">
        <Bottom >
          <FooterCTA />
        </Bottom>
      </div>
    </main>
  )
}