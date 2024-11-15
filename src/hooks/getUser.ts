
// import { useQuery } from "@tanstack/react-query";
// import { User } from "@/app/model/type";

import { User } from "@/app/model/type";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

// export function useUser() {
//   const { data: user, isLoading: loading, isError, error } = useQuery<User | null>({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       const response = await fetch("/api/getauthuser");
//       if (!response.ok) throw new Error("Erro ao buscar o usuário");
//       return response.json();
//     },
//     initialData: null,
//   });

//   if (isError) {
//     console.error("Erro ao buscar o usuário:", error);
//   }

//   return { user, loading, error };
// }




// import { useQuery } from "@tanstack/react-query";
// import { User } from "@/app/model/type";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export function useUser() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false); // Para verificar se o componente foi montado

//   // Definindo o estado de autenticação e carregamento
//   const { data: user, isLoading: loading, isError, error } = useQuery<User | null>({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       const response = await fetch("/api/getauthuser");
//       if (!response.ok) throw new Error("Erro ao buscar o usuário");
//       return response.json();
//     },
//     initialData: null,
//   });

//   // Usando useEffect para garantir que o código roda no cliente
//   useEffect(() => {
//     setMounted(true); // Marca que o componente foi montado
//   }, []);

//   // Verifica se o componente foi montado e redireciona se houver erro
//   useEffect(() => {
//     if (mounted && isError) {
//       console.error("Erro ao buscar o usuário:", error);
//       router.push("/"); // Redireciona para a página inicial caso o usuário não esteja autenticado
//     }
//   }, [isError, error, mounted, router]);

//   return { user, loading, error };
// }



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