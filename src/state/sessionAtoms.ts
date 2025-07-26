import { atom } from "jotai";

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getInitialUserId = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("user_id");
    return value ? Number(value) : null;
  }
  return null;
};

const getInitialAccountId = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("account_id");
    return value ? Number(value) : null;
  }
  return null;
};

const getInitialUserCvu = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_cvu");
  }
  return null;
};

export const tokenAtom = atom<string | null>(getInitialToken());
export const userIdAtom = atom<number | null>(getInitialUserId());
export const accountIdAtom = atom<number | null>(getInitialAccountId());
export const userCvuAtom = atom<string | null>(getInitialUserCvu());


