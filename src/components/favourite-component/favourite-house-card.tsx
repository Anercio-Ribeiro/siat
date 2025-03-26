// // "use client";

// // import { Badge, Bath, Bed, Car, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
// // import { Card, CardContent, CardFooter } from "../ui/card";
// // import { Button } from "../ui/button";
// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { useUser } from "@/hooks/getUser";
// // import { toast } from "sonner";


// // // Use the flat FavoriteImovel type
// // export interface FavoriteWithImovel {
// //     id: string;
// //     userId: string;
// //     criadoEm: string;
// //     atualizadoEm: string;
// //     imovelId: string;
// //     countFavoritos: number;
// //     imovel: {
// //       id: string;
// //       titulo: string;
// //       preco: number;
// //       provincia: string;
// //       bairro: string;
// //       numeroQuarto: number;
// //       numeroCasaBanho: number;
// //       tipologia: string;
// //       garagem: number;
// //       imagens?: { url: string }[];
// //     };
// //   }

// // export default function FavoriteCard({ imovel }: { imovel: FavoriteWithImovel }) {

// // const [currentImageIndex, setCurrentImageIndex] = useState(0);
// // const [isModalOpen, setIsModalOpen] = useState(false);
// // const [isLoading, setIsLoading] = useState(true);
// // const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
// // const { user } = useUser();
// // const [isFavorited, setIsFavorited] = useState(true);


// //   console.log("Imovel prop in FavoriteCard:", imovel); // Debug: Log imovel prop
// //   console.log("Imagens in FavoriteCard:", imovel.imovel.imagens); // Debug: Log images

// //   const handleNextImage = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex((prevIndex) =>
// //       prevIndex === ((imovel.imovel.imagens?.length || 1) - 1) ? 0 : prevIndex + 1
// //     );
// //   };

// //   const handlePreviousImage = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex((prevIndex) =>
// //       prevIndex === 0 ? ((imovel.imovel.imagens?.length || 1) - 1) : prevIndex - 1
// //     );
// //   };


// //   useEffect(() => {
// //       const checkFavoriteStatus = async () => {
// //         if (user?.id) {
// //           try {
// //             const response = await fetch(`/api/favorites?userId=${user.id}&imovelId=${imovel.id}`);
// //             const data = await response.json();
// //             setIsFavorited(data.isFavorite);
// //           } catch (error) {
// //             console.error('Erro ao verificar status do favorito:', error);
// //           }
// //         }
// //       };
// //       checkFavoriteStatus();
// //     }, [user?.id, imovel.id]);
  
// //     const toggleFavorite = async (e: React.MouseEvent) => {
// //       e.stopPropagation();
      
// //       if (!user) {
// //         setIsAuthDialogOpen(true);
// //         return;
// //       }
  
// //       try {
// //         const response = await fetch('/api/favorites', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             userId: user.id,
// //             imovelId: imovel.id,
// //           }),
// //         });
  
// //         const data = await response.json();
// //         setIsFavorited(data.isFavorite);
// //         data.isFavorite ? toast.success('Adicionado aos favoritos') : toast.error('Removido dos favoritos');
// //       } catch (error) {
// //         console.error('Erro ao toggle favorito:', error);
// //       }
// //     };

// //       const currentImageUrl =
// //       Array.isArray(imovel.imovel.imagens) && imovel.imovel.imagens.length > 0
// //         ? imovel.imovel.imagens[currentImageIndex].url
// //         : "/imoveis/img/11.jpg";

