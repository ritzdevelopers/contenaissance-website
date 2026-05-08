import Service from "@/components/services/Services";
import SmoothScroll from "@/components/SmoothScroll";

export default function ServicesPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen bg-zinc-950">
      <SmoothScroll />
      <Service isDarkMode={isDarkMode} />
    </main>
  )
}