import Bottom from "@/components/home/Bottom";
import FooterCTA from "@/components/layouts/FooterCTA";
import Service from "@/components/services/Services";

export default function ServicesPage() {
  const isDarkMode = false;
  return (
    <main className="min-h-screen">
      <Service isDarkMode={isDarkMode} />
      <Bottom >
        <FooterCTA />
        {/* <Contact isDarkMode={isDarkMode} /> */}
      </Bottom>
    </main>
  )
}