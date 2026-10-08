"use client";

import React from "react";
import { useQuoteModal } from "@/components/EngineerModalContext";

interface QuoteRequestButtonProps {
  service?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function QuoteRequestButton({
  service,
  className = "",
  children = "Demander un devis",
  onClick,
}: QuoteRequestButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
    openQuoteModal(service);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={typeof children === "string" ? children : `Demander un devis pour ${service || "votre projet"}`}
    >
      {children}
    </button>
  );
}
