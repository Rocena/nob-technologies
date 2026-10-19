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
import { FormationOfferingsSection } from "@/components/formations/FormationOfferingsSection";
import { FormationVideoSection } from "@/components/formations/FormationVideoSection";
import { FormationPricingBox } from "@/components/formations/FormationPricingBox";
import { FormationApplyButton } from "@/components/FormationApplyButton";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Building2,
  Banknote,
  Users,
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
    title: `${formation.title} | Formations NOB TECHNOLOGIES`,
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

              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
                {formation.heroDescription}
              </p>

              {/* Actions rapides d'inscription */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <FormationApplyButton
                  formationTitle={formation.title}
                  formationSlug={formation.slug}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-sm shadow-[0_0_24px_rgba(0,212,255,0.3)] hover:shadow-[0_0_36px_rgba(0,212,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Postuler</span>
                  <ArrowRight className="w-4 h-4" />
                </FormationApplyButton>
                <a
                  href="#candidature"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm hover:bg-white/10 hover:border-cyan-400/40 transition-all"
                >
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Demander le syllabus officiel</span>
                </a>
              </div>

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
                    <p className="text-[10px] font-mono uppercase text-slate-400">Rythme</p>
                    <p className="text-xs sm:text-sm font-bold text-white">Max 6h / semaine</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Publics</p>
                    <p className="text-xs sm:text-sm font-bold text-white">Entreprises &bull; Particuliers</p>
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
              <div className="mb-10 text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Certifications Officielles &amp; Titres Constructeurs Ciblés
                </h2>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Examens officiels reconnus mondialement, délivrés directement par les constructeurs et organismes accrédités internationaux, passables depuis le Sénégal.
                </p>
              </div>
            </FadeUp>

            {/* Target Certification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {formation.targetCertifications.map((cert, i) => (
                <a
                  key={i}
                  href="#candidature"
                  className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-white/[0.08] hover:shadow-[0_14px_36px_-10px_rgba(0,212,255,0.3)] transition-all duration-300 flex flex-col justify-between block cursor-pointer"
                  title={`Cliquer pour vous inscrire à la certification ${cert.title}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-bold group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                        {cert.level}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-2 font-medium">{cert.organization}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{cert.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-white transition-colors">
                    <span>S&apos;inscrire à cet examen</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>

            {/* Bouton stratégique d'inscription directe */}
            <div className="text-center mb-12">
              <FormationApplyButton
                formationTitle={formation.title}
                formationSlug={formation.slug}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-sm shadow-[0_0_24px_rgba(0,212,255,0.3)] hover:shadow-[0_0_36px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Postuler</span>
                <ArrowRight className="w-4 h-4" />
              </FormationApplyButton>
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

        {/* Live Training Video Excerpt for Phishing Course */}
        {slug === "sensibilisation-phishing-cas-pratiques" && (
          <Section className="py-20 bg-[#020617] border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <Container className="relative z-10">
              <FormationVideoSection
                videoId="lx105w1dLLU"
                eyebrow="IMMERSION EN DIRECT • EXTRAIT DE COURS"
                title="Aperçu d'une session : Détection du Phishing"
                subtitle="Visualisez un cas réel traité en direct lors de nos ateliers : comment reconnaître les signes précurseurs d'un faux email et sécuriser les échanges d'entreprise."
                ctaLink="#candidature"
                ctaText="S'inscrire à cet atelier"
              />
            </Container>
          </Section>
        )}

        {/* Tarification Psychologique & Formats adaptés : Particuliers & Entreprises */}
        <Section className="py-20 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                TARIFS &bull; MODALITÉS D&apos;INSCRIPTION
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                Investissez dans Votre Avenir Professionnel
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Tarification transparente, facilités d&apos;échelonnement mensuel sans frais et formules intra-entreprise sur-mesure pour les directions informatiques.
              </p>
            </div>
            {formation.pricing && (
              <FormationPricingBox
                formationTitle={formation.title}
                formationSlug={formation.slug}
                duration={formation.duration}
                pricing={formation.pricing}
              />
            )}
          </Container>
        </Section>

        {/* 6-Month Detailed Curriculum */}
        <Section className="py-20 bg-slate-950 border-t border-white/10 relative overflow-hidden">
          <Container>
            <CurriculumSyllabus
              months={formation.months}
              formationTitle={formation.title}
              duration={formation.duration}
              hours={formation.hours}
              pace={formation.pace}
            />
          </Container>
        </Section>

        {/* Career Opportunities, Salary Grid & Outcomes */}
        <Section className="py-20 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="max-w-5xl mx-auto space-y-12">
              
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                  Débouchés Professionnels &amp; Rémunérations au Sénégal
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Ce cursus pratique est calibré pour répondre aux besoins critiques de recrutement des entreprises sénégalaises, banques de la place et multinationales basées à Dakar.
                </p>
              </div>

              {/* 1. Métiers Cibles & Postes auxquels postuler */}
              {formation.career?.targetRoles && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                    <span>Postes &amp; Métiers auxquels vous pourrez postuler</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formation.career.targetRoles.map((role, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                            <h4 className="text-sm font-bold text-white">
                              {role.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {role.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Grille de Rémunération Mensuelle Estimée au Sénégal */}
              {formation.career?.salarySenegal && (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 border border-cyan-500/30 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <Banknote className="w-5 h-5" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">
                          Marché de l&apos;emploi IT • Dakar &amp; Sénégal
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        Grille des Rémunérations Mensuelles Estimées
                      </h3>
                    </div>
                    <span className="self-start md:self-auto text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      En FCFA Net / Mois
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
                    {/* Profil Junior */}
                    <div className="p-5 rounded-xl bg-slate-900/90 border border-white/10 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Profil Débutant / Junior
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400 font-bold">0 - 2 ans</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-white mt-1">
                        {formation.career.salarySenegal.junior}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        {formation.targetCertifications?.[0]
                          ? `Titulaire d'une certification reconnue (ex. ${formation.targetCertifications[0].title}).`
                          : "Première expérience avec attestation de compétences ou certification reconnue."}
                      </p>
                    </div>

                    {/* Profil Intermédiaire */}
                    <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/40 relative overflow-hidden shadow-lg shadow-cyan-950/40">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                          Profil Confirmé / Intermédiaire
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400 font-bold">2 - 5 ans</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-cyan-300 mt-1">
                        {formation.career.salarySenegal.intermediate}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        Autonome sur la gestion de projets, les incidents critiques et la maintenance opérationnelle.
                      </p>
                    </div>

                    {/* Profil Senior / Lead */}
                    <div className="p-5 rounded-xl bg-slate-900/90 border border-white/10 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                          Senior / Lead / Consultant
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">5+ ans</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                        {formation.career.salarySenegal.senior}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        Pilotage d&apos;équipes, architecture d&apos;infrastructures critiques ou missions internationales.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950/80 border border-white/5 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300 font-medium">Contexte du marché sénégalais : </strong>
                    {formation.career.salarySenegal.context}
                  </div>
                </div>
              )}

              {/* 3. Secteurs & Entreprises Recruteuses au Sénégal */}
              {formation.career?.sectors && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <span>Secteurs &amp; types d&apos;entreprises qui recrutent au Sénégal</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {formation.career.sectors.map((sector, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 flex items-center gap-3 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Public Cible, Prérequis & Compétences Clés */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
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
                    Bénéfices &amp; Compétences Maîtrisées
                  </h3>

                  <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                    Ce que vous maîtriserez à l&apos;issue de la formation :
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
                sessions={formation.sessions}
              />
            </div>
          </Container>
        </Section>

        {/* Other formations crosslink */}
        <Section className="py-16 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                DÉCOUVRIR LES AUTRES PARCOURS
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
                    <span>Voir le programme complet</span>
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
