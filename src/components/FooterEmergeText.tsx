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
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <div ref={ref} className="w-full flex justify-center pointer-events-none select-none py-6 sm:py-8 overflow-hidden">
      <motion.h2
        style={{
          opacity,
          y,
        }}
        className="text-[7.5vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5vw] tracking-wider uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#38bdf8] to-[#0284c7] whitespace-nowrap text-center max-w-full font-sans select-none drop-shadow-[0_0_25px_rgba(0,212,255,0.25)]"
      >
        <span className="font-extrabold text-[#00D4FF]">NOB</span>{' '}
        <span className="font-semibold text-sky-400/90 tracking-widest">TECHNOLOGIES</span>
      </motion.h2>
    </div>
  );
}
