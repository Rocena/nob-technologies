"use client";

import React from "react";
import { useSyllabusModal } from "@/components/SyllabusModalContext";
import { FileText } from "lucide-react";

interface SyllabusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  formationTitle: string;
  formationSlug: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function SyllabusButton({
  formationTitle,
  formationSlug,
  children,
  showIcon = true,
  className,
  ...props
}: SyllabusButtonProps) {
  const { openSyllabusModal } = useSyllabusModal();

  return (
    <button
      type="button"
      onClick={() => openSyllabusModal({ formationTitle, formationSlug })}
      className={className}
      {...props}
    >
      {showIcon && <FileText className="w-4 h-4 shrink-0" />}
      {children || <span>Demander le programme complet</span>}
    </button>
  );
}
