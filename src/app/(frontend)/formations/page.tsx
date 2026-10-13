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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FormationOfferingsSection } from "@/components/formations/FormationOfferingsSection";

export const metadata: Metadata = {
  title: "Formations Professionnelles & Préparation aux Certifications | NOB TECHNOLOGIES",
  description:
    "Cycles d'excellence et programmes intensifs sur 6 mois pour ingénieurs et techniciens : Cisco CCNA/CCNP, Fortinet NSE, Sophos, Cybersécurité ISO 27001 et Automatisation IA.",
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
                Des cursus d&apos;ingénierie et de certification animés par nos experts en production à Dakar : Certificat International Cisco en cybersécurité, Power BI appliqué à la sécurité &amp; SOC, certifications officielles (Cisco CCNA, Fortinet, Sophos) et cadres de conformité (NIST, ISO 27001).
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
                    </div>

                    <div className="pt-5 border-t border-white/10 space-y-2 mt-auto">
                      <Link
                        href={`/formations/${track.slug}#candidature`}
                        className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-[#020617] font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(0,212,255,0.35)]"
                      >
                        Postuler ou Demander un devis
                      </Link>

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
 
        {/* Formats d'Accompagnement : Entreprises, Bootcamps, Particuliers */}
        <Section className="py-20 md:py-28 bg-[#020617] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <Container className="relative z-10">
            <FormationOfferingsSection />
          </Container>
        </Section>

        {/* Methodology & Training Excellence */}
        <Section className="py-20 md:py-28 bg-white text-slate-900">
          <Container>
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  PÉDAGOGIE &bull; IMMERSION TECHNIQUE
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Une méthode d&apos;apprentissage axée sur le terrain
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-base">
                  Nous privilégions l&apos;immersion technique directe pour transformer des connaissances théoriques en réflexes d&apos;ingénierie opérationnels.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Labs sur matériel physique
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Accès à des baies de brassage réelles, commutateurs Cisco Catalyst, appliances FortiGate et serveurs Dell PowerEdge pour des manipulations sans artifice.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Simulations Pearson VUE
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Entraînements chronométrés sous format d&apos;examen officiel, analyse approfondie des questions complexes et débriefing personnalisé avant chaque passage.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Mentoring d&apos;ingénieurs seniors
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Formateurs en activité sur des projets d&apos;envergure nationale et internationale, partageant retours d&apos;expérience réels et bonnes pratiques du marché.
                </p>
              </div>
            </div>
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
