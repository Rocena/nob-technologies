'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b14] overflow-hidden select-none">
      {/* Background ambient lighting matching brand colors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(0,180,216,0.18)_0%,rgba(10,37,64,0.1)_50%,transparent_70%)] blur-3xl pointer-events-none animate-pulse" />
      
      {/* Central Branding & Loader Stage */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Brand Cube Isometric Loader */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Subtle spinning halo ring */}
          <div className="absolute inset-0 rounded-full border border-[#00B4D8]/20 animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-2 rounded-full border border-dashed border-[#00B4D8]/15 animate-spin-reverse pointer-events-none" />
          
          {/* Official NOB TECHNOLOGIES Isometric Cube with futuristic breathing pulse & energy trace */}
          <svg
            viewBox="0 0 64 64"
            className="w-20 h-20 drop-shadow-[0_0_24px_rgba(0,180,216,0.55)] animate-float-cube"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="topFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#00B4D8" />
              </linearGradient>
              <linearGradient id="leftFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
              <linearGradient id="rightFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0A2540" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>

            {/* Top Face */}
            <polygon
              points="32,8 12,20 32,32 52,20"
              fill="url(#topFaceGrad)"
              stroke="#FFFFFF"
              strokeOpacity="0.6"
              strokeWidth="0.8"
              strokeLinejoin="round"
              className="animate-facet-pulse"
            />

            {/* Left Face */}
            <polygon
              points="12,20 32,32 32,56 12,44"
              fill="url(#leftFaceGrad)"
              stroke="#FFFFFF"
              strokeOpacity="0.4"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Right Face */}
            <polygon
              points="32,32 52,20 52,44 32,56"
              fill="url(#rightFaceGrad)"
              stroke="#FFFFFF"
              strokeOpacity="0.4"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Center Neon Energy Ridge Lines */}
            <polyline
              points="32,32 32,56"
              stroke="#38BDF8"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="animate-glow-line"
            />
            <polyline
              points="12,20 32,32 52,20"
              stroke="#E0F2FE"
              strokeWidth="1.2"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />

            {/* Orbiting energetic photon dot */}
            <circle cx="32" cy="32" r="2.2" fill="#FFFFFF" className="animate-ping" />
          </svg>
        </div>

        {/* Official Brand Logotype (NOB TECHNOLOGIES typography) */}
        <div className="flex items-center gap-2 mb-4 tracking-normal">
          <span className="text-2xl sm:text-3xl font-black text-white tracking-[-0.03em] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
            NOB
          </span>
          <span className="text-xl sm:text-2xl font-semibold text-[#00B4D8] tracking-[0.16em] uppercase">
            TECHNOLOGIES
          </span>
        </div>

        {/* High-tech Laser Loading Progress Bar */}
        <div className="w-56 sm:w-64 h-1 rounded-full bg-slate-800/80 border border-white/5 overflow-hidden p-[1px] shadow-inner mb-3">
          <div className="h-full rounded-full bg-gradient-to-r from-[#0A2540] via-[#00B4D8] to-[#38BDF8] animate-laser-progress shadow-[0_0_12px_#00B4D8]" />
        </div>

        {/* Dynamic Status Text matching Logo identity */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-ping" />
          <p className="text-[11px] sm:text-xs font-medium text-slate-400 tracking-[0.25em] uppercase font-mono">
            Chargement en cours<span className="text-[#00B4D8] animate-pulse">...</span>
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

        @keyframes floatCube {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.03);
          }
        }

        @keyframes facetPulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.25);
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

        .animate-float-cube {
          animation: floatCube 2.8s ease-in-out infinite;
        }

        .animate-facet-pulse {
          animation: facetPulse 2.8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 9s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 14s linear infinite;
        }
      `}</style>
    </div>
  );
}
