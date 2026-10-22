import React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/layout";
import { ContactForm } from "./form";
import { MapPin, Phone, Mail, MessageSquare, Clock, ShieldCheck, CalendarCheck, ArrowRight } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { FadeUp, TextReveal } from "@/components/animations";
import { ShieldWatermark } from "@/components/ShieldWatermark";

export const metadata = {
  title: 'Contact & Devis | NOB TECHNOLOGIES',
  description: 'Contactez NOB TECHNOLOGIES à Dakar pour vos projets de transformation digitale, réseaux, ERP et cybersécurité. Réponse sous 24h.',
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
  } catch {
    // Fallback if db is empty during build
  }
  
  const phone = settings?.contact?.phone || "+221 77 301 08 38 / +221 33 814 04 35";
  const email = settings?.contact?.email || "contact@nobtech.fr";
  const address = settings?.contact?.address || "Route de l'Aéroport LSS lot N° 79, Dakar Sénégal";

  let title = "Contactez-nous";
  let subtitle = "Une question technique, un cahier des charges ou une demande d'intervention ? Notre équipe d'ingénieurs à Dakar vous répond sous 24h.";

  if (type === 'quote') {
    title = "Demander un devis";
    subtitle = "Détaillez votre projet et vos besoins. Nos ingénieurs vous transmettent une proposition technique et commerciale chiffrée sous 24h.";
  } else if (type === 'engineer') {
    title = "Parler à un ingénieur";
    subtitle = "Une problématique d'infrastructure ou de sécurité ? Échangez directement avec nos ingénieurs certifiés pour cadrer votre architecture.";
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <h1 className="text-white mb-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  {title} :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    Concevons Votre Projet IT
                  </span>
                </h1>
              </TextReveal>
              <FadeUp delay={0.15}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed text-pretty">
                  {subtitle}
                </p>
              </FadeUp>

              {/* Quick Request Mode Switcher */}
              <FadeUp delay={0.25}>
                <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <Link
                    href="/contact?type=quote"
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      type === 'quote'
                        ? 'bg-[#00D4FF] text-[#020617] shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Demander un devis
                  </Link>
                  <Link
                    href="/contact?type=engineer"
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      type === 'engineer'
                        ? 'bg-[#00D4FF] text-[#020617] shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Parler à un ingénieur
                  </Link>
                  <Link
                    href="/contact"
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      type !== 'quote' && type !== 'engineer'
                        ? 'bg-[#00D4FF] text-[#020617] shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Contact général
                  </Link>
                  <Link
                    href="/reserver-audit"
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 transition-all inline-flex items-center gap-1.5"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Audit sur site</span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>

        <Section className="py-14 md:py-20 bg-slate-50 dark:bg-[#020617]">
          <Container>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Unified Direct Channels (5 cols) */}
              <FadeUp className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-corporate-elevated space-y-5">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Coordonnées directes
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-1 text-pretty">
                      Joignez directement notre bureau d&apos;études ou écrivez-nous via WhatsApp pour une prise en charge immédiate.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {/* Card 1: Téléphone & Standard */}
                    <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/20">
                        <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                          Lignes Téléphoniques (Dakar)
                        </span>
                        <div className="flex flex-col space-y-1">
                          {phone.split('/').map((p: string, i: number) => (
                            <a
                              key={i}
                              href={`tel:${p.trim().replace(/\s+/g, '')}`}
                              className="text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            >
                              {p.trim()}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: WhatsApp Ingénieur Direct */}
                    <a
                      href="https://wa.me/221773010838?text=Bonjour%20NOBTECH,%20je%20souhaite%20%C3%A9changer%20avec%20un%20ing%C3%A9nieur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/60 transition-all group"
                    >
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                        <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            WhatsApp Entreprise
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                            Démarrer <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          +221 77 301 08 38
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Échange direct avec un ingénieur conseil
                        </p>
                      </div>
                    </a>

                    {/* Card 3: Email Officiel */}
                    <a
                      href={`mailto:${email}`}
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400/60 transition-all group"
                    >
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/20">
                        <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                          Courriel Officiel &amp; Appels d&apos;Offres
                        </span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-0.5">
                          {email}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Envoi de cahiers des charges et demandes de cotation
                        </p>
                      </div>
                    </a>

                    {/* Card 4: Adresse & Google Maps */}
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=QG3J%2BHP+Dakar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400/60 transition-all group"
                      title="Ouvrir la localisation sur Google Maps (QG3J+HP Dakar)"
                    >
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/20">
                        <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Siège &amp; Bureaux
                          </span>
                          <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 group-hover:underline">
                            Google Maps &rarr;
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                          {address}
                        </p>
                      </div>
                    </a>
                  </div>

                  {/* Service Commitments */}
                  <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>Devis sous 24h ouvrées</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Confidentialité NDA</span>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Right Column: Interactive Form (7 cols) */}
              <FadeUp delay={0.15} className="lg:col-span-7">
                <div className="bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-corporate-elevated relative overflow-hidden">
                  <ShieldWatermark position="top-right" size={220} opacity={0.05} />
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
