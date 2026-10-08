"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Globe, 
  ExternalLink, 
  RotateCw, 
  Smartphone, 
  Monitor, 
  Lock, 
  CheckCircle2, 
  Layers,
  Sparkles
} from "lucide-react";

interface VercelSitePreviewProps {
  url: string;
  title: string;
  fallbackImage: string;
}

export function VercelSitePreview({
  url,
  title,
  fallbackImage,
}: VercelSitePreviewProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"interactive" | "screenshot">("screenshot");
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#090d16] shadow-2xl overflow-hidden font-sans">
      {/* Vercel-Style Browser Chrome Header */}
      <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Window Controls & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-emerald-400">
              Live Production
            </span>
          </div>
        </div>

        {/* Center: Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center justify-center">
          <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#020617] border border-slate-700/60 text-xs font-mono text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate flex-1 select-all">{url}</span>
            <button
              onClick={handleRefresh}
              title="Recharger l'aperçu"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Device & View Switchers + External Link */}
        <div className="flex items-center gap-2">
          {/* View mode toggle (Live interactive vs Screenshot) */}
          <div className="hidden md:flex items-center bg-[#020617] p-0.5 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setViewMode("screenshot")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === "screenshot"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Capture HD
            </button>
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === "interactive"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Live iFrame
            </button>
          </div>

          {/* Device viewport toggle */}
          <div className="flex items-center bg-[#020617] p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setDevice("desktop")}
              title="Aperçu Ordinateur"
              className={`p-1.5 rounded-md transition-colors ${
                device === "desktop" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              title="Aperçu Mobile"
              className={`p-1.5 rounded-md transition-colors ${
                device === "mobile" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* External Link */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
          >
            <span>Ouvrir</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Preview Viewport Canvas */}
      <div className="relative bg-[#020617] flex items-center justify-center min-h-[460px] md:min-h-[580px] p-2 md:p-6 overflow-hidden">
        {device === "mobile" ? (
          /* Mobile Phone Chassis */
          <div className="relative w-[340px] sm:w-[375px] h-[620px] rounded-[38px] border-[8px] border-slate-800 bg-black shadow-2xl overflow-hidden flex flex-col my-4">
            {/* Notch */}
            <div className="h-6 bg-black flex items-center justify-center shrink-0">
              <div className="w-24 h-4 bg-slate-900 rounded-full" />
            </div>

            {/* Mobile Viewport */}
            <div className="flex-1 relative overflow-y-auto">
              {viewMode === "interactive" ? (
                <iframe
                  key={`mobile-${key}`}
                  src={url}
                  title={`${title} - Mobile Preview`}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : (
                <div className="relative w-full h-full min-h-[500px]">
                  <Image
                    src={fallbackImage}
                    alt={title}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>

            {/* Mobile Home Bar */}
            <div className="h-4 bg-black flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        ) : (
          /* Desktop Viewport */
          <div className="w-full h-[520px] md:h-[620px] rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden relative shadow-inner">
            {viewMode === "interactive" ? (
              <div className="w-full h-full relative">
                <iframe
                  key={`desktop-${key}`}
                  src={url}
                  title={`${title} - Desktop Preview`}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
                {/* Information helper overlay at bottom */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
                  <span>Navigation en direct</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    Ouvrir en grand <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative overflow-y-auto group bg-slate-950">
                <div className="relative w-full h-full min-h-[580px]">
                  <Image
                    src={fallbackImage}
                    alt={title}
                    fill
                    priority
                    unoptimized
                    className="object-contain sm:object-cover object-top"
                  />
                </div>

                {/* Floating interactive hover pill */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 shadow-2xl text-xs text-white">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Site web actif en production &bull; {url.replace(/^https?:\/\//, '')}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform hover:scale-105 inline-flex items-center gap-1"
                  >
                    Visiter <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