// //   return (
// //     <Card className="max-w-lg w-full rounded-md mt-6 relative">
// //       <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
// //         <Image
// //           src={currentImageUrl}
// //           alt={imovel.imovel.titulo || "Sem título"}
// //           className="w-full h-full object-cover rounded-md transition-transform duration-700 ease-in-out"
// //           fill
// //           style={{ objectFit: "cover" }}
// //         />
// //          <div
// //               onClick={toggleFavorite}
// //               className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${
// //                 isFavorited ? "bg-white" : ""
// //               }`}
// //             >
// //               <Heart
// //                 className={`w-6 h-6 ${
// //                   isFavorited ? "fill-red-600 text-red-600" : "text-red-600"
// //                 }`}
// //               />
// //             </div>
// //         {Array.isArray(imovel.imovel.imagens) && imovel.imovel.imagens.length > 1 && (
// //           <>
// //             <Button
// //               onClick={handlePreviousImage}
// //               className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
// //             >
// //               <ChevronLeft className="w-3 h-3" />
// //             </Button>
// //             <Button
// //               onClick={handleNextImage}
// //               className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
// //             >
// //               <ChevronRight className="w-3 h-3" />
// //             </Button>
// //           </>
// //         )}
// //       </CardContent>
// //       <div className="p-2">
// //         <div className="flex justify-between items-center">
// //           <div className="text-sm font-bold">{imovel.imovel.titulo || "Título não disponível"}</div>
// //           <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
// //             {imovel.imovel.preco ? `${imovel.imovel.preco} AKZ` : "Preço não disponível"}
// //           </Badge>
// //         </div>
// //         <div className="flex items-center text-sm text-muted-foreground mt-1">
// //           <MapPin className="w-4 h-4 mr-1" />
// //           {imovel.imovel.provincia && imovel.imovel.bairro
// //             ? `${imovel.imovel.provincia} - ${imovel.imovel.bairro}`
// //             : "Localização não disponível"}
// //         </div>
// //       </div>
// //       <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
// //         <div className="text-xs font-bold">{imovel.imovel.tipologia || "Tipologia não disponível"}</div>
// //         <div className="flex space-x-4">
// //           <div className="flex items-center">
// //             <Bed className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
// //             <span className="text-sm font-bold ml-1 -mt-1">{imovel.imovel.numeroQuarto ?? "N/A"}</span>
// //           </div>
// //           <div className="flex items-center">
// //             <Bath className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
// //             <span className="text-sm font-bold ml-1 -mt-1">{imovel.imovel.numeroCasaBanho ?? "N/A"}</span>
// //           </div>
// //           <div className="flex items-center">
// //             <Car className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
// //             <span className="text-sm font-bold ml-1 -mt-1">{imovel.imovel.garagem ? "1" : "0"}</span>
// //           </div>
// //         </div>
// //       </CardFooter>
// //     </Card>
// //   );
// // }





// // // src/components/favourite-component/favourite-house-card.tsx
// // "use client";

// // import { Badge, Bath, Bed, Car, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
// // import { Card, CardContent, CardFooter } from "../ui/card";
// // import { Button } from "../ui/button";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import { useUser } from "@/hooks/getUser";
// // import { toast } from "sonner";
// // import { useRouter } from "next/navigation";
// // import { Skeleton } from "../ui/skeleton";

// // // Define the FavoriteWithImovel type
// // export interface FavoriteWithImovel {
// //   id: string;
// //   userId: string;
// //   criadoEm: string;
// //   atualizadoEm: string;
// //   imovelId: string;
// //   countFavoritos: number;
// //   imovel: {
// //     id: string;
// //     titulo: string;
// //     preco: number;
// //     provincia: string;
// //     bairro: string;
// //     numeroQuarto: number;
// //     numeroCasaBanho: number;
// //     tipologia: string;
// //     garagem: number;
// //     imagens?: { url: string }[];
// //   };
// // }

// // export default function FavoriteCard({ imovel }: { imovel: FavoriteWithImovel }) {
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
// //   const { user } = useUser();
// //   const [isFavorited, setIsFavorited] = useState(true); // Default to true since it’s a favorite
// //   const router = useRouter();

// //   // Extract nested imovel for easier access
// //   const property = imovel.imovel;

// //   console.log("Imovel prop in FavoriteCard:", imovel); // Debug: Log full imovel
// //   console.log("Imagens in FavoriteCard:", property.imagens); // Debug: Log images

// //   // Simulate loading for modal
// //   useEffect(() => {
// //     if (isModalOpen) {
// //       setIsLoading(true);
// //       const timer = setTimeout(() => {
// //         setIsLoading(false);
// //       }, 1500);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [isModalOpen]);

// //   // Check favorite status on mount
// //   useEffect(() => {
// //     const checkFavoriteStatus = async () => {
// //       if (user?.id) {
// //         try {
// //           const response = await fetch(`/api/favorites?userId=${user.id}&imovelId=${property.id}`);
// //           const data = await response.json();
// //           setIsFavorited(data.isFavorite);
// //         } catch (error) {
// //           console.error("Erro ao verificar status do favorito:", error);
// //         }
// //       }
// //     };
// //     checkFavoriteStatus();
// //   }, [user?.id, property.id]);

