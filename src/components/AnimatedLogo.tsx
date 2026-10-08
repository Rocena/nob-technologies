"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NobLogo } from "./NobLogo";

export function AnimatedLogo() {
  return (
    <Link 
      href="/" 
      className="flex items-center justify-center group relative z-50 nob-logo-root select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
      aria-label="NOBTECH - Accueil"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 280, 
          damping: 22,
          duration: 0.5 
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center relative py-1"
      >
        {/* Mobile View: Height 34px strictly centered */}
        <div className="flex items-center justify-center sm:hidden text-[#0B2545]">
          <NobLogo height={34} showText={true} textColor="#0B2545" />
        </div>

        {/* Tablet & Desktop View: Height 42px strictly centered */}
        <div className="hidden sm:flex items-center justify-center text-[#0B2545]">
          <NobLogo height={42} showText={true} textColor="#0B2545" />
        </div>
      </motion.div>
    </Link>
  );
}
