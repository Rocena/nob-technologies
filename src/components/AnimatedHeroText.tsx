"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "sécuriser",
  "connecter",
  "automatiser",
  "accompagner"
];

export function AnimatedHeroText() {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = phrases[index];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }, 50); // fast delete
    } else {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, 100); // typing speed
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2500); // wait before delete
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index]);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full">
      <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2 leading-tight">
        Nous créons des solutions pour
      </h1>
      <div className="relative h-20 sm:h-24 lg:h-28 flex items-center justify-center w-full mt-1">
        <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-tight py-2 flex items-center justify-center">
          <span className="relative inline-flex items-center">
            <span className="text-[#00D4FF] mr-2 sm:mr-3 select-none font-mono font-black drop-shadow-[0_0_12px_rgba(0,212,255,0.4)]">
              &gt;
            </span>
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] bg-clip-text text-transparent inline-block font-mono font-bold pb-1">
              {displayedText}
            </span>
            {/* Terminal underscore cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-[#10E760] font-mono font-black ml-0.5 select-none drop-shadow-[0_0_10px_rgba(16,231,96,0.6)]"
            >
              _
            </motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}
