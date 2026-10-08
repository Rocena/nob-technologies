"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NobLogo } from "./NobLogo";

export function AnimatedLogo() {
  return (
    <Link 
      href="/" 
      className="flex items-center group relative z-50 nob-logo-root select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
      aria-label="NOBTECH - Accueil"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 280, 
          damping: 22,
          duration: 0.6 
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center relative py-1"
      >
        {/* Ambient Backlight Glow around Shield that activates on entrance and hover */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#00D4FF]/30 to-[#10E760]/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Mobile View */}
        <div className="block sm:hidden text-[#0B2545]">
          <NobLogo height={32} showText={true} textColor="#0B2545" />
        </div>

        {/* Tablet & Desktop View */}
        <div className="hidden sm:block text-[#0B2545]">
          <NobLogo height={40} showText={true} textColor="#0B2545" />
        </div>
      </motion.div>
    </Link>
  );
}
