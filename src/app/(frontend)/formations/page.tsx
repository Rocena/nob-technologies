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
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
            <FadeUp>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 uppercase mb-5 backdrop-blur-sm shadow-sm">
                &gt;_ FORMATION &amp; MONTÉE EN COMPÉTENCES TECHNIQUES
              </span>
            </FadeUp>
            <TextReveal>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 text-balance">
                Formations Professionnelles :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Préparation aux Certifications Mondiales
                </span>
              </h1>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
                Cursus intensifs de 6 mois axés sur la pratique réelle à Dakar pour préparer méthodiquement vos ingénieurs et techniciens à réussir les examens de référence (Cisco, Fortinet, Sophos).
              </p>
            </FadeUp>

            {/* Badges */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Programmes structurés sur 6 mois (24 semaines)
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Labs pratiques sur matériel réel à Dakar
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Formateurs ingénieurs seniors certifiés
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
                <span className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3 font-bold block">
                  &gt;_ CATALOGUE DES FORMATIONS
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Nos Parcours Certifiants sur 6 Mois
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Choisissez votre spécialisation et accédez au syllabus détaillé mois par mois avec ateliers pratiques et livrables d&apos;évaluation.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {formations.map((track, idx) => (
                <FadeUp key={track.slug} delay={idx * 0.1}>
                  <div className="h-full bg-slate-950/80 rounded-2xl border border-white/10 p-7 md:p-8 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-300 relative group">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span className="inline-block text-[10px] font-mono font-bold tracking-widest px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-full">
                          {track.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {track.duration.split(" ")[0]} Mois
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {track.shortDesc}
                      </p>

                      {/* Targeted Certifications Badges */}
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                          Certifications visées :
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {track.targetCertifications.map((cert, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                            >
                              {cert.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Partner Logos */}
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
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-2.5">
                      <Link
                        href={`/formations/${track.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 group-hover:shadow"
                      >
                        <span>Découvrir le programme (6 mois)</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/formations/${track.slug}#candidature`}
                        className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium text-xs hover:bg-white/10 hover:text-white transition-colors"
                      >
                        Postuler à la prochaine session
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* Methodology & Training Excellence */}
        <Section className="py-20 md:py-28 bg-white text-slate-900">
          <Container>
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="font-mono text-cyan-600 text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  &gt;_ PÉDAGOGIE APPLIQUÉE
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
                <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-2 block">
                  &gt;_ ÉCOSYSTÈME CONSTRUCTEURS
                </span>
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
