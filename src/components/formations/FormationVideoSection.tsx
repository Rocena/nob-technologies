"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, CheckCircle2, ArrowRight, ShieldCheck, Terminal, Users, AlertTriangle } from "lucide-react";
import { FadeUp } from "@/components/animations";

interface FormationVideoSectionProps {
  videoId?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLink?: string;
  ctaText?: string;
}

export function FormationVideoSection({
  videoId = "lx105w1dLLU",
  eyebrow = "ATELIER PRATIQUE • SENSIBILISATION AU PHISHING",
  title = "Sensibilisation au Phishing : la formation en action",
  subtitle = "Découvrez un extrait en direct de nos ateliers de cybersécurité : décryptage des techniques d'hameçonnage (phishing), analyse des faux courriels et réflexes de défense face aux cyber-escroqueries.",
  ctaLink = "/formations/sensibilisation-phishing-cas-pratiques",
  ctaText = "Découvrir le programme Phishing",
}: FormationVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full">
      {/* Header Eyebrow & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <FadeUp>
          <div className="inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-extrabold mb-3">
            <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base font-mono tracking-tighter inline-flex items-center">
              &gt;<span className="text-[#10E760] animate-pulse">_</span>
            </span>
            <span className="text-[#0284C7] dark:text-sky-400">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4 text-center">
            {title.includes(":") ? (
              <>
                {title.split(":")[0]} :{" "}
                <span className="text-[#0284C7] dark:text-sky-400">
                  {title.split(":")[1]}
                </span>
              </>
            ) : (
              title
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-center">
            {subtitle}
          </p>
        </FadeUp>
      </div>

      {/* Video Container Box */}
      <FadeUp delay={0.15}>
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle Accent Glow behind the video */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF]/30 via-slate-800/40 to-[#10E760]/30 rounded-2xl md:rounded-3xl blur-xl opacity-60 pointer-events-none" />

          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl">
            {/* Top Bar Tech Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400 hidden sm:inline-block">
                  session_phishing_cybersecurite.mp4
                </span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Cas Réels &bull; Prévention Phishing</span>
              </div>
            </div>

            {/* Video Player / Thumbnail Stage (16:9 Aspect Ratio) */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              {!isPlaying ? (
                <>
                  {/* YouTube HQ Thumbnail */}
                  <Image
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt="Session de sensibilisation au phishing NOBTECH"
                    fill
                    unoptimized
                    className="object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />

                  {/* Corner Badges */}
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>Sensibilisation Phishing &bull; Dakar</span>
                  </div>

                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/90 backdrop-blur-md text-white text-xs font-bold tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>EXTRAIT VIDÉO EN DIRECT</span>
                  </div>

                  {/* Central Interactive Play Button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative z-20 flex flex-col items-center gap-4 transition-transform active:scale-95"
                    aria-label="Lancer la vidéo sur le phishing"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse rings */}
                      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#10E760] opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
                      
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0284C7] p-0.5 shadow-2xl">
                        <div className="w-full h-full rounded-full bg-slate-950/90 flex items-center justify-center group-hover:bg-slate-950/70 transition-colors">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#00D4FF] ml-1 fill-[#00D4FF] transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                    </div>

                    <span className="px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-lg group-hover:border-[#00D4FF]/40 transition-colors">
                      Regarder l&apos;extrait de formation Phishing
                    </span>
                  </button>
                </>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Session de formation et sensibilisation au phishing NOBTECH"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Bottom Highlights Row */}
            <div className="p-4 sm:p-6 bg-slate-900/80 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <span className="text-white font-bold block">Décryptage des Pièges</span>
                  <span className="text-slate-400">Anatomie de faux e-mails &amp; usurpations</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#10E760]" />
                </div>
                <div>
                  <span className="text-white font-bold block">Réflexes de Cyber-Vigilance</span>
                  <span className="text-slate-400">Sensibilisation active des collaborateurs</span>
                </div>
              </div>

              <div className="flex items-center justify-start sm:justify-end">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D4FF]/40 text-white font-semibold transition-all group w-full sm:w-auto text-center"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </FadeUp>
    </div>
  );
}
