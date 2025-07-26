import { useMutation } from "@tanstack/react-query";
import { RegisterUser, RegisterData } from "@/services/register";
import { useSetAtom } from "jotai";
import { tokenAtom, userIdAtom, accountIdAtom } from "@/state/sessionAtoms";

export function useRegister() {
  const setToken = useSetAtom(tokenAtom);
  const setUserId = useSetAtom(userIdAtom);
  const setAccountId = useSetAtom(accountIdAtom);

  return useMutation({
    mutationFn: (registerData: RegisterData) => RegisterUser(registerData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", String(data.user_id));
      localStorage.setItem("account_id", String(data.account_id));

      setToken(data.token);
      setUserId(data.user_id);
      setAccountId(data.account_id);
    },
  });
}
