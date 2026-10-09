"use client";

import React from "react";
import Link from "next/link";
import { useQuoteModal } from "./EngineerModalContext";

export function GlowButton({
  href,
  children = "Demander un devis",
  onClick,
  service,
  className,
  size = "md",
}: {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  service?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { openQuoteModal } = useQuoteModal();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }
    if (!href || href === "#devis" || href === "/devis" || href === "/tarifs" || href === "/contact") {
      e.preventDefault();
      openQuoteModal(service);
    }
  };

  const sizeClasses =
    size === "sm"
      ? "h-9 sm:h-10 px-4 text-xs font-semibold"
      : size === "lg"
      ? "h-12 sm:h-14 px-8 md:px-10 text-sm md:text-base font-bold"
      : "h-11 sm:h-12 md:h-14 px-6 md:px-9 text-xs sm:text-sm md:text-base font-bold";

  if (!href || href === "#devis" || href === "/devis" || href === "/tarifs" || href === "/contact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center rounded-xl text-[#020617] bg-accent hover:bg-[#00B4D8] transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(0,212,255,0.4)] hover:shadow-[0_6px_20px_rgba(0,212,255,0.3)] cursor-pointer active:scale-95 shrink-0 ${sizeClasses} ${className || ''}`}
      >
        <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }

  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={`group relative inline-flex items-center justify-center rounded-xl text-[#020617] bg-accent hover:bg-[#00B4D8] transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(0,212,255,0.4)] hover:shadow-[0_6px_20px_rgba(0,212,255,0.3)] shrink-0 ${sizeClasses} ${className || ''}`}
    >
      <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
        {children}
      </span>
    </Link>
  );
}
