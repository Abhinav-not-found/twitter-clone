import axios from 'axios';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogoutMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.get('/api/user/logout');
      return res.data;
    },
    onSuccess: () => {
      localStorage.removeItem('userId');
      router.push('/');
    },
    
    onError: (error) => {
      toast.error(error?.response?.data?.error || 'Logout failed');
    },
  });
}
