import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp } from "@/components/animations";
import { getAllFormations, getFormationBySlug } from "@/lib/formations";
import { FormationInquiryForm } from "./FormationInquiryForm";
import { CurriculumSyllabus } from "@/components/formations/CurriculumSyllabus";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const formations = await getAllFormations();
  return formations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);
  if (!formation) return { title: "Formation non trouvée | NOB TECHNOLOGIES" };

  return {
    title: `${formation.title} (Programme 6 Mois) | NOB TECHNOLOGIES`,
    description: formation.shortDesc,
  };
}

export default async function FormationDetailPage({ params }: Props) {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);

  if (!formation) {
    notFound();
  }

  const allFormations = await getAllFormations();
  const otherFormations = allFormations.filter((f) => f.slug !== slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Hero Section */}
        <Section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#030d24] to-[#020617]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link href="/certifications" className="hover:text-cyan-400 transition-colors">
                Partenaires &amp; Formations
              </Link>
              <span>/</span>
              <span className="text-cyan-400 truncate max-w-[200px] sm:max-w-none">
                {formation.title}
              </span>
            </div>

            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                {formation.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                {formation.heroDescription}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Durée</p>
                    <p className="text-xs sm:text-sm font-bold text-white">{formation.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Volume</p>
                    <p className="text-xs sm:text-sm font-bold text-white">{formation.hours.split(" ")[0]} Heures</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Format</p>
                    <p className="text-xs sm:text-sm font-bold text-white">Présentiel &amp; Hybride</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Objectif</p>
                    <p className="text-xs sm:text-sm font-bold text-white">Validation Examens</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Partners & Target Certifications */}
        <Section className="py-16 bg-slate-900 border-y border-white/10">
          <Container>
            <FadeUp>
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Certifications ciblées par ce programme
                </h2>
              </div>
            </FadeUp>

            {/* Target Certification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {formation.targetCertifications.map((cert, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-bold">
                        {cert.level}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{cert.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{cert.organization}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Logos */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <p className="w-full text-center sm:w-auto text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 sm:mb-0">
                Technologies &amp; Constructeurs abordés :
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {formation.partnerLogos.map((p, i) => (
                  <div
                    key={i}
                    title={p.name}
                    className="h-12 px-4 py-2 bg-white rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                  >
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={120}
                      height={34}
                      unoptimized
                      className="h-7 max-h-7 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* 6-Month Detailed Curriculum */}
        <Section className="py-20 bg-slate-950 relative overflow-hidden">
          <Container>
            <CurriculumSyllabus
              months={formation.months}
              formationTitle={formation.title}
            />
          </Container>
        </Section>

        {/* Prerequisites & Outcomes Grid */}
        <Section className="py-16 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Target audience & Prerequisites */}
              <div className="p-7 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  Public Cible &amp; Prérequis
                </h3>

                <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
                  À qui s&apos;adresse ce cursus :
                </p>
                <ul className="space-y-2 mb-6">
                  {formation.targetAudience.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Prérequis recommandés :
                </p>
                <ul className="space-y-2">
                  {formation.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-cyan-400 font-bold">&bull;</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="p-7 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Bénéfices &amp; Débouchés
                </h3>

                <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                  Ce que vous maîtriserez à l&apos;issue des 6 mois :
                </p>
                <ul className="space-y-3">
                  {formation.keyOutcomes.map((out, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Application Form Section */}
        <Section className="py-20 bg-slate-950 border-t border-white/10">
          <Container>
            <div className="max-w-3xl mx-auto">
              <FormationInquiryForm
                formationTitle={formation.title}
                formationSlug={formation.slug}
              />
            </div>
          </Container>
        </Section>

        {/* Other formations crosslink */}
        <Section className="py-16 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="font-mono text-cyan-400 text-xs tracking-[0.25em] uppercase mb-2 font-bold">
                &gt;_ DÉCOUVRIR LES AUTRES PARCOURS
              </p>
              <h2 className="text-2xl font-extrabold text-white">
                Autres Formations &amp; Préparations Certifiantes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {otherFormations.map((other) => (
                <div
                  key={other.slug}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-bold uppercase mb-3 inline-block">
                      {other.duration}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {other.shortDesc}
                    </p>
                  </div>

                  <Link
                    href={`/formations/${other.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-3 border-t border-white/10"
                  >
                    <span>Voir le programme complet sur 6 mois</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
