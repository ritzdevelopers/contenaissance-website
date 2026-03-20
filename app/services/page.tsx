import Service from "@/components/services/Services";

export default function ServicesPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen">
      <Service isDarkMode={isDarkMode} />
    </main>
  )
}