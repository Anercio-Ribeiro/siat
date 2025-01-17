
// // import { useEffect, useState } from "react";
// // import { useUser } from '@/hooks/getUser';
// // import { FavoritosService } from "@/app/services/favoritoService";
// // import { toast } from '@/hooks/use-toast';


// // export function useFavoritos(imovelId: string) {
// //     const { user, loading: userLoading } = useUser();
// //     const [isFavorited, setIsFavorited] = useState(false);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const favoritosService = new FavoritosService();
  
// //     useEffect(() => {
// //       async function checkFavorito() {
// //         if (user?.id) {
// //           try {
// //             const favoritos = await favoritosService.getFavoritos(user.id);
// //             setIsFavorited(favoritos.some(fav => fav.imovelId === imovelId));
// //           } catch (error) {
// //             toast({
// //               title: "Erro",
// //               description: "Não foi possível carregar os favoritos",
// //               variant: "destructive",
// //             });
// //           }
// //         }
// //         setIsLoading(false);
// //       }
  
// //       if (!userLoading) {
// //         checkFavorito();
// //       }
// //     }, [user, imovelId, userLoading]);
  
// //     const toggleFavorito = async () => {
// //         console.log('toggleFavorito clicado');
// //       if (!user) {
// //         toast({
// //           title: "Autenticação necessária",
// //           description: "Por favor, faça login para adicionar imóveis aos favoritos.",
// //           variant: "destructive",
// //         });
// //         console.log('Não auth. aqui clicado');
// //         return false;
// //       }
  
// //       try {
// //         const result = await favoritosService.toggleFavorito(user.id, imovelId);
// //         console.log('authenticado clicado', result);
// //         setIsFavorited(result);
// //         console.log('user: ', user.id, "Model: ", imovelId);
// //         console.log('authenticado clicado', result);
// //         return result;
// //       } catch (error) {
// //         toast({
// //           title: "Erro",
// //           description: "Ocorreu um erro ao processar sua solicitação.",
// //           variant: "destructive",
// //         });
// //         console.log('authenticado clicado');
// //         return false;
// //       }
// //     };
  
// //     return { 
// //       isFavorited, 
// //       isLoading: isLoading || userLoading, 
// //       toggleFavorito,
// //       isAuthenticated: !!user 
// //     };
// //   }
  
  










// // export function useFavoritos(imovelId: string) {
// //   const { user, loading: userLoading } = useUser();
// //   const [isFavorited, setIsFavorited] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const favoritosService = new FavoritosService();

// //   useEffect(() => {
// //     async function checkFavorito() {
// //       if (user?.id) {
// //         try {
// //           const favoritos = await favoritosService.getFavoritos(user.id);
// //           setIsFavorited(favoritos.some(fav => fav.imovelId === imovelId));
// //         } catch {
// //           toast({
// //             title: "Erro",
// //             description: "Não foi possível carregar os favoritos.",
// //             variant: "destructive",
// //           });
// //         }
// //       }
// //       setIsLoading(false);
// //     }

// //     if (!userLoading) {
// //       checkFavorito();
// //     }
// //   }, [user, imovelId, userLoading]);

// //   const toggleFavorito = async () => {
// //     if (!user) {
// //       toast({
// //         title: "Autenticação necessária",
// //         description: "Por favor, faça login para adicionar imóveis aos favoritos.",
// //         variant: "destructive",
// //       });
// //       return false;
// //     }

// //     try {
// //       const result = await favoritosService.toggleFavorito(user.id, imovelId);
// //       setIsFavorited(result);
// //       return result;
// //     } catch {
// //       toast({
// //         title: "Erro",
// //         description: "Erro ao processar sua solicitação.",
// //         variant: "destructive",
// //       });
// //       return false;
// //     }
// //   };

// //   return { 
// //     isFavorited, 
// //     isLoading: isLoading || userLoading, 
// //     toggleFavorito,
// //     isAuthenticated: !!user 
// //   };
// // }














// import { useEffect, useState } from "react";
// import { useUser } from '@/hooks/getUser';
// import { FavoritosService } from "@/app/services/favoritoService";
// import { toast } from '@/hooks/use-toast';

// export function useFavoritos(imovelId: string) {
//   const { user, loading: userLoading } = useUser();
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const favoritosService = new FavoritosService();

//   useEffect(() => {
//     async function checkFavorito() {
//       if (user?.id) {
//         try {
//           const favoritos = await favoritosService.getFavoritos(user.id);
//           setIsFavorited(favoritos.some(fav => fav.imovelId === imovelId));
//         } catch {
//           toast({
//             title: "Erro",
//             description: "Não foi possível carregar os favoritos.",
//             variant: "destructive",
//           });
//         }
//       }
//       setIsLoading(false);
//     }

//     if (!userLoading) {
//       checkFavorito();
//     }
//   }, [user, imovelId, userLoading]);

//   const toggleFavorito = async () => {
//     if (!user) {
//       toast({
//         title: "Autenticação necessária",
//         description: "Por favor, faça login para adicionar imóveis aos favoritos.",
//         variant: "destructive",
//       });
//       return false;
//     }

//     try {
//       const result = await favoritosService.toggleFavorito(user.id, imovelId);
//       setIsFavorited(result);
//       return result;
//     } catch {
//       toast({
//         title: "Erro",
//         description: "Erro ao processar sua solicitação.",
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   return { 
//     isFavorited, 
//     isLoading: isLoading || userLoading, 
//     toggleFavorito,
//     isAuthenticated: !!user 
//   };
// }





import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


import { toast } from 'sonner';
import { useUser } from './getUser';
import { FavoritosService } from '@/app/services/favoritoService';



const favoritesService = new FavoritosService();

export function useFavorites() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => (user ? favoritesService.getUserFavorites(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async ({ imovelId, isFavorited }: { imovelId: string; isFavorited: boolean }) => {
      if (!user) {
        throw new Error('User must be logged in');
      }
      await favoritesService.toggleFavorite(user.id, imovelId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
    },
    onError: (error) => {
      toast.error('Error updating favorites');
      console.error('Error updating favorites:', error);
    },
  });

  return {
    favorites,
    toggleFavorite,
    isAuthenticated: !!user,
  };
}