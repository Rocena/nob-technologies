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
      ? "h-12 sm:h-13 px-7 md:px-8 text-sm md:text-[15px] font-semibold"
      : "h-11 sm:h-12 px-6 md:px-7 text-xs sm:text-sm font-semibold";

  const baseStyle =
    "group relative inline-flex items-center justify-center rounded-lg text-white font-semibold bg-[#0284C7] hover:bg-[#0369A1] border border-sky-400/30 shadow-[0_1px_2px_rgba(2,6,23,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-200 cursor-pointer shrink-0";

  if (!href || href === "#devis" || href === "/devis" || href === "/tarifs" || href === "/contact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${baseStyle} ${sizeClasses} ${className || ""}`}
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
      className={`${baseStyle} ${sizeClasses} ${className || ""}`}
    >
      <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
        {children}
      </span>
    </Link>
  );
}
