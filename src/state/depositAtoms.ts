import { atom } from "jotai";

export type Deposito = {
  id: number;
  account_id: number;
  type: "Deposit";
  description: string;
  origin: string;
  destination: string;
  amount: number;
  dated: string;
};

export const depositsAtom = atom<Deposito[]>([]);