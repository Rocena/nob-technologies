"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FooterEmergeText() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end 100%"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.95]);

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center pointer-events-none select-none py-6 sm:py-10 overflow-hidden relative">
      {/* Giant subtle shield watermark in the backdrop */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.08, 0.18]), y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 pointer-events-none blur-[0.5px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/nobtech-shield.png" 
          alt="" 
          className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(0,212,255,0.3)] opacity-70" 
        />
      </motion.div>

      {/* Main typographic watermark */}
      <motion.h2
        style={{ opacity, y }}
        className="text-[12vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8vw] leading-none whitespace-nowrap text-center max-w-full font-sans select-none tracking-tight flex items-baseline justify-center relative z-10"
      >
        <span className="font-[900] tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-b from-white/35 via-white/15 to-white/5 drop-shadow-[0_4px_16px_rgba(255,255,255,0.05)]">
          NOB
        </span>
        <span className="font-[900] tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF]/60 via-[#00F0FF]/50 to-[#10E760]/60 ml-1.5 sm:ml-3 drop-shadow-[0_4px_20px_rgba(0,212,255,0.25)]">
          TECH
        </span>
      </motion.h2>

      {/* Official Slogan flanked by cyan and green gradient lines */}
      <motion.div
        style={{ opacity }}
        className="mt-2 sm:mt-4 flex items-center justify-center gap-3 sm:gap-5 text-[2.8vw] sm:text-[1.5vw] md:text-[1.05vw] tracking-[0.32em] text-slate-400/80 font-bold uppercase select-none relative z-10"
      >
        <span className="h-[2px] w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-[#00D4FF]" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200">
          LA TECHNOLOGIE À VOTRE PORTÉE
        </span>
        <span className="h-[2px] w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#10E760] to-transparent" />
      </motion.div>
    </div>
  );
}

