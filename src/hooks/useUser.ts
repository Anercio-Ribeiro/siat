import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useUser() {
  const { data: session } = useSession();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('Usuário não autenticado');
      const res = await fetch(`/api/getauthuser/${session.user.id}`);
      if (!res.ok) throw new Error('Erro ao buscar usuário');
      return res.json();
    },
    enabled: !!session?.user?.id,
  });

  return { user, isLoading, error };
}
