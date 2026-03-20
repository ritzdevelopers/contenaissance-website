import Bottom from "@/components/home/Bottom";
import Contact from "@/components/layouts/Contact";
import FooterCTA from "@/components/layouts/FooterCTA";

export default function ContactPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen">
      <Contact isDarkMode={isDarkMode} />
      <Bottom >
        <FooterCTA />
      </Bottom>
    </main>
  )
}