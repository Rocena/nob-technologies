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
        <span className="font-[900] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-sky-300 via-sky-600 to-slate-950">
          NOB
        </span>{' '}
        <span className="font-[300] tracking-[0.18em] sm:tracking-[0.22em] bg-clip-text text-transparent bg-gradient-to-b from-sky-300 via-sky-700 to-slate-950 opacity-90">
          TECHNOLOGIES
        </span>
      </motion.h2>
    </div>
  );
}
