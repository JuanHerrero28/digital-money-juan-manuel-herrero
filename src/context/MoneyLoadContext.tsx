// src/context/MoneyLoadContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom, accountIdAtom, userCvuAtom } from "@/state/sessionAtoms";

type Card = {
  id: number;
  number_id: number;
  first_last_name: string;
  expiration_date: string;
  cod: number;
};

type SummaryData = {
  date: string;
  time: string;
};

type LoadMethod = "bank" | "card" | null;

type MoneyLoadContextType = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;

  loadMethod: LoadMethod;
  setLoadMethod: (method: LoadMethod) => void;

  selectedCard: Card | null;
  setSelectedCard: (card: Card) => void;

  amount: number;
  setAmount: (value: number) => void;

  summaryData: SummaryData | null;
  setSummaryData: (data: SummaryData) => void;

  confirmarCarga: (monto: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;

  userCvu: string | null;
  token: string | null;
  accountId: number | null;
  destinationCvu: string | null;
  setDestinationCvu: (cvu: string) => void;
};

const MoneyLoadContext = createContext<MoneyLoadContextType | undefined>(undefined);

export const MoneyLoadProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const [loadMethod, setLoadMethod] = useState<LoadMethod>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [destinationCvu, setDestinationCvu] = useState<string | null>(null);

  const token = useAtomValue(tokenAtom);
  const accountId = useAtomValue(accountIdAtom);
  const userCvu = useAtomValue(userCvuAtom);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const resetSteps = () => {
    setStep(0);
    setLoadMethod(null);
    setSelectedCard(null);
    setAmount(0);
    setSummaryData(null);
  };

  // ⚠️ Ya no hace el POST. Solo setea el monto y avanza
  const confirmarCarga = (monto: number) => {
    setAmount(monto);
    nextStep();
  };

  return (
    <MoneyLoadContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        resetSteps,
        loadMethod,
        setLoadMethod,
        selectedCard,
        setSelectedCard,
        amount,
        setAmount,
        summaryData,
        setSummaryData,
        confirmarCarga,
        loading,
        setLoading,
        userCvu,
        token,
        accountId,
        destinationCvu,
        setDestinationCvu,
      }}
    >
      {children}
    </MoneyLoadContext.Provider>
  );
};

export const useMoneyLoad = () => {
  const context = useContext(MoneyLoadContext);
  if (!context) {
    throw new Error("useMoneyLoad must be used within a MoneyLoadProvider");
  }
  return context;
};
