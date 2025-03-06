// import { User } from "@/app/model/type";
// import { useQuery } from "@tanstack/react-query";
// import { redirect, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export function useUser() {
//   const router = useRouter();

//   // Definindo o estado de autenticação e carregamento
//   const { data: user, isLoading: loading, isError, error } = useQuery<User | null>({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       const response = await fetch("/api/getauthuser");
//       if (!response.ok) throw new Error("Erro ao buscar o usuário");
//       return response.json();
//     },
//     initialData: null,
//     retry: false, // Evitar múltiplas tentativas
//   });

//   useEffect(() => {
//     if (!loading && !user && isError) {
//       redirect("/"); // Redireciona imediatamente se o usuário não estiver autenticado
//     }
//   }, [user, loading, isError, router]);

//   return { user, loading, error };
// }


// // import { User } from "@/app/model/type";
// // import { useQuery } from "@tanstack/react-query";
// // import { redirect, useRouter } from "next/navigation";
// // import { useEffect } from "react";
// // import React from "react";

// // export function useUser() {
// //   const router = useRouter();

// //   const { data: user, isLoading: loading, isError, error } = useQuery<User | null>({
// //     queryKey: ["authUser"],
// //     queryFn: async () => {
// //       const response = await fetch("/api/getauthuser");
// //       if (!response.ok) throw new Error("Erro ao buscar o usuário");
// //       return response.json();
// //     },
// //     initialData: null,
// //     retry: false,
// //     staleTime: 1000 * 60 * 5, // Cache por 5 minutos
// //     gcTime: 1000 * 60 * 30, // Manter no cache por 30 minutos
// //     refetchOnWindowFocus: false, // Não refetch ao focar na janela
// //     refetchOnMount: false, // Não refetch ao montar novamente
// //     refetchOnReconnect: false, // Não refetch ao reconectar
// //     // Se a última requisição retornou null (usuário não logado), aumenta o staleTime
// //     placeholderData: (previousData) => {
// //       if (previousData === null) {
// //         return null;
// //       }
// //       return previousData;
// //     },
// //   });

// //   useEffect(() => {
// //     if (!loading && !user && isError) {
// //       redirect("/");
// //     }
// //   }, [user, loading, isError, router]);

// //   return { user, loading, error };
// // }

// // // Exemplo de uso em componente
// // export function withAuth<P extends object>(
// //   WrappedComponent: React.ComponentType<P>
// // ) {
// //   return function WithAuthComponent(props: P) {
// //     const { user, loading } = useUser();
// //     if (loading) {
// //       return React.createElement('div', null, 'Carregando...');
// //     }

// //     if (!user) {
// //       return null; // O useEffect no useUser vai redirecionar
// //     }

// //     return React.createElement(WrappedComponent, props);
// //   };
// // }







// import { User } from "@/app/model/type";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function useUser() {
//   const router = useRouter();
//   const [redirecting, setRedirecting] = useState(false); // Adiciona um estado para evitar loop

//   const { data: user, isLoading: loading, isError } = useQuery<User | null>({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       const response = await fetch("/api/getauthuser");
//       if (!response.ok) throw new Error("Erro ao buscar o usuário");
//       return response.json();
//     },
//     retry: false, // Evita tentativas automáticas após erro
//   });

//   useEffect(() => {
//     if (!loading && !user && isError && !redirecting) {
//       setRedirecting(true);
//       router.push("/"); // Use router.push() ao invés de redirect() para evitar loops
//     }
//   }, [user, loading, isError, router, redirecting]);

//   return { user, loading };
// }


//import { User } from "@/app/model/type";
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
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  console.log({ user });

  return { user, loading, error, refetch };
}
