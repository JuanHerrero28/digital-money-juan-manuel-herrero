// src/hooks/useDepositTransfer.ts
import { useMutation } from "@tanstack/react-query";
import { crearDeposito, crearTransferencia } from "@/services/depositTransferService";

export const useCrearDeposito = () =>
  useMutation({
    mutationFn: ({
      token,
      accountId,
      body,
    }: {
      token: string;
      accountId: number;
      body: {
        amount: number;
        dated: string;
        origin: string;
        destination: string;
      };
    }) => crearDeposito(token, accountId, body),
  });

export const useCrearTransferencia = () =>
  useMutation({
    mutationFn: ({
      token,
      accountId,
      body,
    }: {
      token: string;
      accountId: number;
      body: {
        amount: number;
        dated: string;
        origin: string;
        destination: string;
      };
    }) => crearTransferencia(token, accountId, body),
  });