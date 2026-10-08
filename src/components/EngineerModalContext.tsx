"use client";

import React, { createContext, useContext, useState } from "react";
import { EngineerContactModal } from "./EngineerContactModal";

interface EngineerModalContextType {
  isOpen: boolean;
  mode: "quote" | "engineer";
  initialService?: string;
  openEngineerModal: () => void;
  openQuoteModal: (service?: string) => void;
  closeEngineerModal: () => void;
  closeQuoteModal: () => void;
}

const EngineerModalContext = createContext<EngineerModalContextType>({
  isOpen: false,
  mode: "quote",
  initialService: undefined,
  openEngineerModal: () => {},
  openQuoteModal: () => {},
  closeEngineerModal: () => {},
  closeQuoteModal: () => {},
});

export function useEngineerModal() {
  return useContext(EngineerModalContext);
}

export function useQuoteModal() {
  return useContext(EngineerModalContext);
}

export function EngineerModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"quote" | "engineer">("quote");
  const [initialService, setInitialService] = useState<string | undefined>();

  const openEngineerModal = () => {
    setMode("engineer");
    setInitialService(undefined);
    setIsOpen(true);
  };

  const openQuoteModal = (service?: string) => {
    setMode("quote");
    setInitialService(service);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <EngineerModalContext.Provider
      value={{
        isOpen,
        mode,
        initialService,
        openEngineerModal,
        openQuoteModal,
        closeEngineerModal: closeModal,
        closeQuoteModal: closeModal,
      }}
    >
      {children}
      <EngineerContactModal
        isOpen={isOpen}
        mode={mode}
        initialService={initialService}
        onClose={closeModal}
      />
    </EngineerModalContext.Provider>
  );
}
