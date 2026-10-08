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
  Sparkles,
  Loader2
} from "lucide-react";

interface VercelSitePreviewProps {
  url: string;
  previewUrl?: string;
  title: string;
  fallbackImage: string;
}

export function VercelSitePreview({
  url,
  previewUrl,
  title,
  fallbackImage,
}: VercelSitePreviewProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"interactive" | "screenshot">("interactive");
  const [key, setKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);

  const iframeSrc = previewUrl || (url.includes("parcexotique.sn") ? "/api/preview/parcexotique" : url);

  const handleRefresh = () => {
    setIframeLoading(true);
    setKey((prev) => prev + 1);
  };

  const handleDeviceChange = (newDevice: "desktop" | "mobile") => {
    setIframeLoading(true);
    setDevice(newDevice);
  };

  const handleViewModeChange = (newMode: "interactive" | "screenshot") => {
    if (newMode === "interactive") setIframeLoading(true);
    setViewMode(newMode);
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
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Right: Device & View Switchers + External Link */}
        <div className="flex items-center gap-2">
          {/* View mode toggle (Live interactive vs Screenshot) */}
          <div className="hidden md:flex items-center bg-[#020617] p-0.5 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => handleViewModeChange("interactive")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === "interactive"
                  ? "bg-accent text-[#020617] font-bold shadow-xs"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              Live iFrame
            </button>
            <button
              onClick={() => handleViewModeChange("screenshot")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === "screenshot"
                  ? "bg-accent text-[#020617] font-bold shadow-xs"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              Capture HD
            </button>
          </div>

          {/* Device viewport toggle */}
          <div className="flex items-center bg-[#020617] p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => handleDeviceChange("desktop")}
              title="Aperçu Ordinateur"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                device === "desktop"
                  ? "bg-accent text-[#020617] font-bold shadow-xs"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDeviceChange("mobile")}
              title="Aperçu Mobile"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                device === "mobile"
                  ? "bg-accent text-[#020617] font-bold shadow-xs"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-[#00B4D8] text-[#020617] font-bold text-xs transition-all shadow-sm hover:shadow-[0_2px_10px_rgba(0,212,255,0.3)] active:scale-95"
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
            <div className="flex-1 relative overflow-y-auto bg-slate-900">
              {viewMode === "interactive" ? (
                <div className="w-full h-full relative">
                  {iframeLoading && (
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-20 pointer-events-none p-4 text-center">
                      <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                      <span className="text-[11px] font-mono text-slate-300">
                        Chargement de la version mobile...
                      </span>
                    </div>
                  )}
                  <iframe
                    key={`mobile-${key}`}
                    src={iframeSrc}
                    title={`${title} - Mobile Preview`}
                    onLoad={() => setIframeLoading(false)}
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
                  />
                </div>
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
              <div className="w-full h-full relative bg-slate-900">
                {iframeLoading && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-20 pointer-events-none">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="text-xs font-mono text-slate-300">
                      Connexion au direct ({url.replace(/^https?:\/\//, '')})...
                    </span>
                  </div>
                )}
                <iframe
                  key={`desktop-${key}`}
                  src={iframeSrc}
                  title={`${title} - Desktop Preview`}
                  onLoad={() => setIframeLoading(false)}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
                />
                {/* Information helper overlay at bottom */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2 shadow-lg">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Navigation interactive</span>
                  </span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-bold ml-1"
                  >
                    Ouvrir en plein écran <ExternalLink className="w-3 h-3" />
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
                  <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Site web actif en production &bull; {url.replace(/^https?:\/\//, '')}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-3.5 py-1 rounded-full bg-accent hover:bg-[#00B4D8] text-[#020617] font-bold transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-1 shadow-sm"
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
