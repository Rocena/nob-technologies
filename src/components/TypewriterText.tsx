"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";

const SLOGAN = "La technologie à votre portée";

export function TypewriterText({ text = SLOGAN }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanX = useMotionValue(-10); // % from 0 to 110
  const controls = useAnimation();

  // Each letter reveals when the scan beam passes its position
  const letters = Array.from(text);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await controls.start("scan");
    }, 500);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div
      ref={containerRef}
      className="relative mb-12 flex items-center justify-center overflow-visible"
      aria-label={text}
    >
      {/* The scan beam line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-20"
        style={{ left: "0%" }}
        variants={{
          scan: {
            left: ["0%", "102%"],
            transition: { duration: 1.6, ease: [0.4, 0, 0.15, 1], delay: 0 },
          },
        }}
        animate={controls}
      >
        {/* The beam itself */}
        <div className="absolute inset-0 bg-accent shadow-[0_0_8px_3px_rgba(0,212,255,0.7)] rounded-full" />
        {/* Trailing glow */}
        <div className="absolute top-0 bottom-0 right-0 w-[40px] bg-gradient-to-r from-accent/30 to-transparent -translate-x-full" />
      </motion.div>

      {/* Letters — each fades in when beam passes */}
      <div className="relative z-10 font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase flex items-center gap-0">
        <span className="mr-2 text-accent/50 text-xs select-none">&gt;_</span>
        {letters.map((char, i) => {
          const delay = 0.5 + (i / letters.length) * 1.5;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                delay,
                duration: 0.25,
                ease: "easeOut",
              }}
              className={char === " " ? "inline-block w-[0.35em]" : ""}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}

        {/* Blinking cursor after full reveal */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2.2, duration: 1.1, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle"
        />
      </div>
    </div>
  );
}
