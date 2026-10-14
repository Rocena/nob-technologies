"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section } from '@/components/ui/layout';
import { FadeUp } from '@/components/animations';
import { Network, Lock, Quote, Award, ArrowRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import Link from 'next/link';

interface FounderBioSectionProps {
  photoSrc?: string;
}

const rotatingRoles = [
  "Infrastructures Réseaux Critiques",
  "Cybersécurité & Pare-feu Avancé",
  "Haute Disponibilité & Cloud 24/7",
  "Systèmes d’Information & Télécoms",
];

const titleWords = ["L’Ingénieur", "&", "Visionnaire", "derrière"];

export function FounderBioSection({ photoSrc }: FounderBioSectionProps) {
  const photo = photoSrc || "/images/founder/ozias-nzongo.jpg";
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section id="fondateur" className="py-20 md:py-28 lg:py-32 bg-[#020617] text-white relative overflow-hidden border-t border-b border-slate-800/80">
      {/* Background Silicon Valley Tech Grid & Radiant Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] lg:w-[1000px] h-[400px] bg-gradient-to-r from-[#00D4FF]/12 via-[#00F0FF]/6 to-[#10E760]/12 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header: Dynamic Pro Animation */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          
          {/* Eyebrow Pill with Live Terminal Prompt */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,212,255,0.18)] backdrop-blur-md mb-5"
          >
            <span className="text-[#00D4FF] font-black select-none text-xs sm:text-sm font-mono tracking-tighter inline-flex items-center">
              &gt;<span className="text-[#10E760] animate-pulse">_</span>
            </span>
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
              DIRECTION &amp; LEADERSHIP TECHNIQUE
            </span>
          </motion.div>

          {/* Staggered Kinetic Word Reveal Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-4 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5">
            {titleWords.map((word, idx) => (
              <span key={word} className="inline-block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "110%", opacity: 0, rotateZ: 2 }}
                  whileInView={{ y: 0, opacity: 1, rotateZ: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            
            {/* Animated Brand Name: Continuous Shimmer Gradient */}
            <span className="inline-block overflow-hidden py-1">
              <motion.span
                initial={{ y: "110%", opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative inline-block font-black tracking-tight"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] drop-shadow-[0_0_28px_rgba(0,212,255,0.45)] inline-block"
                >
                  NOBTECH
                </motion.span>
              </motion.span>
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-2"
          >
            Une technologie solide, pensée avec rigueur pour durer et faire grandir les entreprises.
          </motion.p>

          {/* Live Dynamic Ticker: Rotating Core Competency */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-5 text-xs sm:text-sm font-mono"
          >
            <span className="text-slate-500 hidden sm:inline">Pôle d&apos;expertise :</span>
            <div className="h-8 overflow-hidden relative inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10E760] animate-pulse" />
                  {rotatingRoles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

        {/* Bento Grid Layout: Portrait Card (Left) & High-End Story Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Executive Studio Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <FadeUp delay={0.1}>
              <div className="relative w-full max-w-md mx-auto group">
                {/* Subtle Ambient Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#00D4FF]/30 via-slate-800/40 to-[#10E760]/30 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                
                {/* Anthracite Executive Card */}
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col items-center">
                  
                  {/* Photo Frame with subtle lighting */}
                  <div className="relative w-full aspect-[4/5] max-w-[280px] sm:max-w-[300px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl mb-6 group/img">
                    <Image
                      src={photo}
                      alt="Ozias B. Nzongo - Fondateur de NOBTECH"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                      sizes="(max-width: 640px) 280px, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50 pointer-events-none" />
                  </div>

                  {/* Identity Block */}
                  <div className="text-center w-full">
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Ozias B. Nzongo
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#10E760] font-mono tracking-wide mt-1 mb-4">
                      Fondateur &amp; Lead Architecte IT
                    </p>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] mx-auto mb-5 rounded-full" />
                  </div>

                  {/* 3 Key Credentials Pills */}
                  <div className="w-full space-y-2.5 text-left text-xs font-mono">
                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-[#00D4FF]/30 transition-colors">
                      <Award className="w-4 h-4 text-[#00D4FF] shrink-0" />
                      <div>
                        <span className="text-white font-bold">14+ Ans d&apos;Expérience</span>
                        <span className="text-slate-400 block text-[11px]">Infrastructures &amp; Systèmes</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-[#10E760]/30 transition-colors">
                      <Network className="w-4 h-4 text-[#10E760] shrink-0" />
                      <div>
                        <span className="text-white font-bold">Ingénieur Réseaux &amp; Télécoms</span>
                        <span className="text-slate-400 block text-[11px]">Architecture matérielle &amp; Cloud</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-cyan-400/30 transition-colors">
                      <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-white font-bold">Cybersécurité &amp; Sauvegardes</span>
                        <span className="text-slate-400 block text-[11px]">Protection des données d&apos;entreprise</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link to Contact / Audit */}
                  <div className="w-full mt-6 pt-4 border-t border-slate-800">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D4FF]/40 transition-all group/btn"
                    >
                      <span>Échanger avec Ozias</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF] transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Premium Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Executive Statement (No Card) */}
            <FadeUp delay={0.2}>
              <div className="pb-3 border-b border-white/10">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Mettre l’informatique au service de la{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    performance réelle
                  </span>{" "}
                  et de la sérénité des organisations.
                </h3>
              </div>
            </FadeUp>

            {/* Clear, Impactful Story (Simple Words) */}
            <FadeUp delay={0.3}>
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                <p>
                  Fort de plus de <strong className="text-white font-bold">14 ans d’expérience</strong> dans les technologies de l’information, <strong className="text-white font-bold">Ozias B. Nzongo</strong> a construit son parcours autour d’une ambition simple : faire de l&apos;outil informatique un levier fiable qui propulse les entreprises au lieu de les ralentir.
                </p>

                <p>
                  Ingénieur en réseaux et télécommunications, il conçoit et supervise des architectures informatiques complètes : câblage d&apos;entreprise, serveurs, cybersécurité, virtualisation et continuité de service. Son expertise l&apos;a conduit à piloter des projets d&apos;envergure auprès d&apos;institutions diplomatiques, de groupes industriels, de cliniques médicales et d&apos;opérateurs télécoms.
                </p>

                <p>
                  Au fil des années, il a forgé une méthode pragmatique : allier la rigueur technique du terrain à une vraie compréhension des impératifs économiques. De la sécurisation des données sensibles au soutien des équipes, il privilégie toujours trois valeurs : la <span className="text-cyan-300 font-semibold">fiabilité des installations</span>, la <span className="text-emerald-300 font-semibold">simplicité d&apos;usage</span> et la <span className="text-white font-semibold">qualité de service</span>.
                </p>

                <p>
                  À travers <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#10E760] font-black">NOBTECH</strong>, il porte une vision de la transformation numérique fondée sur des solutions adaptées, solides et évolutives. Sa conviction : une bonne infrastructure ne doit pas seulement répondre aux besoins d’aujourd’hui, elle doit préparer votre entreprise aux réussites de demain.
                </p>
              </div>
            </FadeUp>

            {/* Executive Quote with Accent Gradient Dashed Border */}
            <FadeUp delay={0.35}>
              <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-sm overflow-hidden mt-6">
                {/* SVG Dashed Border in Signature Accent Gradient */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="quote-gradient-dash" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="50%" stopColor="#00F0FF" />
                      <stop offset="100%" stopColor="#10E760" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="0.6"
                    y="0.6"
                    width="98.8"
                    height="98.8"
                    rx="5"
                    ry="5"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke="url(#quote-gradient-dash)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                </svg>

                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#00D4FF]/10 to-[#10E760]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-emerald-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,212,255,0.15)] mt-0.5">
                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF]" />
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-white font-bold text-lg sm:text-xl lg:text-2xl leading-snug">
                      « La technologie ne doit pas seulement accompagner l&apos;évolution des entreprises. Elle doit leur donner les moyens d&apos;
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                        aller plus loin
                      </span>. »
                    </blockquote>
                    <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-base text-white font-extrabold font-sans">
                        Ozias B. Nzongo
                      </span>
                      <span className="text-xs text-cyan-400 font-mono">
                        Fondateur de NOBTECH &bull; Ingénieur Réseaux &amp; Télécoms
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>

        </div>
      </Container>
    </Section>
  );
}
