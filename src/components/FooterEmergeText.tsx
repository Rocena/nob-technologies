"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FooterEmergeText() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end 100%"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  return (
    <div ref={ref} className="w-full flex justify-center pointer-events-none select-none py-6 sm:py-8 overflow-hidden">
      <motion.h2
        style={{
          opacity,
          y,
        }}
        className="text-[6.8vw] sm:text-[7.8vw] md:text-[6.5vw] lg:text-[5.5vw] uppercase leading-none whitespace-nowrap text-center max-w-full font-sans select-none"
      >
        <span className="font-[900] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#70E1FF] via-[#0099DD] to-[#041E42] drop-shadow-[0_2px_12px_rgba(0,212,255,0.3)]">
          NOB
        </span>{' '}
        <span className="font-[300] tracking-[0.18em] sm:tracking-[0.22em] bg-clip-text text-transparent bg-gradient-to-b from-[#60D0FF] via-[#0077B6] to-[#021329] opacity-95">
          TECHNOLOGIES
        </span>
      </motion.h2>
    </div>
  );
}
