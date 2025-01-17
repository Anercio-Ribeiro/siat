// utils/getAuthenticatedUser.ts
import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function getAuthenticatedUser() {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;

    if (!sessionId) {
        return null;
        
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
        throw new Error("Sessão inválida");
    }

    const utilizadorService = new UtilizadorService();
    const dbUser = await utilizadorService.encontrarUtilizadorPorId(user.id);

    if (!dbUser) {
        throw new Error("Proprietário não encontrado");
    }

    return dbUser; // Retorna o usuário completo do banco de dados
}


// import { User } from "@/app/model/type";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export function useUser() {
//   const router = useRouter();
  
//   const { 
//     data: user, 
//     isLoading: loading, 
//     isError,
//     error,
//     refetch 
//   } = useQuery<User | null>({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       try {
//         const response = await fetch("/api/getauthuser");
//         if (!response.ok) {
//           if (response.status === 401) {
//             return null;
//           }
//           throw new Error("Erro ao buscar o usuário");
//         }
//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error("Erro na requisição:", error);
//         throw error;
//       }
//     },
//     retry: 1,
//     staleTime: 1000 * 60, // Cache por 1 minuto
//     gcTime: 1000 * 60 * 5, // Manter no cache por 5 minutos
//     refetchOnWindowFocus: true, // Importante para manter o estado sincronizado
//     refetchOnMount: true,
//     refetchOnReconnect: true,
//   });

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   return { user, loading, error, refetch };
// }