import Contact from "@/components/layouts/Contact";

export default function ContactPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen">
      <Contact isDarkMode={isDarkMode} />
    </main>
  )
}