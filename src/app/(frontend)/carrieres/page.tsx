import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { GlowButton } from "@/components/GlowButton";
import { Lightbulb, Shield, TrendingUp, Globe, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Carrieres | NOB TECHNOLOGIES",
  description:
    "Rejoignez l'equipe NOB TECHNOLOGIES et participez a la transformation digitale de l'Afrique. Decouvrez nos valeurs et postulez en candidature spontanee.",
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Nous repoussons les frontieres technologiques pour apporter des solutions d'avant-garde aux entreprises africaines. Curiosite et creativite sont au coeur de chaque projet.",
  },
  {
    icon: Shield,
    title: "Expertise",
    desc: "Nos equipes sont composees d'ingenieurs certifies (Cisco, Microsoft, Fortinet) qui maintiennent un haut niveau d'excellence technique dans chaque intervention.",
  },
  {
    icon: TrendingUp,
    title: "Croissance",
    desc: "Nous investissons dans le developpement de nos collaborateurs : formations continues, certifications professionnelles et evolution de carriere acceleree.",
  },
  {
    icon: Globe,
    title: "Impact",
    desc: "Chaque ligne de code, chaque reseau deploye contribue a accelerer la transformation numerique du Senegal et de l'Afrique de l'Ouest.",
  },
];

const quotes = [
  {
    text: "L'innovation n'est pas un departement, c'est un etat d'esprit que nous cultivons chaque jour.",
    author: "Equipe NOB TECHNOLOGIES",
  },
  {
    text: "Nous construisons les infrastructures qui feront tourner l'economie digitale africaine de demain.",
    author: "Direction Technique",
  },
  {
    text: "La diversite de nos profils est notre force : ingenieurs, chefs de projet, experts securite, tous engages pour un meme objectif.",
    author: "RH NOB TECHNOLOGIES",
  },
];

export default function CarrieresPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-[#020617] overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Glows */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 uppercase mb-5 backdrop-blur-sm shadow-sm">
                  &gt;_ TALENTS &amp; RECRUTEMENT IT
                </span>
              </FadeUp>
              <TextReveal>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 text-balance">
                  Carrières &amp; Opportunités :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Construisez l&apos;Avenir Numérique
                  </span>
                </h1>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-8">
                  Rejoignez une équipe d&apos;ingénieurs et de techniciens passionnés, certifiés par les plus grands constructeurs mondiaux, qui déploient les infrastructures critiques de demain.
                </p>
                <GlowButton href="/contact?type=candidature">
                  Postuler maintenant
                </GlowButton>
              </FadeUp>
            </div>
          </Container>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </Section>

        {/* Pourquoi rejoindre NOB TECH */}
        <Section className="py-20 md:py-28 bg-white">
          <Container>
            <FadeUp>
              <div className="text-center mb-16">
                <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  NOS VALEURS
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Pourquoi rejoindre NOB TECH ?
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Nous offrons bien plus qu'un emploi : une mission, une
                  communaute et un environnement ou l'excellence technique
                  s'epanouit.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <FadeUp key={value.title} delay={i * 0.1}>
                  <div className="group p-7 rounded-2xl border border-slate-200 bg-white hover:border-accent/30 hover:shadow-[0_8px_40px_rgba(0,212,255,0.08)] transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* Postes ouverts */}
        <Section className="py-20 md:py-28 bg-slate-50">
          <Container>
            <FadeUp>
              <div className="text-center mb-14">
                <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  OFFRES D'EMPLOI
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Postes ouverts
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="max-w-2xl mx-auto">
                <div className="relative rounded-2xl border border-dashed border-accent/40 bg-white overflow-hidden p-10 text-center">
                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-blue-400/5 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Aucun poste ouvert en ce moment
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8 max-w-md mx-auto">
                      Nous recrutons en continu les meilleurs talents IT.
                      N'attendez pas une annonce : envoyez-nous votre
                      candidature spontanee et rejoignez notre vivier de
                      talents.
                    </p>
                    <GlowButton href="/contact?type=candidature">
                      Candidature spontanee
                    </GlowButton>
                  </div>
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Notre culture */}
        <Section className="py-20 md:py-28 bg-[#020617] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

          <Container className="relative z-10">
            <FadeUp>
              <div className="text-center mb-16">
                <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  CULTURE D'ENTREPRISE
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                  Notre culture
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                  Des mots qui guident nos actions quotidiennes et notre vision
                  collective.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quotes.map((quote, i) => (
                <FadeUp key={i} delay={i * 0.12}>
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 h-full flex flex-col">
                    <div className="text-accent/30 text-6xl font-serif leading-none mb-4">
                      "
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm flex-1 italic mb-6">
                      {quote.text}
                    </p>
                    <p className="text-xs text-accent font-bold tracking-wider uppercase">
                      — {quote.author}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.4}>
              <div className="text-center mt-16">
                <p className="text-slate-400 mb-6">
                  Pret a rejoindre l'aventure ?
                </p>
                <GlowButton href="/contact?type=candidature">
                  Envoyer ma candidature
                </GlowButton>
              </div>
            </FadeUp>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
