"use client";
import { createContext, useContext, useState } from "react";

interface ContractContextType {
  contratoId: string | null;
  proprietarioId: string | null;
  inquilinoId: string | null;
  setContract: (contratoId: string, proprietarioId: string, inquilinoId: string) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [contratoId, setContratoId] = useState<string | null>(null);
  const [proprietarioId, setProprietarioId] = useState<string | null>(null);
  const [inquilinoId, setInquilinoId] = useState<string | null>(null);

  const setContract = (newContratoId: string, newProprietarioId: string, newInquilinoId: string) => {
    setContratoId(newContratoId);
    setProprietarioId(newProprietarioId);
    setInquilinoId(newInquilinoId);
  };

  return (
    <ContractContext.Provider value={{ contratoId, proprietarioId, inquilinoId, setContract }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
}