import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Expertises } from "@/components/expertises";
import { Testimonials } from "@/components/testimonials";
import { Clients } from "@/components/clients";
import { CTA } from "@/components/cta";
import { getPayloadClient } from "@/lib/payload";

export default async function Home() {
  let servicesDocs: any[] = [];
  let testimonialsDocs: any[] = [];
  let clientsDocs: any[] = [];

  try {
    const payload = await getPayloadClient();
    const [servicesRes, testimonialsRes, clientsRes] = await Promise.all([
      payload.find({ collection: 'services' }),
      payload.find({ collection: 'testimonials' }),
      payload.find({ collection: 'clients' })
    ]);
    servicesDocs = servicesRes?.docs || [];
    testimonialsDocs = testimonialsRes?.docs || [];
    clientsDocs = clientsRes?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Clients clients={clientsDocs} />
        <Expertises services={servicesDocs} />
        <Testimonials testimonials={testimonialsDocs} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';  
