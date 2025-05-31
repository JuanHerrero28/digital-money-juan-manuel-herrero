import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/services/logout';

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}