import Portfolio from "@/components/portfolio/Portfolio";
import SmoothScroll from "@/components/SmoothScroll";

export default function PortfolioPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen bg-zinc-950">
      <SmoothScroll />
      <Portfolio />
    </main>
  )
}