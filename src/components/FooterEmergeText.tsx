"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FooterEmergeText() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end 100%"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.95]);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col items-center justify-center pointer-events-none select-none py-6 sm:py-10 overflow-hidden relative [perspective:1000px]"
    >
      {/* 3D Emergent Typographic Watermark: NOBTECH */}
      <motion.div
        style={{ opacity, y }}
        className="w-full flex items-center justify-center relative [transform-style:preserve-3d] px-4"
      >
        <h2
          style={{
            transform: "rotateX(24deg)",
            transformOrigin: "50% 100%",
            WebkitTransform: "rotateX(24deg)",
            WebkitTransformOrigin: "50% 100%",
          }}
          className="text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[8.5vw] font-[900] tracking-tight leading-[0.9] whitespace-nowrap text-center select-none bg-clip-text text-transparent bg-gradient-to-t from-white via-white/20 to-transparent drop-shadow-[0_10px_35px_rgba(0,212,255,0.08)] px-6"
        >
          NOBTECH
        </h2>
      </motion.div>

      {/* Official Slogan */}
      <motion.div
        style={{ opacity }}
        className="mt-2 sm:mt-4 flex items-center justify-center max-w-full px-4 select-none relative z-20 overflow-hidden whitespace-nowrap"
      >
        <p className="font-semibold text-[#0284C7] dark:text-sky-400 text-[11px] xs:text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-center whitespace-nowrap drop-shadow-[0_0_12px_rgba(0,212,255,0.3)]">
          LA TECHNOLOGIE À VOTRE PORTÉE
        </p>
      </motion.div>
    </div>
  );
}
