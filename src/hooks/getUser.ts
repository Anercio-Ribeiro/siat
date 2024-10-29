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
import { User } from '@/app/model/type';
import { useState, useEffect } from 'react';


export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/getauthuser');
        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
