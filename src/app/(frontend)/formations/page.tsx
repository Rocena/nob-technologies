import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { getAllFormations } from "@/lib/formations";
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Clock,
  Calendar,
  Users,
  Award,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FormationOfferingsSection } from "@/components/formations/FormationOfferingsSection";
import { FormationVideoSection } from "@/components/formations/FormationVideoSection";
import { FormationApplyButton } from "@/components/FormationApplyButton";

export const metadata: Metadata = {
  title: "Formations Professionnelles & Préparation aux Certifications | NOB TECHNOLOGIES",
  description:
    "Cycles d'excellence et programmes intensifs pour ingénieurs et techniciens : Cisco CCNA/CCNP, Fortinet NSE, Sophos, Cybersécurité ISO 27001 et Automatisation IA.",
};

export default async function FormationsCatalogPage() {
  const formations = await getAllFormations();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Hero Section */}
        <Section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#020617] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

          <Container className="relative z-10 text-center">
            <TextReveal>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 text-balance">
                Formations Professionnelles :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Expertise Pratique &amp; Certifications Internationales
                </span>
              </h1>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
                Des cursus d&apos;ingénierie et de certification animés par nos experts en production à Dakar : Certificat International Cisco en cybersécurité, Microsoft Power BI &amp; Business Intelligence, certifications officielles (Cisco CCNA, Fortinet, Sophos) et cadres de conformité (NIST, ISO 27001).
              </p>
            </FadeUp>

            {/* Badges */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  11 Formations &amp; Modules Pratiques
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Rythme allégé : max 6h / semaine (soirs ou samedis)
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Labs pratiques sur matériel réel à Dakar
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Entreprises &bull; Bootcamps &bull; Particuliers
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Formations List Section */}
        <Section className="py-20 md:py-28 bg-slate-900 border-y border-white/10">
          <Container>
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  EXCELLENCE &bull; PROGRAMMES CERTIFIANTS
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Catalogue des Formations
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Consultez notre catalogue complet de formations opérationnelles, adaptées aux impératifs des entreprises et aux ambitions des professionnels de l&apos;IT au Sénégal.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {formations.map((track, idx) => (
                <FadeUp key={track.slug} delay={idx * 0.05}>
                  <div className="h-full bg-slate-950/80 rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 relative group">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-xs font-semibold font-mono text-cyan-400">
                          {track.category || "Formation IT"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            {track.duration}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors leading-snug">
                        {track.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
                        {track.shortDesc}
                      </p>

                      {/* Targeted Certifications Badges */}
                      {track.targetCertifications && track.targetCertifications.length > 0 && (
                        <div className="mb-5 pb-5 border-b border-white/10">
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Validation &amp; Certification visée :
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {track.targetCertifications.map((cert, i) => (
                              <Link
                                key={i}
                                href={`/formations/${track.slug}#candidature`}
                                title={`S'inscrire à la certification ${cert.title}`}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer"
                              >
                                {cert.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Partner Logos */}
                      {track.partnerLogos && track.partnerLogos.length > 0 && (
                        <div className="mb-6">
                          <span className="block text-[10px] font-mono uppercase text-slate-500 mb-2">Technologies &amp; Constructeurs :</span>
                          <div className="flex flex-wrap items-center gap-2">
                            {track.partnerLogos.map((p, i) => (
                              <div 
                                key={i} 
                                title={p.name}
                                className="h-7 px-2.5 py-0.5 bg-white rounded-md flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
                              >
                                <Image
                                  src={p.logo}
                                  alt={p.name}
                                  width={65}
                                  height={20}
                                  unoptimized
                                  className="h-4 max-h-4 w-auto object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tarification & Prix Barré (Marketing d'Attraction ou Tarif Standard si quota atteint) */}
                      {track.pricing && (
                        <div className="mb-4 p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-1.5">
                          {track.pricing.isPromoExpired ? (
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">
                                  Tarif Standard
                                </span>
                                <div className="text-base font-black text-white leading-tight">
                                  {track.pricing.publicPrice.toLocaleString("fr-FR")} <span className="text-xs font-bold text-cyan-400">FCFA</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 shrink-0">
                                Quota promo atteint ({track.pricing.launchSpots}/{track.pricing.launchSpots})
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] text-slate-500 line-through font-semibold">
                                    {track.pricing.publicPrice.toLocaleString("fr-FR")} FCFA
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                                    -{Math.round(((track.pricing.publicPrice - track.pricing.launchPrice) / track.pricing.publicPrice) * 100)}%
                                  </span>
                                </div>
                                <div className="text-base font-black text-white leading-tight mt-0.5">
                                  {track.pricing.launchPrice.toLocaleString("fr-FR")} <span className="text-xs font-bold text-cyan-400">FCFA</span>
                                </div>
                              </div>
                              {track.pricing.launchSpots && (
                                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 shrink-0">
                                  Plus que {track.pricing.remainingSpots ?? 3} places
                                </span>
                              )}
                            </div>
                          )}
                          {track.pricing.paymentPlan && (
                            <div className="pt-1.5 border-t border-white/5 text-[10px] text-slate-400 font-mono leading-tight">
                              <span className="text-cyan-400 font-semibold">Règlement :</span> {track.pricing.paymentPlan}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Grille de rémunération estimée au Sénégal */}
                      {track.career?.salarySenegal && (
                        <div className="mb-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                            <Banknote className="w-3.5 h-3.5 text-[#10E760]" />
                            <span className="text-slate-300">Salaire Sénégal :</span>
                          </span>
                          <span className="text-emerald-400 font-bold text-[11px]">
                            {track.career.salarySenegal.junior.split('à')[0].replace('FCFA / mois', '').replace('FCFA', '').replace('-', '').trim()} à {track.career.salarySenegal.senior.replace('+', '').trim()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-5 border-t border-white/10 space-y-2 mt-auto">
                      <FormationApplyButton
                        formationTitle={track.title}
                        formationSlug={track.slug}
                      >
                        Postuler
                      </FormationApplyButton>

                      <Link
                        href={`/formations/${track.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all shadow-2xs"
                      >
                        <span>Découvrir le programme ({track.duration})</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>
 
        {/* Live Video Session Showcase */}
        <Section className="py-20 md:py-28 bg-[#020617] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <Container className="relative z-10">
            <FormationVideoSection videoId="lx105w1dLLU" />
          </Container>
        </Section>

        {/* Formats d'Accompagnement : Entreprises, Bootcamps, Particuliers */}
        <Section className="py-20 md:py-28 bg-[#020617] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <Container className="relative z-10">
            <FormationOfferingsSection />
          </Container>
        </Section>

        {/* Methodology & Training Excellence */}
        <Section className="py-20 md:py-28 bg-white dark:bg-[#020617] text-slate-900 dark:text-white">
          <Container>
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  PÉDAGOGIE &bull; IMMERSION TECHNIQUE
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                  Une méthode d&apos;apprentissage axée sur le terrain
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base">
                  Nous privilégions l&apos;immersion technique directe pour transformer des connaissances théoriques en réflexes d&apos;ingénierie opérationnels.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Labs sur matériel physique
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Accès à des baies de brassage réelles, commutateurs Cisco Catalyst, appliances FortiGate et serveurs Dell PowerEdge pour des manipulations sans artifice.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Simulations Pearson VUE
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Entraînements chronométrés sous format d&apos;examen officiel, analyse approfondie des questions complexes et débriefing personnalisé avant chaque passage.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Mentoring d&apos;ingénieurs seniors
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Formateurs en activité sur des projets d&apos;envergure nationale et internationale, partageant retours d&apos;expérience réels et bonnes pratiques du marché.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Grille Comparative des Rémunérations Estimées au Sénégal */}
        <Section className="py-20 md:py-28 bg-[#020617] border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

          <Container className="relative z-10">
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
                <div className="inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-extrabold mb-3">
                  <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base font-mono tracking-tighter inline-flex items-center">
                    &gt;<span className="text-[#10E760] animate-pulse">_</span>
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    BAROMÈTRE SALARIAL &bull; SÉNÉGAL &amp; DAKAR
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Grille des Rémunérations Estimées :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    Métiers de l&apos;IT
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  Fourchettes indicatives des salaires mensuels nets constatés sur le marché sénégalais (Dakar) pour des profils certifiés constructeurs et immédiatement opérationnels.
                </p>
              </div>
            </FadeUp>

            {/* Table / Cards Showcase */}
            <FadeUp delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        <th className="py-4 px-6 font-bold text-white">Filière &amp; Formation Ciblée</th>
                        <th className="py-4 px-4 font-bold text-slate-300">Junior (0 - 2 ans)</th>
                        <th className="py-4 px-4 font-bold text-cyan-400">Confirmé (2 - 5 ans)</th>
                        <th className="py-4 px-4 font-bold text-emerald-400">Senior / Lead (5+ ans)</th>
                        <th className="py-4 px-6 font-bold text-right">Détail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs font-mono">
                      {formations.map((f) => (
                        <tr key={f.slug} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="py-4 px-6 font-sans">
                            <span className="font-bold text-white group-hover:text-cyan-300 transition-colors block text-sm">
                              {f.title}
                            </span>
                            <span className="text-slate-500 text-[11px] font-mono">
                              {f.badge.replace(/&bull;/g, '•')} &bull; {f.duration}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-300">
                            {f.career?.salarySenegal?.junior || "350 000 à 550 000 FCFA"}
                          </td>
                          <td className="py-4 px-4 text-cyan-300 font-bold">
                            {f.career?.salarySenegal?.intermediate || "700 000 à 1 200 000 FCFA"}
                          </td>
                          <td className="py-4 px-4 text-emerald-400 font-bold">
                            {f.career?.salarySenegal?.senior || "1 500 000+ FCFA"}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Link
                              href={`/formations/${f.slug}#opportunites`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-white border border-white/10 transition-all text-[11px] font-sans font-semibold"
                            >
                              <span>Voir débouchés</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#10E760] shrink-0" />
                    <span>Données indicatives calculées sur la base des recrutements bancaires, télécoms, DSI et cabinets de conseil à Dakar.</span>
                  </div>
                  <span className="font-mono text-cyan-400 shrink-0">Devise : FCFA Net / Mois</span>
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Partners Banner */}
        <Section className="py-16 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Découvrez l&apos;ensemble de nos Partenaires Technologiques
                </h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  Sophos, Fortinet, Microsoft 365, Cisco, Dell, VMware, Acronis, Wallix, GateWatcher, Allot, BeyondTrust, Veritas...
                </p>
              </div>

              <Link
                href="/partenaires"
                className="shrink-0 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <span>Voir nos partenaires</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
