import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ValueProposition } from "@/components/ValueProposition";
import { Expertises } from "@/components/expertises";
import { Testimonials } from "@/components/testimonials";
import { Clients } from "@/components/clients";
import { CTA } from "@/components/cta";
import { getPayloadClient } from "@/lib/payload";

export default async function Home() {
  const payload = await getPayloadClient();

  const [servicesRes, testimonialsRes, clientsRes] = await Promise.all([
    payload.find({ collection: 'services' }),
    payload.find({ collection: 'testimonials' }),
    payload.find({ collection: 'clients' })
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Clients clients={clientsRes.docs} />
        <ValueProposition />
        <Expertises services={servicesRes.docs} />
        <Testimonials testimonials={testimonialsRes.docs} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';  
