'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden select-none">
      {/* Background ambient lighting matching brand colors (Cyan & Emerald) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(0,212,255,0.18)_0%,rgba(16,231,96,0.1)_45%,transparent_70%)] blur-3xl pointer-events-none animate-pulse" />
      
      {/* Tech grid texture in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Central Branding & Loader Stage */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Brand Shield Loader */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          {/* Subtle spinning halo rings */}
          <div className="absolute inset-0 rounded-full border border-[#00D4FF]/30 animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#10E760]/25 animate-spin-reverse pointer-events-none" />
          
          {/* Outer glowing pulsing aura */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#00D4FF]/20 to-[#10E760]/20 blur-md animate-pulse" />

          {/* Official NOBTECH Shield Emblem with floating animation */}
          <div className="relative w-20 h-20 animate-float-shield drop-shadow-[0_0_28px_rgba(0,212,255,0.6)] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/nobtech-shield.png" 
              alt="NOBTECH Shield" 
              className="w-full h-full object-contain filter contrast-105"
            />
          </div>

          {/* Orbiting glowing particles */}
          <div className="absolute inset-0 animate-spin-slow pointer-events-none">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
          </div>
          <div className="absolute -inset-2 animate-spin-reverse pointer-events-none">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#10E760] shadow-[0_0_10px_#10E760]" />
          </div>
        </div>

        {/* Official Brand Logotype (NOBTECH typography) */}
        <div className="flex items-center gap-1.5 mb-2 tracking-normal select-none">
          <span className="text-3xl sm:text-4xl font-[900] text-white tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            NOB
          </span>
          <span className="text-3xl sm:text-4xl font-[900] bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] tracking-[-0.02em] drop-shadow-[0_2px_16px_rgba(0,212,255,0.4)]">
            TECH
          </span>
        </div>

        {/* Official Slogan */}
        <div className="flex items-center gap-2.5 mb-6 opacity-90 select-none">
          <span className="h-[1.5px] w-5 bg-gradient-to-r from-transparent to-[#00D4FF]" />
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 tracking-[0.26em] uppercase">
            LA TECHNOLOGIE À VOTRE PORTÉE
          </span>
          <span className="h-[1.5px] w-5 bg-gradient-to-r from-[#10E760] to-transparent" />
        </div>

        {/* High-tech Cyan to Emerald Loading Progress Bar */}
        <div className="w-56 sm:w-64 h-1 rounded-full bg-slate-900 border border-white/10 overflow-hidden p-[1px] shadow-inner mb-3">
          <div className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#06B6D4] to-[#10E760] animate-laser-progress shadow-[0_0_12px_#00D4FF]" />
        </div>

        {/* Dynamic Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10E760] animate-ping" />
          <p className="text-[11px] font-medium text-slate-400 tracking-[0.2em] uppercase font-mono">
            Initialisation sécurisée<span className="text-[#00D4FF] animate-pulse">...</span>
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes laserProgress {
          0% {
            transform: translateX(-100%);
            width: 40%;
          }
          50% {
            width: 75%;
          }
          100% {
            transform: translateX(250%);
            width: 40%;
          }
        }

        @keyframes floatShield {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.04);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-laser-progress {
          animation: laserProgress 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-float-shield {
          animation: floatShield 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
