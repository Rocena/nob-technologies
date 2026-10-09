"use client";

import React, { useRef, useState } from "react";
import { useEngineerModal } from "./EngineerModalContext";

export function TalkToEngineerButton() {
  const { openEngineerModal } = useEngineerModal();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openEngineerModal();
  };

  return (
    <>
      <style>{`
        /* Dynamic Accent Shimmer & Halo */
        @keyframes accentBorderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .accent-gradient-flow {
          background: linear-gradient(135deg, #00D4FF 0%, #00F0FF 40%, #10E760 100%);
          background-size: 200% 200%;
          animation: accentBorderFlow 4s ease infinite;
        }
      `}</style>

      <div className="relative inline-flex items-center justify-center rounded-sm group select-none">
        {/* Soft Ambient Accent Shadow */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] rounded-sm blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Solid Accent Button Matching Form's Primary CTA */}
        <button
          ref={buttonRef}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          aria-label="Parler à un ingénieur"
          className="accent-gradient-flow relative z-10 h-14 min-w-[240px] px-8 rounded-sm font-bold text-base text-[#020617] flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
        >
          {/* Subtle cursor spotlight inside the accent button */}
          {isHovered && (
            <div
              className="absolute pointer-events-none rounded-full blur-lg transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                width: "120px",
                height: "120px",
                background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
          )}

          {/* Centered Title */}
          <span className="relative z-10 font-bold tracking-tight text-[#020617]">
            Parler à un ingénieur
          </span>

          {/* Elegant Prompt Arrow mirroring the form's interactive styling */}
          <div className="relative z-10 flex items-center font-mono text-sm font-bold text-[#020617]/80 group-hover:text-[#020617] transition-all duration-300 transform group-hover:translate-x-1">
            <span>&rarr;</span>
          </div>

          {/* Micro top shine edge for luxury tactile finish */}
          <div 
            className="absolute inset-x-0 top-0 h-[1px] bg-white/40 pointer-events-none" 
            aria-hidden="true" 
          />
        </button>
      </div>
    </>
  );
}
