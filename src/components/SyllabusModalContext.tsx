"use client";

import React, { createContext, useContext, useState } from "react";
import { BrochureDownloadModal } from "./formations/BrochureDownloadModal";

export interface OpenSyllabusModalOptions {
  formationTitle: string;
  formationSlug: string;
}

interface SyllabusModalContextType {
  isOpen: boolean;
  selectedFormationTitle?: string;
  selectedFormationSlug?: string;
  openSyllabusModal: (options: OpenSyllabusModalOptions) => void;
  closeSyllabusModal: () => void;
}

const SyllabusModalContext = createContext<SyllabusModalContextType>({
  isOpen: false,
  selectedFormationTitle: undefined,
  selectedFormationSlug: undefined,
  openSyllabusModal: () => {},
  closeSyllabusModal: () => {},
});

export function useSyllabusModal() {
  return useContext(SyllabusModalContext);
}

export function SyllabusModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formationTitle, setFormationTitle] = useState<string>("Formation NOB TECHNOLOGIES");
  const [formationSlug, setFormationSlug] = useState<string>("");

  const openSyllabusModal = (options: OpenSyllabusModalOptions) => {
    setFormationTitle(options.formationTitle);
    setFormationSlug(options.formationSlug);
    setIsOpen(true);
  };

  const closeSyllabusModal = () => {
    setIsOpen(false);
  };

  return (
    <SyllabusModalContext.Provider
      value={{
        isOpen,
        selectedFormationTitle: formationTitle,
        selectedFormationSlug: formationSlug,
        openSyllabusModal,
        closeSyllabusModal,
      }}
    >
      {children}
      {formationSlug && (
        <BrochureDownloadModal
          formationTitle={formationTitle}
          formationSlug={formationSlug}
          isOpen={isOpen}
          onClose={closeSyllabusModal}
        />
      )}
    </SyllabusModalContext.Provider>
  );
}
