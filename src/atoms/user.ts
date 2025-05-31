import { atomWithStorage } from "jotai/utils";

export const userInfoAtom = atomWithStorage<{
  nombre: string;
  apellido: string;
  email: string;
} | null>("userInfo", null);