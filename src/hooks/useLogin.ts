import { useMutation } from '@tanstack/react-query';
import { loginUser, Credentials } from '@/services/auth';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: Credentials) => loginUser(credentials),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
}
