import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { ContactForm } from "./form";
import { MapPin, Phone, Mail } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { FadeUp, TextReveal, MagneticElement } from "@/components/animations";
import { ShieldWatermark } from "@/components/ShieldWatermark";

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
  
  const phone = settings?.contact?.phone || "+221 77 301 08 38 / +221 33 814 04 35";
  const email = settings?.contact?.email || "contact@nobtech.fr";
  const address = settings?.contact?.address || "Route de l'Aéroport LSS lot N° 79, Dakar Sénégal";

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
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <h1 className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  {title} :{" "}
                  <span className="text-[#0284C7] dark:text-sky-400">
                    Concevons Votre Projet IT
                  </span>
                </h1>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>

        <Section className="py-16 md:py-24 bg-slate-50 dark:bg-[#020617]">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <FadeUp className="lg:col-span-1 space-y-8">
                <div>
                  <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 font-extrabold text-[#0284C7] dark:text-sky-400">
                    CONTACT DIRECT &bull; DAKAR
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
                    Nos coordonnées
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    N&apos;hésitez pas à nous contacter directement ou à renseigner le formulaire ci-contre. Nos ingénieurs vous répondent avec réactivité.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=QG3J%2BHP+Dakar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#0b1329] hover:bg-slate-50/90 dark:hover:bg-[#0f1d3d] border border-slate-200/80 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-500/50 transition-all shadow-sm group cursor-pointer"
                    title="Ouvrir la localisation sur Google Maps (QG3J+HP Dakar)"
                  >
                    <div className="w-11 h-11 bg-cyan-50 dark:bg-cyan-950/60 group-hover:bg-cyan-100/70 dark:group-hover:bg-cyan-900/60 rounded-lg flex items-center justify-center shrink-0 border border-cyan-100 dark:border-cyan-800/80 group-hover:border-cyan-200 transition-colors">
                      <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                          Siège &amp; Bureaux
                        </span>
                        <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 group-hover:underline inline-flex items-center gap-0.5">
                          Google Maps &rarr;
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed group-hover:text-cyan-950 dark:group-hover:text-white transition-colors">{address}</p>
                    </div>
                  </a>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                    <div className="w-11 h-11 bg-cyan-50 dark:bg-cyan-950/60 rounded-lg flex items-center justify-center shrink-0 border border-cyan-100 dark:border-cyan-800/80">
                      <Phone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                        Ligne Téléphonique
                      </span>
                      <div className="flex flex-col space-y-1">
                        {phone.split('/').map((p: string, i: number) => (
                          <a key={i} href={`tel:${p.trim().replace(/\s+/g, '')}`} className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                            {p.trim()}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <MagneticElement>
                      <div className="w-12 h-12 bg-white dark:bg-[#0b1329] rounded-sm shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-cyan-500" />
                      </div>
                    </MagneticElement>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h4>
                      <a href={`mailto:${email}`} className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors">{email}</a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2} className="lg:col-span-2">
                <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  <ShieldWatermark position="top-right" size={240} opacity={0.07} />
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