// //   const handleCardClick = () => {
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   const toggleFavorite = async (e: React.MouseEvent) => {
// //     e.stopPropagation();

// //     if (!user) {
// //       setIsAuthDialogOpen(true);
// //       return;
// //     }

// //     try {
// //       const response = await fetch("/api/favorites", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           userId: user.id,
// //           imovelId: property.id,
// //         }),
// //       });

// //       const data = await response.json();
// //       setIsFavorited(data.isFavorite);
// //       data.isFavorite
// //         ? toast.success("Adicionado aos favoritos")
// //         : toast.error("Removido dos favoritos");
// //     } catch (error) {
// //       console.error("Erro ao toggle favorito:", error);
// //     }
// //   };

// //   const handleNextImage = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex((prevIndex) =>
// //       prevIndex === ((property.imagens?.length || 0) - 1) ? 0 : prevIndex + 1
// //     );
// //   };

// //   const handlePreviousImage = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex((prevIndex) =>
// //       prevIndex === 0 ? ((property.imagens?.length || 0) - 1) : prevIndex - 1
// //     );
// //   };

// //   const handleImageChange = (index: number, e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setCurrentImageIndex(index);
// //   };

// //   const currentImageUrl =
// //     Array.isArray(property.imagens) && property.imagens.length > 0
// //       ? property.imagens[currentImageIndex].url
// //       : "/imoveis/img/placeholder.jpg";

// //   return (
// //     <>
// //       <div onClick={handleCardClick} className="cursor-pointer">
// //         <Card className="max-w-lg w-full rounded-md mt-6 relative">
// //           <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
// //             <Image
// //               src={currentImageUrl}
// //               alt={property.titulo || "Sem título"}
// //               className="w-full h-full object-cover rounded-md transition-transform duration-700 ease-in-out transform-gpu"
// //               fill
// //               style={{ objectFit: "cover" }}
// //             />
// //             <div
// //               onClick={toggleFavorite}
// //               className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${
// //                 isFavorited ? "bg-white" : ""
// //               }`}
// //             >
// //               <Heart
// //                 className={`w-6 h-6 ${
// //                   isFavorited ? "fill-red-600 text-red-600" : "text-red-600"
// //                 }`}
// //               />
// //             </div>
// //             {Array.isArray(property.imagens) && property.imagens.length > 1 && (
// //               <>
// //                 <Button
// //                   onClick={handlePreviousImage}
// //                   className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
// //                 >
// //                   <ChevronLeft className="w-3 h-3" />
// //                 </Button>
// //                 <Button
// //                   onClick={handleNextImage}
// //                   className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
// //                 >
// //                   <ChevronRight className="w-3 h-3" />
// //                 </Button>
// //                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
// //                   {property.imagens.map((_, index) => (
// //                     <div
// //                       key={index}
// //                       onClick={(e) => handleImageChange(index, e)}
// //                       className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
// //                         index === currentImageIndex ? "bg-white" : "bg-gray-400"
// //                       }`}
// //                     />
// //                   ))}
// //                 </div>
// //               </>
// //             )}
// //           </CardContent>
// //           <div className="p-2">
// //             <div className="flex justify-between items-center">
// //               <div className="text-sm font-bold">{property.titulo || "Título não disponível"}</div>
// //               <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
// //                 {property.preco ? `${property.preco} AKZ` : "Preço não disponível"}
// //               </Badge>
// //             </div>
// //             <div className="flex items-center text-sm text-muted-foreground mt-1">
// //               <MapPin className="w-4 h-4 mr-1" />
// //               {property.provincia && property.bairro
// //                 ? `${property.provincia} - ${property.bairro}`
// //                 : "Localização não disponível"}
// //             </div>
// //           </div>
// //           <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
// //             <div className="text-xs font-bold">{property.tipologia || "Tipologia não disponível"}</div>
// //             <div className="flex space-x-4">
// //               <div className="flex items-center">
// //                 <Bed className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
// //                 <span className="text-sm font-bold ml-1 -mt-1">{property.numeroQuarto ?? "N/A"}</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <Bath className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
// //                 <span className="text-sm font-bold ml-1 -mt-1">{property.numeroCasaBanho ?? "N/A"}</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <Car className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
// //                 <span className="text-sm font-bold ml-1 -mt-1">{property.garagem ? "1" : "0"}</span>
// //               </div>
// //             </div>
// //           </CardFooter>
// //         </Card>
// //       </div>

// //       {isModalOpen && (
// //         <Dialog open={isModalOpen} onOpenChange={closeModal}>
// //           <DialogContent className="max-w-6xl h-[80vh] flex">
// //             {/* Replace with your DialogContentComponent if needed */}
// //             <div>
// //               {isLoading ? (
// //                 <Skeleton className="w-full h-full" />
// //               ) : (
// //                 <div>
// //                   <h2>{property.titulo}</h2>
// //                   <p>Details about {property.titulo} would go here.</p>
// //                 </div>
// //               )}
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       )}

