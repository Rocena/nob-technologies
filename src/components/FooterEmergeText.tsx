"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FooterEmergeText() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start animation when top of element is 100% down the viewport (just entering)
    // End animation when top of element reaches 80% down the viewport
    offset: ["start 100%", "start 80%"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  // filter is tricky with useTransform sometimes across browsers, using a safer approach
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);

  return (
    <div ref={ref} className="w-full flex justify-center pointer-events-none select-none pb-4 relative min-h-[10vw]">
      <motion.h2
        style={{
          opacity,
          y,
          scale,
          filter: blur,
          WebkitFilter: blur,
        }}
        className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#00D4FF] via-[#0055A4] to-[#020617] whitespace-nowrap text-center max-w-full font-sans absolute bottom-0"
      >
        <span className="font-black">NOB</span> <span className="font-light tracking-wide opacity-90">TECHNOLOGIES</span>
      </motion.h2>
    </div>
  );
}
