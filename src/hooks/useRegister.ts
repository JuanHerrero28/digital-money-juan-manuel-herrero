import { useMutation } from '@tanstack/react-query';
import { RegisterUser, RegisterData } from '@/services/register';

export function useRegister() {
  return useMutation({
    mutationFn: (registerData: RegisterData) => RegisterUser(registerData),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
}
