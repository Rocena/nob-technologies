"use client";

import React from "react";
import Link from "next/link";

export function GlowButton({
  href = "/contact",
  children = "Nous contacter",
  onClick,
  className,
}: {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={`group relative inline-flex items-center justify-center rounded-sm h-14 px-8 md:px-12 text-base font-bold text-[#020617] bg-accent hover:bg-[#00B4D8] transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(0,212,255,0.4)] hover:shadow-[0_6px_20px_rgba(0,212,255,0.3)] ${className || ''}`}
    >
      <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
        {children}
      </span>
    </Link>
  );
}
