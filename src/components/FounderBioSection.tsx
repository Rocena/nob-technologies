import React from 'react';
import Image from 'next/image';
import { Container, Section } from '@/components/ui/layout';
import { FadeUp } from '@/components/animations';
import { ShieldCheck, Network, Cpu, Lock, Quote, Award, Sparkles, UserCheck } from 'lucide-react';

interface FounderBioSectionProps {
  photoSrc?: string;
}

export function FounderBioSection({ photoSrc }: FounderBioSectionProps) {
  const photo = photoSrc || "/images/founder/ozias-nzongo.jpg";

  return (
    <Section id="fondateur" className="py-16 md:py-24 lg:py-28 bg-[#030712] text-white relative overflow-hidden border-t border-b border-slate-800/80">
      {/* Anthracite Ambient Glows & Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#10E760]/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Surtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <FadeUp>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold flex items-center justify-center gap-2 flex-wrap">
              <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base">&gt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                DIRECTION &amp; VISION TECHNIQUE
              </span>
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Le Fondateur
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              L’expertise d’ingénierie et la rigueur méthodologique au service de la souveraineté numérique de nos clients.
            </p>
          </FadeUp>
        </div>

        {/* Main Grid: Portrait Card (Left) & Detailed Biography (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Portrait & Executive Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <FadeUp delay={0.1}>
              <div className="relative w-full max-w-sm mx-auto group">
                {/* Glow Border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#00D4FF] via-cyan-500/40 to-[#10E760] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                
                {/* Card Container in Deep Anthracite */}
                <div className="relative bg-[#0B132B]/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col items-center text-center">
                  
                  {/* Photo / Portrait Frame */}
                  <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700 shadow-2xl flex flex-col items-center justify-center mb-6 group/img">
                    <Image
                      src={photo}
                      alt="Ozias B. Nzongo - Fondateur de NOB Technologies"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      sizes="(max-width: 640px) 224px, 256px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Badge officiel de confiance */}
                    <div className="absolute top-3 right-3 z-20 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-[#00D4FF] px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                      <UserCheck className="w-3 h-3 text-[#10E760]" />
                      <span>FONDÉ EN 2020</span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                    Ozias B. Nzongo
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono tracking-wide mb-4">
                    Fondateur de NOB Technologies
                  </p>

                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#00D4FF] to-[#10E760] mb-5 rounded-full" />

                  {/* Core Attributes Pills */}
                  <div className="w-full space-y-2.5 text-left text-xs font-mono">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300">
                      <Award className="w-4 h-4 text-[#00D4FF] shrink-0" />
                      <span>14+ Ans d&apos;Expérience IT &amp; Réseaux</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300">
                      <Network className="w-4 h-4 text-[#10E760] shrink-0" />
                      <span>Ingénieur Réseaux &amp; Télécoms</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300">
                      <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Expert Systèmes, Cloud &amp; Sécurité</span>
                    </div>
                  </div>

                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Full Narrative Biography */}
          <div className="lg:col-span-7 space-y-6">
            <FadeUp delay={0.2}>
              {/* Executive Headline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Expert en infrastructures IT, réseaux et cybersécurité</span>
              </div>

              {/* Founder Presentation Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Bâtir des infrastructures infaillibles au service de la performance durable des entreprises.
              </h3>
            </FadeUp>

            {/* Paragraphs */}
            <FadeUp delay={0.3}>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Fort de plus de 14 ans d’expérience dans les technologies de l’information, <strong className="text-white font-semibold">Ozias B. Nzongo</strong> a construit son parcours autour d’une ambition : mettre la technologie au service de la performance, de la sécurité et du développement des organisations.
                </p>

                <p>
                  Ingénieur en réseaux et télécommunications, il possède une expertise approfondie en architecture des infrastructures informatiques, administration des systèmes, cybersécurité, virtualisation et gestion de projets IT. Son expérience l’a conduit à intervenir sur des projets d’envergure auprès d’organisations issues de secteurs variés, notamment la santé, les télécommunications, l’industrie et les institutions.
                </p>

                <p>
                  Au fil de sa carrière, il a développé une approche alliant maîtrise technique, vision stratégique et compréhension des enjeux opérationnels des entreprises. De la conception d’infrastructures réseau à la sécurisation des systèmes d’information, en passant par l’accompagnement des équipes et le pilotage de projets complexes, il place la fiabilité, l’innovation et la qualité de service au cœur de ses priorités.
                </p>

                <p>
                  À travers NOB Technologies, il porte une vision de la transformation numérique fondée sur des solutions technologiques adaptées, évolutives et sécurisées. Sa démarche repose sur une conviction forte : la technologie ne doit pas seulement répondre aux besoins d’aujourd’hui, elle doit également préparer les organisations aux défis de demain.
                </p>
              </div>
            </FadeUp>

            {/* Callout Quote: Citation officielle du fondateur */}
            <FadeUp delay={0.4}>
              <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-emerald-950/30 border border-cyan-500/30 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Quote className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs uppercase tracking-wider text-[#00D4FF] font-extrabold mb-1.5">
                      Citation
                    </div>
                    <blockquote className="text-white font-bold text-base sm:text-lg lg:text-xl italic leading-relaxed">
                      « La technologie ne doit pas seulement accompagner l&apos;évolution des entreprises. Elle doit leur donner les moyens d&apos;aller plus loin. »
                    </blockquote>
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-sm text-white font-extrabold font-sans">
                        Ozias B. Nzongo
                      </span>
                      <span className="text-xs text-cyan-400 font-mono">
                        Expert en infrastructures IT, réseaux et cybersécurité
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
