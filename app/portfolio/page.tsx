import Bottom from "@/components/home/Bottom";
import FooterCTA from "@/components/layouts/FooterCTA";
import Portfolio from "@/components/portfolio/Portfolio";
import SmoothScroll from "@/components/SmoothScroll";

export default function PortfolioPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen bg-zinc-950">
      <SmoothScroll />
      <Portfolio />
      <Bottom >
        <FooterCTA />
      </Bottom>
    </main>
  )
}