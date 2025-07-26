// src/hooks/useAccount.ts
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/services/accountService";
import { useAtom } from "jotai";
import { tokenAtom } from "@/state/sessionAtoms";

export const useAccount = () => {
  const [token] = useAtom(tokenAtom);

  return useQuery({
    queryKey: ["account"],
    queryFn: () => getAccount(token!),
    enabled: !!token,
  });
};

