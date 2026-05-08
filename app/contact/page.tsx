import Contact from "@/components/layouts/Contact";
import SmoothScroll from "@/components/SmoothScroll";

export default function ContactPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen bg-zinc-950">
      <SmoothScroll />
      <section >
        <Contact isDarkMode={isDarkMode} />
      </section>
    </main>
  )
}