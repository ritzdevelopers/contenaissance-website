import Bottom from "@/components/home/Bottom";
import Contact from "@/components/layouts/Contact";
import FooterCTA from "@/components/layouts/FooterCTA";
import Portfolio from "@/components/portfolio/Portfolio";

export default function PortfolioPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen bg-zinc-950">
      <Portfolio />
      <Bottom >
        <FooterCTA />
        {/* <Contact isDarkMode={isDarkMode} /> */}
      </Bottom>
    </main>
  )
}