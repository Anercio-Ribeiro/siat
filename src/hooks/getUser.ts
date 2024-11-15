import { User } from "@/app/model/type";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useUser() {
  const router = useRouter();

  // Definindo o estado de autenticação e carregamento
  const { data: user, isLoading: loading, isError, error } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await fetch("/api/getauthuser");
      if (!response.ok) throw new Error("Erro ao buscar o usuário");
      return response.json();
    },
    initialData: null,
    retry: false, // Evitar múltiplas tentativas
  });

  useEffect(() => {
    if (!loading && !user && isError) {
      redirect("/"); // Redireciona imediatamente se o usuário não estiver autenticado
    }
  }, [user, loading, isError, router]);

  return { user, loading, error };
}