"use client";

import React, { createContext, useContext, useState } from "react";
import { FormationApplyModal } from "./FormationApplyModal";

export interface OpenApplyModalOptions {
  formationTitle?: string;
  formationSlug?: string;
  targetSession?: string;
}

interface FormationApplyModalContextType {
  isOpen: boolean;
  selectedFormationTitle?: string;
  selectedFormationSlug?: string;
  selectedTargetSession?: string;
  openApplyModal: (options?: OpenApplyModalOptions) => void;
  closeApplyModal: () => void;
}

const FormationApplyModalContext = createContext<FormationApplyModalContextType>({
  isOpen: false,
  selectedFormationTitle: undefined,
  selectedFormationSlug: undefined,
  selectedTargetSession: undefined,
  openApplyModal: () => {},
  closeApplyModal: () => {},
});

export function useFormationApplyModal() {
  return useContext(FormationApplyModalContext);
}

export function FormationApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formationTitle, setFormationTitle] = useState<string | undefined>();
  const [formationSlug, setFormationSlug] = useState<string | undefined>();
  const [targetSession, setTargetSession] = useState<string | undefined>();

  const openApplyModal = (options?: OpenApplyModalOptions) => {
    setFormationTitle(options?.formationTitle);
    setFormationSlug(options?.formationSlug);
    setTargetSession(options?.targetSession);
    setIsOpen(true);
  };

  const closeApplyModal = () => {
    setIsOpen(false);
  };

  return (
    <FormationApplyModalContext.Provider
      value={{
        isOpen,
        selectedFormationTitle: formationTitle,
        selectedFormationSlug: formationSlug,
        selectedTargetSession: targetSession,
        openApplyModal,
        closeApplyModal,
      }}
    >
      {children}
      <FormationApplyModal
        isOpen={isOpen}
        initialFormationTitle={formationTitle}
        initialFormationSlug={formationSlug}
        initialSession={targetSession}
        onClose={closeApplyModal}
      />
    </FormationApplyModalContext.Provider>
  );
}
