// import { useUser } from "@/hooks/getUser";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import { Skeleton } from "../ui/skeleton";
// import { useFavorites } from "@/hooks/useFavoritos";
// import { AlertCircle } from "lucide-react";
// import { Card } from "../ui/card";
// import FavoriteCard from "./favourite-house-card";

// export function FavoritesList() {
//     const { user, loading: userLoading } = useUser();
//     const { favorites, loading: favoritesLoading, isAuthenticated } = useFavorites();
  
//     if (userLoading || favoritesLoading) {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton key={index} className="h-96 w-full rounded-md" />
//           ))}
//         </div>
//       );
//     }
  
//     if (!isAuthenticated || user?.role !== "INQUILINO") {
//       return (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Acesso Restrito</AlertTitle>
//           <AlertDescription>
//             {isAuthenticated
//               ? "Apenas usuários com o papel de INQUILINO podem visualizar a lista de favoritos."
//               : "Por favor, faça login como INQUILINO para visualizar seus favoritos."}
//           </AlertDescription>
//         </Alert>
//       );
//     }
  
//     if (favorites.length === 0) {
//       return (
//         <Card className="p-6 text-center">
//           <h3 className="text-lg font-semibold mb-2">Nenhum Favorito Encontrado</h3>
//           <p className="text-muted-foreground">
//             Você ainda não adicionou nenhum imóvel à sua lista de favoritos.
//           </p>
//         </Card>
//       );
//     }
  
//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold">Meus Favoritos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {favorites?.map((imovel) => (
//             <FavoriteCard key={imovel.id} imovel={imovel} />
//           ))}
//         </div>
//       </div>
//     );
//   }