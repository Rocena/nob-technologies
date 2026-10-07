"use client";

import React, { createContext, useContext, useState } from "react";
import { EngineerContactModal } from "./EngineerContactModal";

interface EngineerModalContextType {
  isOpen: boolean;
  openEngineerModal: () => void;
  closeEngineerModal: () => void;
}

const EngineerModalContext = createContext<EngineerModalContextType>({
  isOpen: false,
  openEngineerModal: () => {},
  closeEngineerModal: () => {},
});

export function useEngineerModal() {
  return useContext(EngineerModalContext);
}

export function EngineerModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEngineerModal = () => setIsOpen(true);
  const closeEngineerModal = () => setIsOpen(false);

  return (
    <EngineerModalContext.Provider value={{ isOpen, openEngineerModal, closeEngineerModal }}>
      {children}
      <EngineerContactModal isOpen={isOpen} onClose={closeEngineerModal} />
    </EngineerModalContext.Provider>
  );
}
