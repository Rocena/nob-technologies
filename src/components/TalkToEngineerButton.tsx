"use client";

import React from "react";
import { useEngineerModal } from "./EngineerModalContext";
import { ArrowUpRight } from "lucide-react";

export function TalkToEngineerButton() {
  const { openEngineerModal } = useEngineerModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openEngineerModal();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Parler à un ingénieur"
      className="group relative inline-flex items-center justify-center gap-2.5 h-12 sm:h-13 w-full sm:w-auto px-6 sm:px-7 rounded-lg font-semibold text-sm sm:text-[15px] text-slate-100 bg-white/[0.06] hover:bg-white/[0.11] border border-white/15 hover:border-white/30 transition-colors duration-200 cursor-pointer"
    >
      <span>Parler à un ingénieur</span>
      <ArrowUpRight className="w-4 h-4 text-sky-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}