// //       <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Autenticação Necessária</DialogTitle>
// //             <DialogDescription>
// //               Apenas usuários autenticados podem adicionar ou remover imóveis da lista de favoritos. Por favor, faça login ou crie uma conta para usar esta funcionalidade.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button
// //               onClick={() => {
// //                 setIsAuthDialogOpen(false);
// //                 router.push("/authenticate");
// //               }}
// //             >
// //               Ir para Autenticação
// //             </Button>
// //             <Button variant="outline" onClick={() => setIsAuthDialogOpen(false)}>
// //               Cancelar
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }







// // src/components/favourite-component/favourite-house-card.tsx
// "use client";

// import { Badge, Bath, Bed, Car, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useUser } from "@/hooks/getUser";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { ImovelLDto } from "@/app/model/type";

// // Define the FavoriteWithImovel type
// export interface FavoriteWithImovel {
//   id: string;
//   userId: string;
//   criadoEm: string;
//   atualizadoEm: string;
//   imovelId: string;
//   countFavoritos: number;
//   imovel: {
//     id: string;
//     titulo: string;
//     preco: number;
//     provincia: string;
//     bairro: string;
//     numeroQuarto: number;
//     numeroCasaBanho: number;
//     tipologia: string;
//     garagem: number;
//     imagens?: { url: string }[];
//   };
// }

// export default function FavoriteCard({ imovel }: { imovel: ImovelLDto}) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
//   const { user } = useUser();
//   const [isFavorited, setIsFavorited] = useState(true); // Default to true since it’s a favorite
//   const router = useRouter();

//   // Extract nested imovel for easier access
//   const property = imovel;

//   console.log("Imovel prop in FavoriteCard:", imovel); // Debug: Log full imovel
//   console.log("Imagens in FavoriteCard:", property.imagens); // Debug: Log images

//   // Simulate loading for modal
//   useEffect(() => {
//     if (isModalOpen) {
//       setIsLoading(true);
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [isModalOpen]);

//   // Check favorite status on mount
//   useEffect(() => {
//     const checkFavoriteStatus = async () => {
//       if (user?.id) {
//         try {
//           const response = await fetch(`/api/favorites?userId=${user.id}&imovelId=${property.id}`);
//           const data = await response.json();
//           setIsFavorited(data.isFavorite);
//         } catch (error) {
//           console.error("Erro ao verificar status do favorito:", error);
//         }
//       }
//     };
//     checkFavoriteStatus();
//   }, [user?.id, property.id]);

//   const handleCardClick = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleFavorite = async (e: React.MouseEvent) => {
//     e.stopPropagation();

//     if (!user) {
//       setIsAuthDialogOpen(true);
//       return;
//     }

//     try {
//       const response = await fetch("/api/favorites", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user.id,
//           imovelId: property.id,
//         }),
//       });

//       const data = await response.json();
//       setIsFavorited(data.isFavorite);
//       data.isFavorite
//         ? toast.success("Adicionado aos favoritos")
//         : toast.error("Removido dos favoritos");
//     } catch (error) {
//       console.error("Erro ao toggle favorito:", error);
//     }
//   };

//   const handleNextImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === ((property.imagens?.length || 0) - 1) ? 0 : prevIndex + 1
//     );
//   };

//   const handlePreviousImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? ((property.imagens?.length || 0) - 1) : prevIndex - 1
//     );
//   };

//   const handleImageChange = (index: number, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCurrentImageIndex(index);
//   };

// //   const currentImageUrl =
// //     Array.isArray(property.imagens) && property.imagens.length > 0
// //       ? property.imagens[currentImageIndex].url
// //       : "/imoveis/img/placeholder.jpg";

// const currentImageUrl =
// Array.isArray(imovel.imagens) && imovel.imagens.length > 0
//   ? imovel.imagens[currentImageIndex].url
//   : "/imoveis/img/11.jpg";

