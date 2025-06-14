import axios from 'axios';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (user) => {
      const res = await axios.post('/api/user/register', { user });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/');
    },
    onError: (error) => {
      const zodErrors = error.response?.data?.error;

      if (zodErrors && typeof zodErrors === 'object') {
        const messages = Object.values(zodErrors)
          .map((field) => field?._errors?.[0])
          .filter(Boolean);
        toast.error(messages.join("\n"));
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });
}
