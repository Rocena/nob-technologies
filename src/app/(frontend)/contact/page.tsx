import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { ContactForm } from "./form";
import { MapPin, Phone, Mail } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { FadeUp, TextReveal, MagneticElement } from "@/components/animations";

export const metadata = {
  title: 'Contact | NOB TECHNOLOGIES',
  description: 'Contactez NOB TECHNOLOGIES pour vos projets de transformation digitale, réseaux et cybersécurité.',
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; service?: string }>;
}) {
  const { type = 'contact', service: initialService } = await searchParams;
  let settings: any = null;
  try {
    const payload = await getPayloadClient();
    settings = await payload.findGlobal({ slug: 'site-settings' });
  } catch (err) {
    // Fallback if db is empty during build
  }
  
  const phone = settings?.contact?.phone || "+221 77 310 83 18 / +221 33 814 24 55";
  const email = settings?.contact?.email || "contact@nobtech.fr";
  const address = settings?.contact?.address || "Azura de l’Aéroport, 1SS lot N° 79, Dakar Sénégal";

  let title = "Contactez-nous";
  let subtitle = "Une question ? Un projet ? Notre équipe d'experts est à votre disposition pour vous accompagner.";

  if (type === 'quote') {
    title = "Demander un devis";
    subtitle = "Détaillez votre projet et vos besoins. Nos experts vous feront une proposition technique et commerciale sur-mesure.";
  } else if (type === 'engineer') {
    title = "Parler à un ingénieur";
    subtitle = "Une problématique technique complexe ? Échangez directement avec nos ingénieurs certifiés pour trouver la meilleure architecture.";
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <Container className="relative z-10">
            <TextReveal>
              <Heading level={1} className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {title}
              </Heading>
            </TextReveal>
            <FadeUp delay={0.2}>
              <Text className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                {subtitle}
              </Text>
            </FadeUp>
          </Container>
        </Section>

        <Section className="py-12 md:py-16 lg:py-20 bg-slate-50">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <FadeUp className="lg:col-span-1 space-y-10">
                <div>
                  <Heading level={3} className="mb-4 text-2xl">Nos coordonnées</Heading>
                  <Text className="text-slate-600 mb-8 leading-relaxed">
                    N'hésitez pas à nous contacter directement ou à utiliser le formulaire. Nous vous répondrons dans les plus brefs délais.
                  </Text>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <MagneticElement>
                      <div className="w-12 h-12 bg-white rounded-sm shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                    </MagneticElement>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Adresse</h4>
                      <p className="text-slate-600 leading-relaxed">{address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <MagneticElement>
                      <div className="w-12 h-12 bg-white rounded-sm shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                    </MagneticElement>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Téléphone</h4>
                      <div className="flex flex-col space-y-1">
                        {phone.split('/').map((p: string, i: number) => (
                          <a key={i} href={`tel:${p.trim().replace(/\s+/g, '')}`} className="text-slate-600 hover:text-accent transition-colors">
                            {p.trim()}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <MagneticElement>
                      <div className="w-12 h-12 bg-white rounded-sm shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                    </MagneticElement>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                      <a href={`mailto:${email}`} className="text-slate-600 hover:text-accent transition-colors">{email}</a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2} className="lg:col-span-2">
                <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
                  <ContactForm formType={type} initialService={initialService} />
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic';