//   return (
//     <>
//       <div onClick={handleCardClick} className="cursor-pointer">
//         <Card className="max-w-lg w-full rounded-md mt-6 relative">
//           <CardContent className="relative w-full h-52 rounded-md overflow-hidden group">
//             <Image
//               src={currentImageUrl}
//               alt={property.titulo || "Sem título"}
//               className="w-full h-full object-cover rounded-md transition-transform duration-700 ease-in-out transform-gpu"
//               fill
//               style={{ objectFit: "cover" }}
//             />
//             <div
//               onClick={toggleFavorite}
//               className={`absolute top-2 right-2 cursor-pointer p-1 rounded-md ${
//                 isFavorited ? "bg-white" : ""
//               }`}
//             >
//               <Heart
//                 className={`w-6 h-6 ${
//                   isFavorited ? "fill-red-600 text-red-600" : "text-red-600"
//                 }`}
//               />
//             </div>
//             {Array.isArray(property.imagens) && property.imagens.length > 1 && (
//               <>
//                 <Button
//                   onClick={handlePreviousImage}
//                   className="w-7 h-7 flex justify-center items-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
//                 >
//                   <ChevronLeft className="w-3 h-3" />
//                 </Button>
//                 <Button
//                   onClick={handleNextImage}
//                   className="w-7 h-7 flex justify-center items-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-0 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
//                 >
//                   <ChevronRight className="w-3 h-3" />
//                 </Button>
//                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                   {property.imagens.map((_, index) => (
//                     <div
//                       key={index}
//                       onClick={(e) => handleImageChange(index, e)}
//                       className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
//                         index === currentImageIndex ? "bg-white" : "bg-gray-400"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </CardContent>
//           <div className="p-2">
//             <div className="flex justify-between items-center">
//               <div className="text-sm font-bold">{property.titulo || "Título não disponível"}</div>
//               <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
//                 {property.preco ? `${imovel.preco} AKZ` : "Preço não disponível"}
//               </Badge>
//             </div>
//             <div className="flex items-center text-sm text-muted-foreground mt-1">
//               <MapPin className="w-4 h-4 mr-1" />
//               {property.provincia && property.bairro
//                 ? `${property.provincia} - ${property.bairro}`
//                 : "Localização não disponível"}
//             </div>
//           </div>
//           <CardFooter className="flex justify-between items-center bg-blue-50 p-2">
//             <div className="text-xs font-bold">{property.tipologia || "Tipologia não disponível"}</div>
//             <div className="flex space-x-4">
//               <div className="flex items-center">
//                 <Bed className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//                 <span className="text-sm font-bold ml-1 -mt-1">{property.numeroQuarto ?? "N/A"}</span>
//               </div>
//               <div className="flex items-center">
//                 <Bath className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//                 <span className="text-sm font-bold ml-1 -mt-1">{property.numeroCasaBanho ?? "N/A"}</span>
//               </div>
//               <div className="flex items-center">
//                 <Car className="w-6 h-6 bg-blue-500 text-white p-1 rounded-md" />
//                 <span className="text-sm font-bold ml-1 -mt-1">{property.garagem ? "1" : "0"}</span>
//               </div>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>

//       {isModalOpen && (
//         <Dialog open={isModalOpen} onOpenChange={closeModal}>
//           <DialogContent className="max-w-6xl h-[80vh] flex">
//             {/* Placeholder content; replace with DialogContentComponent if available */}
//             <div>
//               {isLoading ? (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//                 </div>
//               ) : (
//                 <div className="p-4">
//                   <h2 className="text-2xl font-bold">{property.titulo}</h2>
//                   <p className="text-muted-foreground">
//                     Detalhes sobre {property.titulo} seriam exibidos aqui.
//                   </p>
//                   <p>Preço: {property.preco} AKZ</p>
//                   <p>Localização: {property.provincia} - {property.bairro}</p>
//                 </div>
//               )}
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}

//       <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Autenticação Necessária</DialogTitle>
//             <DialogDescription>
//               Apenas usuários autenticados podem adicionar ou remover imóveis da lista de favoritos. Por favor, faça login ou crie uma conta para usar esta funcionalidade.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               onClick={() => {
//                 setIsAuthDialogOpen(false);
//                 router.push("/authenticate");
//               }}
//             >
//               Ir para Autenticação
//             </Button>
//             <Button variant="outline" onClick={() => setIsAuthDialogOpen(false)}>
//               Cancelar
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }