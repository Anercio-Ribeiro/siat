// // hooks/useUser.js
// import { useState, useEffect } from 'react';

// export function useUser() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/getauthuser');
//         if (response.ok) {
//           const data = await response.json();
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar o usuário:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchUser();
//   }, []);

//   return { user, loading };
// }


// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/model/type";

export function useUser() {
  const { data: user, isLoading: loading, isError, error } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await fetch("/api/getauthuser");
      if (!response.ok) throw new Error("Erro ao buscar o usuário");
      return response.json();
    },
    initialData: null,
  });

  if (isError) {
    console.error("Erro ao buscar o usuário:", error);
  }

  return { user, loading, error };
}


