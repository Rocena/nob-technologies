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
      <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-2 leading-tight">
        Nous créons des solutions pour
      </h1>
      <div className="relative h-20 sm:h-24 lg:h-32 flex items-center justify-center w-full mt-2">
        <div className="text-accent text-5xl sm:text-6xl lg:text-7xl font-mono tracking-tighter py-4 flex items-center">
          <span className="text-accent/40 mr-4 font-light opacity-50 select-none">{">"}</span>
          <span className="relative">
            {displayedText}
            {/* Intelligent Micro-blink Cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="absolute -right-6 top-[10%] w-4 h-[80%] bg-accent ml-2"
            />
            {/* Subtle glow behind the typing text */}
            <motion.span 
              className="absolute inset-0 bg-accent/20 blur-2xl -z-10"
              animate={{ opacity: isDeleting ? 0 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
