"use client";

import React from "react";
import Link from "next/link";
import { NobLogo } from "./NobLogo";

export function AnimatedLogo() {
  return (
    <Link href="/" className="flex items-center group relative z-50 transition-transform duration-300 hover:scale-[1.02]">
      {/* Version Mobile : Logo compact avec Nom complet */}
      <div className="block sm:hidden text-slate-900">
        <NobLogo height={28} showText={true} />
      </div>

      {/* Version Tablette/Desktop : Cube + NOB TECHNOLOGIES */}
      <div className="hidden sm:block text-slate-900">
        <NobLogo height={36} showText={true} />
      </div>
    </Link>
  );
}
