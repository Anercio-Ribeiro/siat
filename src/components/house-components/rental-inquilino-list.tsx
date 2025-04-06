// "use client";
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Info, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
// import { useUser } from "@/hooks/getUser";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Type definitions
// interface Rental {
//   id: string;
//   imovelId: string;
//   status: string;
//   checkIn: string;
//   checkOut: string;
//   periodoAluguel: number;
//   imovel: {
//     id: string;
//     titulo: string;
//     endereco: string;
//     preco: number;
//     numeroQuarto: number;
//     numeroCasaBanho: number;
//   };
//   inquilino: {
//     nome: string;
//   };
// }

// interface RentalsResponse {
//   rentals: Rental[];
//   total: number;
//   totalPages: number;
//   currentPage: number;
// }

// // Format date function
// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// // Format rental period
// const formatRentalPeriod = (days: number): string => {
//   if (days < 30) {
//     return `${days} dias`;
//   }
//   const months = Math.floor(days / 30);
//   return `${months} ${months === 1 ? "mês" : "meses"}`;
// };

// // Fetch rentals function ajustada para usar proprietarioId
// async function fetchRentals(
//   page: number,
//   pageSize: number,
//   proprietarioId: string
// ): Promise<RentalsResponse> {
//   try {
//     // Adicionar um delay artificial para mostrar o loading state
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     const response = await fetch(
//       `/api/user-alugueis?proprietarioId=${proprietarioId}&page=${page}&pageSize=${pageSize}`,
//       {
//         credentials: "include",
//       }
//     );

//     if (!response.ok) {
//       if (response.status === 401) {
//         throw new Error("Sessão inválida ou não autenticada");
//       }
//       const errorText = await response.text();
//       throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();
//     return {
//       rentals: data.rentals || data, // Ajustar conforme o formato retornado pelo GET
//       total: data.total || data.length || 0,
//       totalPages: data.totalPages || 1,
//       currentPage: data.currentPage || page,
//     };
//   } catch (error) {
//     console.error("Erro completo ao buscar aluguéis:", error);
//     throw error;
//   }
// }

// const RentalTenantListings: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchTrigger, setSearchTrigger] = useState<number>(0);
//   const [isPageChanging, setIsPageChanging] = useState(false);
//   const { user, loading: userLoading } = useUser();
//   const router = useRouter();

//   const {
//     data,
//     error,
//     isLoading,
//     isFetching,
//     refetch: refetchRentals,
//   } = useQuery({
//     queryKey: ["rentals", page, pageSize, searchTrigger, user?.id],
//     queryFn: () => fetchRentals(page, pageSize, user?.id || ""),
//     enabled: !!user && !isPageChanging && !!user?.id, // Só executa se user e id existirem
//     refetchOnWindowFocus: false,
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (user) {
//       setSearchTrigger((prev) => prev + 1);
//     }
//   }, [user]);

//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;

//     if (isPageChanging) {
//       timeoutId = setTimeout(() => {
//         setIsPageChanging(false);
//         setSearchTrigger((prev) => prev + 1); // Forçar refetch após o timeout
//       }, 1000);
//     }

//     return () => {
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [isPageChanging]);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     setIsPageChanging(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handlePageSizeChange = (value: string) => {
//     const newPageSize = Number(value);
//     setPageSize(newPageSize);
//     setPage(1);
//     setIsPageChanging(true);
//   };

//   const handleRentalClick = (rentalId: string) => {
//     router.push(`/detalhes/${rentalId}`);
//   };

//   if (userLoading || (isLoading && !isFetching && !isPageChanging)) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   if (!user?.id) {
//     return (
//       <Alert>
//         <AlertTitle>Erro</AlertTitle>
//         <AlertDescription>ID do proprietário não encontrado. Faça login novamente.</AlertDescription>
//       </Alert>
//     );
//   }

//   if (error) {
//     console.error("Rental fetch error:", error);
//     return (
//       <div className="text-red-500">
//         Erro ao carregar aluguéis: {error instanceof Error ? error.message : "Erro desconhecido"}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 space-y-4">
//       {(isFetching || isPageChanging) ? (
//         <div className="space-y-4">
//           <div className="flex justify-end mb-4">
//             <Skeleton className="h-10 w-[180px]" />
//           </div>
//           <div className="w-full">
//             <Skeleton className="h-10 w-full mb-2" />
//             {Array.from({ length: pageSize }).map((_, index) => (
//               <Skeleton key={index} className="h-12 w-full mb-2" />
//             ))}
//           </div>
//           <div className="mt-4 flex justify-between items-center">
//             <Skeleton className="h-10 w-24" />
//             <Skeleton className="h-6 w-32" />
//             <Skeleton className="h-10 w-24" />
//           </div>
//         </div>
//       ) : !data || !data.rentals || data.total === 0 ? (
//         <div className="flex items-center justify-center min-h-[50vh]">
//           <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//             <div className="flex items-center justify-center mb-2">
//               <Info className="h-6 w-6 text-blue-600" />
//             </div>
//             <AlertTitle className="font-bold text-lg text-gray-800">
//               Nenhum aluguel encontrado
//             </AlertTitle>
//             <AlertDescription className="text-gray-600">
//               Você ainda não possui nenhum aluguel registrado.
//             </AlertDescription>
//           </Alert>
//         </div>
//       ) : (
//         <>
//           <div className="flex justify-end mb-4">
//             <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Itens por página" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="10">10 por página</SelectItem>
//                 <SelectItem value="20">20 por página</SelectItem>
//                 <SelectItem value="30">30 por página</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID Imóvel</TableHead>
//                 <TableHead>Nome Proprietário</TableHead>
//                 <TableHead>Estado</TableHead>
//                 <TableHead>Check-In</TableHead>
//                 <TableHead>Check-Out</TableHead>
//                 <TableHead>Período</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.rentals.map((rental) => (
//                 <TableRow
//                   key={rental.id}
//                   onClick={() => handleRentalClick(rental.id)}
//                   className="cursor-pointer hover:bg-gray-100"
//                 >
//                   <TableCell>{rental.imovel.id.substring(0, 6)}</TableCell>
//                   <TableCell>{rental.inquilino.nome}</TableCell>
//                   <TableCell>
//                     <Badge
//                       style={{
//                         backgroundColor:
//                           rental.status === "pendente"
//                             ? "yellow"
//                             : rental.status === "ocupado"
//                             ? "blue"
//                             : rental.status === "disponivel"
//                             ? "green"
//                             : "gray",
//                         color: rental.status === "pendente" ? "black" : "white",
//                       }}
//                     >
//                       {rental.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{formatDate(rental.checkIn)}</TableCell>
//                   <TableCell>{formatDate(rental.checkOut)}</TableCell>
//                   <TableCell>{formatRentalPeriod(rental.periodoAluguel)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {data.total > 0 && (
//             <div className="mt-4 flex justify-between items-center">
//               <Button
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1 || isPageChanging}
//                 variant="outline"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 Anterior
//               </Button>
//               <span className="text-sm text-gray-600">
//                 Página {page} de {data.totalPages}
//               </span>
//               <Button
//                 onClick={() => handlePageChange(page + 1)}
//                 disabled={page >= data.totalPages || isPageChanging}
//                 variant="outline"
//               >
//                 Próxima
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RentalTenantListings;




// "use client";
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Info } from "lucide-react";
// import { useUser } from "@/hooks/getUser";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Rental {
//   id: string;
//   imovelId: string;
//   status: string;
//   checkIn: string;
//   checkOut: string;
//   periodoAluguel: number;
//   imovel: {
//     id: string;
//     titulo: string;
//     endereco: string;
//     preco: number;
//     numeroQuarto: number;
//     numeroCasaBanho: number;
//   };
//   inquilino: {
//     nome: string;
//   };
// }

// interface RentalsResponse {
//   rentals: Rental[];
//   total: number;
//   totalPages: number;
//   currentPage: number;
// }

// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// const formatRentalPeriod = (days: number): string => {
//   if (days < 30) return `${days} dias`;
//   const months = Math.floor(days / 30);
//   return `${months} ${months === 1 ? "mês" : "meses"}`;
// };

// async function fetchRentals(
//   page: number,
//   pageSize: number,
//   proprietarioId: string
// ): Promise<RentalsResponse> {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
//   const response = await fetch(
//     `/api/user-alugueis?proprietarioId=${proprietarioId}&page=${page}&pageSize=${pageSize}`,
//     { credentials: "include" }
//   );
//   if (!response.ok) {
//     if (response.status === 401) throw new Error("Sessão inválida ou não autenticada");
//     const errorText = await response.text();
//     throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
//   }
//   const data = await response.json();
//   return {
//     rentals: data.rentals || data,
//     total: data.total || data.length || 0,
//     totalPages: data.totalPages || 1,
//     currentPage: data.currentPage || page,
//   };
// }

// const RentalTenantListings: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchTrigger, setSearchTrigger] = useState(0);
//   const { user, loading: userLoading } = useUser();
//   const router = useRouter();

//   const { data, error, isLoading, isFetching } = useQuery({
//     queryKey: ["rentals", page, pageSize, searchTrigger, user?.id],
//     queryFn: () => fetchRentals(page, pageSize, user?.id || ""),
//     enabled: !!user && !!user?.id,
//     refetchOnWindowFocus: false,
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (user) setSearchTrigger((prev) => prev + 1);
//   }, [user]);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = (value: string) => {
//     setPageSize(Number(value));
//     setPage(1);
//   };

//   const handleRentalClick = (rentalId: string) => {
//     router.push(`/detalhes/${rentalId}`);
//   };

//   const getPageNumbers = () => {
//     if (!data?.totalPages) return [];
//     return Array.from({ length: data.totalPages }, (_, i) => i + 1);
//   };

//   const LoadingComponent = () => (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="flex flex-col items-center gap-2">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="text-lg text-blue-600">Carregando...</span>
//       </div>
//     </div>
//   );

//   if (userLoading || (isLoading && !isFetching)) return <LoadingComponent />;

//   if (!user?.id) return (
//     <Alert>
//       <AlertTitle>Erro</AlertTitle>
//       <AlertDescription>ID do proprietário não encontrado. Faça login novamente.</AlertDescription>
//     </Alert>
//   );

//   return (
//     <div className="p-4 space-y-4">
//       {isFetching ? (
//         <div className="space-y-4">
//           <div className="flex justify-end mb-4">
//             <Skeleton className="h-10 w-[180px] bg-blue-200" />
//           </div>
//           <div className="w-full">
//             <Skeleton className="h-10 w-full mb-2 bg-blue-200" />
//             {Array.from({ length: pageSize }).map((_, index) => (
//               <Skeleton key={index} className="h-12 w-full mb-2 bg-blue-200" />
//             ))}
//           </div>
//           <div className="mt-4 flex flex-col items-center gap-2">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             <span className="text-lg text-blue-600">Carregando...</span>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="text-red-500">
//           Erro: {error instanceof Error ? error.message : "Unknown error"}
//         </div>
//       ) : !data?.rentals?.length ? (
//         <Alert className="w-full max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//           <div className="flex items-center justify-center mb-2">
//             <Info className="h-6 w-6 text-blue-600" />
//           </div>
//           <AlertTitle className="font-bold text-lg text-gray-800">
//             Nenhum aluguel encontrado
//           </AlertTitle>
//           <AlertDescription className="text-gray-600">
//             Você ainda não possui nenhum aluguel registrado.
//           </AlertDescription>
//         </Alert>
//       ) : (
//         <>
//           <div className="flex justify-end mb-4">
//             <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Itens por página" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="10">10 por página</SelectItem>
//                 <SelectItem value="20">20 por página</SelectItem>
//                 <SelectItem value="30">30 por página</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID Imóvel</TableHead>
//                 <TableHead>Nome Proprietário</TableHead>
//                 <TableHead>Estado</TableHead>
//                 <TableHead>Check-In</TableHead>
//                 <TableHead>Check-Out</TableHead>
//                 <TableHead>Período</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.rentals.map((rental) => (
//                 <TableRow
//                   key={rental.id}
//                   onClick={() => handleRentalClick(rental.id)}
//                   className="cursor-pointer hover:bg-gray-100"
//                 >
//                   <TableCell>{rental.imovel.id.substring(0, 6)}</TableCell>
//                   <TableCell>{rental.inquilino.nome}</TableCell>
//                   <TableCell>
//                     <Badge
//                       style={{
//                         backgroundColor:
//                           rental.status === "pendente"
//                             ? "yellow"
//                             : rental.status === "ocupado"
//                             ? "blue"
//                             : rental.status === "disponivel"
//                             ? "green"
//                             : "gray",
//                         color: rental.status === "pendente" ? "black" : "white",
//                       }}
//                     >
//                       {rental.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{formatDate(rental.checkIn)}</TableCell>
//                   <TableCell>{formatDate(rental.checkOut)}</TableCell>
//                   <TableCell>{formatRentalPeriod(rental.periodoAluguel)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {data.totalPages > 1 && (
//             <div className="mt-6 flex justify-center items-center gap-2">
//               <Button
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//                 variant="outline"
//                 size="sm"
//               >
//                 Anterior
//               </Button>
//               <Button
//                 onClick={() => handlePageChange(1)}
//                 variant={page === 1 ? "default" : "outline"}
//                 size="sm"
//               >
//                 1
//               </Button>
//               {data.totalPages > 5 && page > 3 && <span>...</span>}
//               {getPageNumbers()
//                 .slice(Math.max(1, page - 2), Math.min(data.totalPages - 1, page + 1))
//                 .map((pageNum) =>
//                   pageNum !== 1 && pageNum !== data.totalPages ? (
//                     <Button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       variant={page === pageNum ? "default" : "outline"}
//                       size="sm"
//                     >
//                       {pageNum}
//                     </Button>
//                   ) : null
//                 )}
//               {data.totalPages > 5 && page < data.totalPages - 2 && <span>...</span>}
//               {data.totalPages > 1 && (
//                 <Button
//                   onClick={() => handlePageChange(data.totalPages)}
//                   variant={page === data.totalPages ? "default" : "outline"}
//                   size="sm"
//                 >
//                   {data.totalPages}
//                 </Button>
//               )}
//               <Button
//                 onClick={() => handlePageChange(page + 1)}
//                 disabled={page === data.totalPages}
//                 variant="outline"
//                 size="sm"
//               >
//                 Próxima
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RentalTenantListings;















// "use client";
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Bath, Bed, Heart, ChevronLeft, ChevronRight, Car, DollarSign, Flag, Home, MapPin, ParkingCircle, Map, Pin } from 'lucide-react';
// import { Info } from "lucide-react";
// import { useUser } from "@/hooks/getUser";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Rental {
//   id: string;
//   imovelId: string;
//   status: string;
//   checkIn: string;
//   checkOut: string;
//   periodoAluguel: number;
//   imovel: {
//     id: string;
//     titulo: string;
//     endereco: string;
//     preco: number;
//     numeroQuarto: number;
//     numeroCasaBanho: number;
//   };
//   inquilino: {
//     nome: string;
//   };
// }

