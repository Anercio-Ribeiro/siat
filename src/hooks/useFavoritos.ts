// // src/hooks/useFavoritos.ts
// "use client";

// import { FavoriteImovel } from "@/app/model/type";
// import { FavoriteWithImovel } from "@/components/favourite-component/favourite-house-card";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// export const useFavorites = () => {
//   const [favorites, setFavorites] = useState<FavoriteWithImovel[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/favorites/favourite-list", {
//           credentials: "include", // Ensure cookies are sent
//         });
//         if (!response.ok) {
//           if (response.status === 401) {
//             setIsAuthenticated(false);
//             return;
//           }
//           throw new Error("Falha ao buscar favoritos");
//         }
//         const data = await response.json();
//         console.log("Favorites fetched:", data.favorites); // Debug
//         setFavorites(data.favorites || []);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//         toast.error("Erro ao carregar favoritos");
//         setFavorites([]);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return { favorites, loading, isAuthenticated };
// };






"use client";

import { Favorite, ImovelLDto } from "@/app/model/type";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/favorites/favourite-list", {
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401) {
            setIsAuthenticated(false);
            return;
          }
          throw new Error("Falha ao buscar favoritos");
        }
        const data = await response.json();
        console.log("Favorites fetched:", data.favorites);
        setFavorites(data.favorites || []);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Erro ao carregar favoritos");
        setFavorites([]);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { favorites, loading, isAuthenticated };
};


// // src/hooks/useFavoritos.ts
// import { ImovelLDto } from "@/app/model/type";
// import { useState, useEffect } from "react";
//  // Adjust path

// export interface Favorite {
//   id: string;
//   userId: string;
//   criadoEm: string;
//   atualizadoEm: string;
//   imovelId: string;
//   countFavoritos: number;
//   imovel: ImovelLDto;
// }

// export function useFavorites() {
//   const [favorites, setFavorites] = useState<Favorite[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/favorites/favourite-list");
//         const data: Favorite[] = await response.json();
//         setFavorites(data);
//         setIsAuthenticated(true); // Adjust based on your auth logic
//       } catch (error) {
//         console.error("Failed to fetch favorites:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return { favorites, loading, isAuthenticated };
// }