"use client";

import React from "react";
import { useFormationApplyModal } from "@/components/FormationApplyModalContext";

interface FormationApplyButtonProps {
  formationTitle: string;
  formationSlug: string;
  targetSession?: string;
  className?: string;
  children?: React.ReactNode;
}

export function FormationApplyButton({
  formationTitle,
  formationSlug,
  targetSession,
  className,
  children = "Postuler",
}: FormationApplyButtonProps) {
  const { openApplyModal } = useFormationApplyModal();

  return (
    <button
      type="button"
      onClick={() =>
        openApplyModal({
          formationTitle,
          formationSlug,
          targetSession,
        })
      }
      className={
        className ||
        "inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-[#0284C7] text-[#020617] font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(0,212,255,0.35)] cursor-pointer"
      }
    >
      {children}
    </button>
  );
}