// interface RentalsResponse {
//   rentals: Rental[];
//   total: number;
//   totalPages: number;
//   currentPage: number;
// }

// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// const formatRentalPeriod = (days: number): string => {
//   if (days < 30) return `${days} dias`;
//   const months = Math.floor(days / 30);
//   return `${months} ${months === 1 ? "mês" : "meses"}`;
// };

// async function fetchRentals(
//   page: number,
//   pageSize: number,
//   proprietarioId: string
// ): Promise<RentalsResponse> {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
//   const response = await fetch(
//     `/api/user-alugueis?proprietarioId=${proprietarioId}&page=${page}&pageSize=${pageSize}`,
//     { credentials: "include" }
//   );
//   if (!response.ok) {
//     if (response.status === 401) throw new Error("Sessão inválida ou não autenticada");
//     const errorText = await response.text();
//     throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
//   }
//   const data = await response.json();
//   return {
//     rentals: data.rentals || data,
//     total: data.total || data.length || 0,
//     totalPages: data.totalPages || 1,
//     currentPage: data.currentPage || page,
//   };
// }

// const RentalTenantListings: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchTrigger, setSearchTrigger] = useState(0);
//   const { user, loading: userLoading } = useUser();
//   const router = useRouter();

//   const { data, error, isLoading, isFetching } = useQuery({
//     queryKey: ["rentals", page, pageSize, searchTrigger, user?.id],
//     queryFn: () => fetchRentals(page, pageSize, user?.id || ""),
//     enabled: !!user && !!user?.id,
//     refetchOnWindowFocus: false,
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (user) setSearchTrigger((prev) => prev + 1);
//   }, [user]);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handlePageSizeChange = (value: string) => {
//     setPageSize(Number(value));
//     setPage(1);
//     setSearchTrigger((prev) => prev + 1);
//   };

