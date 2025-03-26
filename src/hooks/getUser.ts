import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useUser() {
  const router = useRouter();
  
  const { 
    data: user, 
    isLoading: loading, 
    isError,
    error,
    refetch 
  } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/getauthuser");
        if (!response.ok) {
          if (response.status === 401) {
            return null;
          }
          throw new Error("Erro ao buscar o usuário");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 1000 * 60, // Cache por 1 minuto
    gcTime: 1000 * 60 * 5, // Manter no cache por 5 minutos
    refetchOnWindowFocus: true, // Importante para manter o estado sincronizado
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    // if (!loading && !user) {
    //   router.push('/');
    // }
  }, [user, loading, router]);

  console.log({ user });

  return { user, loading, error, refetch };
}
