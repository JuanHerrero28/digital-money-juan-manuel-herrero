import { useMutation } from "@tanstack/react-query";
import { loginUser, Credentials } from "@/services/auth";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/state/sessionAtoms";

export function useLogin() {
  const setToken = useSetAtom(tokenAtom);

  return useMutation({
    mutationFn: (credentials: Credentials) => loginUser(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    },
  });
}