//   const handleRentalClick = (rentalId: string) => {
//     router.push(`/detalhes/${rentalId}`);
//   };

//   const getPaginationItems = () => {
//     if (!data?.totalPages || data.totalPages <= 1) return [];

//     const totalPages = data.totalPages;
//     const items: (number | string)[] = [];

//     // Sempre adicionar a primeira página
//     items.push(1);

//     // Determinar as páginas intermediárias (máximo de 3)
//     let start = Math.max(2, page - 1);
//     let end = Math.min(totalPages - 1, start + 2); // Mostrar até 3 páginas no máximo

//     // Ajustar se estiver perto do fim
//     if (page > totalPages - 3) {
//       start = Math.max(2, totalPages - 3);
//       end = totalPages - 1;
//     }

//     // Adicionar páginas intermediárias
//     for (let i = start; i <= end; i++) {
//       items.push(i);
//     }

//     // Adicionar reticências e a última página, se necessário
//     if (end < totalPages - 1) {
//       items.push("...");
//       items.push(totalPages);
//     } else if (end === totalPages - 1 && totalPages > 1) {
//       items.push(totalPages);
//     }

//     return items;
//   };

//   const LoadingComponent = () => (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="flex flex-col items-center gap-2">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="text-lg text-blue-600">Carregando...</span>
//       </div>
//     </div>
//   );

