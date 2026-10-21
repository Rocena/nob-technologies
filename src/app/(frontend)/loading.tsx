'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] select-none overflow-hidden">
      {/* Subtle, soft ambient depth - Calm, high-end studio lighting */}
      <div 
        className="absolute w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, rgba(16, 231, 96, 0.03) 42%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Brand Presentation Stage */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Emblem Stage with Sophisticated Breathing Glow & Light Sheen */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
          {/* Soft ambient back-glow aura */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00D4FF]/15 to-[#10E760]/10 blur-xl animate-emblem-glow pointer-events-none" />

          {/* Shield Container */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center animate-emblem-breathe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/nobtech-shield.png" 
              alt="NOBTECH" 
              className="w-full h-full object-contain filter drop-shadow-[0_4px_24px_rgba(0,212,255,0.28)]"
            />

            {/* Subtle specular sheen sweep across emblem */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
              <div className="w-full h-full animate-light-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
            </div>
          </div>
        </div>

        {/* Senior Brand Logotype */}
        <div className="flex items-center font-sans font-black tracking-[-0.03em] leading-none mb-3 text-2xl sm:text-3xl">
          <span className="text-white">NOB</span>
          <span className="text-[#0284C7] dark:text-sky-400">TECH</span>
        </div>

        {/* Official Slogan: subtle, balanced, understated elegance */}
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase mb-8">
          LA TECHNOLOGIE À VOTRE PORTÉE
        </p>

        {/* Minimal Precision Progress Micro-Bar (2px sleek line) */}
        <div className="w-40 sm:w-48 h-[2px] rounded-full bg-white/[0.08] overflow-hidden relative">
          <div className="absolute top-0 bottom-0 rounded-full bg-[#0284C7] animate-precision-bar shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes emblemBreathe {
          0%, 100% {
            transform: scale(0.985);
            opacity: 0.94;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        @keyframes emblemGlow {
          0%, 100% {
            opacity: 0.45;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }

        @keyframes lightSweep {
          0% {
            transform: translateX(-160%) skewX(-20deg);
          }
          38%, 100% {
            transform: translateX(180%) skewX(-20deg);
          }
        }

        @keyframes precisionBar {
          0% {
            left: -35%;
            width: 30%;
          }
          50% {
            left: 25%;
            width: 55%;
          }
          100% {
            left: 105%;
            width: 30%;
          }
        }

        .animate-emblem-breathe {
          animation: emblemBreathe 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-emblem-glow {
          animation: emblemGlow 2.8s ease-in-out infinite;
        }

        .animate-light-sweep {
          animation: lightSweep 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-precision-bar {
          animation: precisionBar 1.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
}