//   if (userLoading || (isLoading && !isFetching)) return <LoadingComponent />;

//   if (!user?.id) return (
//     <Alert>
//       <AlertTitle>Erro</AlertTitle>
//       <AlertDescription>ID do proprietário não encontrado. Faça login novamente.</AlertDescription>
//     </Alert>
//   );

//   return (
//     <div className="p-4 space-y-4">
//       {isFetching ? (
//         <div className="space-y-4">
//           <div className="flex justify-end mb-4">
//             <Skeleton className="h-10 w-[180px] bg-blue-200" />
//           </div>
//           <div className="w-full">
//             <Skeleton className="h-10 w-full mb-2 bg-blue-200" />
//             {Array.from({ length: pageSize }).map((_, index) => (
//               <Skeleton key={index} className="h-12 w-full mb-2 bg-blue-200" />
//             ))}
//           </div>
//           <div className="mt-4 flex flex-col items-center gap-2">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             <span className="text-lg text-blue-600">Carregando...</span>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="text-red-500">
//           Erro: {error instanceof Error ? error.message : "Unknown error"}
//         </div>
//       ) : !data?.rentals?.length ? (
//         <Alert className="w-full max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//           <div className="flex items-center justify-center mb-2">
//             <Info className="h-6 w-6 text-blue-600" />
//           </div>
//           <AlertTitle className="font-bold text-lg text-gray-800">
//             Nenhum aluguel encontrado
//           </AlertTitle>
//           <AlertDescription className="text-gray-600">
//             Você ainda não possui nenhum aluguel registrado.
//           </AlertDescription>
//         </Alert>
//       ) : (
//         <>
//           <div className="flex justify-end mb-4">
//             <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Itens por página" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="10">10 por página</SelectItem>
//                 <SelectItem value="20">20 por página</SelectItem>
//                 <SelectItem value="30">30 por página</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID Imóvel</TableHead>
//                 <TableHead>Nome Proprietário</TableHead>
//                 <TableHead>Estado</TableHead>
//                 <TableHead>Check-In</TableHead>
//                 <TableHead>Check-Out</TableHead>
//                 <TableHead>Período</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.rentals.map((rental) => (
//                 <TableRow
//                   key={rental.id}
//                   onClick={() => handleRentalClick(rental.id)}
//                   className="cursor-pointer hover:bg-gray-100"
//                 >
//                   <TableCell>{rental.imovel.id.substring(0, 6)}</TableCell>
//                   <TableCell>{rental.inquilino.nome}</TableCell>
//                   <TableCell>
//                     <Badge
//                       style={{
//                         backgroundColor:
//                           rental.status === "pendente"
//                             ? "yellow"
//                             : rental.status === "ocupado"
//                             ? "blue"
//                             : rental.status === "disponivel"
//                             ? "green"
//                             : "gray",
//                         color: rental.status === "pendente" ? "black" : "white",
//                       }}
//                     >
//                       {rental.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{formatDate(rental.checkIn)}</TableCell>
//                   <TableCell>{formatDate(rental.checkOut)}</TableCell>
//                   <TableCell>{formatRentalPeriod(rental.periodoAluguel)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {data.totalPages > 1 && (
//             <div className="mt-6 flex justify-center items-center gap-2">
//               <Button
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//                 variant="outline"
//                 size="sm"
//               >
//                 <ChevronLeft className="w-3 h-3" /> Anterior
//               </Button>
//               {getPaginationItems().map((item, index) => (
//                 <React.Fragment key={index}>
//                   {typeof item === "number" ? (
//                     <Button
//                       onClick={() => handlePageChange(item)}
//                       variant={page === item ? "default" : "outline"}
//                       size="sm"
//                     >
//                       {item}
//                     </Button>
//                   ) : (
//                     <span className="text-gray-500">...</span>
//                   )}
//                 </React.Fragment>
//               ))}
//               <Button
//                 onClick={() => handlePageChange(page + 1)}
//                 disabled={page === data.totalPages}
//                 variant="outline"
//                 size="sm"
//               >
//                 Próxima 
//                 <ChevronRight className="w-3 h-3" />
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RentalTenantListings;














"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from "@/hooks/getUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Rental {
  id: string;
  imovelId: string;
  status: string;
  checkIn: string;
  checkOut: string;
  periodoAluguel: number;
  imovel: {
    id: string;
    titulo: string;
    endereco: string;
    preco: number;
    numeroQuarto: number;
    numeroCasaBanho: number;
  };
  inquilino: {
    nome: string;
  };
}

interface RentalsResponse {
  rentals: Rental[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatRentalPeriod = (days: number): string => {
  if (days < 30) return `${days} dias`;
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "mês" : "meses"}`;
};

async function fetchRentals(
  page: number,
  pageSize: number,
  proprietarioId: string
): Promise<RentalsResponse> {
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
  const response = await fetch(
    `/api/user-alugueis?proprietarioId=${proprietarioId}&page=${page}&pageSize=${pageSize}`,
    { credentials: "include" }
  );
  if (!response.ok) {
    if (response.status === 401) throw new Error("Sessão inválida ou não autenticada");
    const errorText = await response.text();
    throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  return {
    rentals: data.rentals || data,
    total: data.total || data.length || 0,
    totalPages: data.totalPages || 1,
    currentPage: data.currentPage || page,
  };
}

const RentalTenantListings: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["rentals", page, pageSize, searchTrigger, user?.id],
    queryFn: () => fetchRentals(page, pageSize, user?.id || ""),
    enabled: !!user && !!user?.id,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (user) setSearchTrigger((prev) => prev + 1);
  }, [user]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
    setSearchTrigger((prev) => prev + 1);
  };

  const handleRentalClick = (rentalId: string) => {
    router.push(`/detalhes/${rentalId}`);
  };

  const renderPageButtons = () => {
    if (!data?.totalPages || data.totalPages <= 1) return null;

    const maxButtons = 5; // Máximo de 5 botões numerados
    const totalPages = data.totalPages;
    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Ajustar startPage se endPage não preencher maxButtons
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const pageButtons = [];

    // Sempre mostrar a página 1
    if (startPage > 1) {
      pageButtons.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          variant={page === 1 ? "default" : "outline"}
          size="sm"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pageButtons.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Renderizar botões do intervalo
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={page === i ? "default" : "outline"}
          size="sm"
        >
          {i}
        </Button>
      );
    }

    // Adicionar reticências e "Última" se necessário
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="end-ellipsis">...</span>);
      }
      pageButtons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          variant={page === totalPages ? "default" : "outline"}
          size="sm"
        >
          Última
        </Button>
      );
    }

    return pageButtons;
  };

  const LoadingComponent = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="text-lg text-blue-600">Carregando...</span>
      </div>
    </div>
  );

  if (userLoading || (isLoading && !isFetching)) return <LoadingComponent />;

  if (!user?.id) return (
    <Alert>
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>ID do proprietário não encontrado. Faça login novamente.</AlertDescription>
    </Alert>
  );

  return (
    <div className="p-4 space-y-4">
      {isFetching ? (
        <div className="space-y-4">
          <div className="flex justify-end mb-4">
            <Skeleton className="h-10 w-[180px] bg-blue-200" />
          </div>
          <div className="w-full">
            <Skeleton className="h-10 w-full mb-2 bg-blue-200" />
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full mb-2 bg-blue-200" />
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="text-lg text-blue-600">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500">
          Erro: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      ) : !data?.rentals?.length ? (
        <Alert className="w-full max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
          <div className="flex items-center justify-center mb-2">
            <Info className="h-6 w-6 text-blue-600" />
          </div>
          <AlertTitle className="font-bold text-lg text-gray-800">
            Nenhum aluguel encontrado
          </AlertTitle>
          <AlertDescription className="text-gray-600">
            Você ainda não possui nenhum aluguel registrado.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Itens por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 por página</SelectItem>
                <SelectItem value="20">20 por página</SelectItem>
                <SelectItem value="30">30 por página</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Imóvel</TableHead>
                <TableHead>Nome Proprietário</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Período</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rentals.map((rental) => (
                <TableRow
                  key={rental.id}
                  onClick={() => handleRentalClick(rental.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{rental.imovel.id.substring(0, 6)}</TableCell>
                  <TableCell>{rental.inquilino.nome}</TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor:
                          rental.status === "pendente"
                            ? "yellow"
                            : rental.status === "ocupado"
                            ? "blue"
                            : rental.status === "disponivel"
                            ? "green"
                            : "gray",
                        color: rental.status === "pendente" ? "black" : "white",
                      }}
                    >
                      {rental.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(rental.checkIn)}</TableCell>
                  <TableCell>{formatDate(rental.checkOut)}</TableCell>
                  <TableCell>{formatRentalPeriod(rental.periodoAluguel)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {data.totalPages > 1 && (
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                {renderPageButtons()}
                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === data.totalPages}
                  variant="outline"
                  size="sm"
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-600">
                Página {page} de {data.totalPages} ({data.total} resultados)
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentalTenantListings;