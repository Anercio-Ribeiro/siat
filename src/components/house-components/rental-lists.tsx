
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

// // Fetch rentals function
// async function fetchRentals(page: number, pageSize: number): Promise<RentalsResponse> {
//   try {
//     // Adicionar um delay artificial para mostrar o loading state
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     const response = await fetch(`/api/user-alugueis?page=${page}&pageSize=${pageSize}`, {
//       credentials: "include",
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         throw new Error("Sessão inválida ou não autenticada");
//       }
//       const errorText = await response.text();
//       throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();
//     return {
//       rentals: data.rentals || [],
//       total: data.total || 0,
//       totalPages: data.totalPages || 1,
//       currentPage: data.currentPage || page,
//     };
//   } catch (error) {
//     console.error("Erro completo ao buscar aluguéis:", error);
//     throw error;
//   }
// }

// const RentalListings: React.FC = () => {
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
//     queryKey: ["rentals", page, pageSize, searchTrigger],
//     queryFn: () => fetchRentals(page, pageSize),
//     enabled: !!user && !isPageChanging,
//     refetchOnWindowFocus: false,
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (user) {
//       setSearchTrigger((prev) => prev + 1);
//     }
//   }, [user]);

//   // Efeito para processar a mudança de página com timeout
//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;
    
//     if (isPageChanging) {
//       timeoutId = setTimeout(() => {
//         setIsPageChanging(false);
//         setSearchTrigger((prev) => prev + 1); // Forçar refetch após o timeout
//       }, 1000); // Tempo de espera de 1 segundo
//     }
    
//     return () => {
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [isPageChanging]);

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     setIsPageChanging(true); // Ativar o estado de mudança de página
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handlePageSizeChange = (value: string) => {
//     const newPageSize = Number(value);
//     setPageSize(newPageSize);
//     setPage(1); // Resetar para a primeira página
//     setIsPageChanging(true); // Ativar o estado de mudança de página
//   };

//   const handleRentalClick = (rentalId: string) => {
//     router.push(`/detalhes/${rentalId}`);
//   };

//   // Mostrar loading apenas durante o carregamento inicial do usuário
//   if (userLoading || (isLoading && !isFetching && !isPageChanging)) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
//       </div>
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
//       {/* Mostrar skeleton quando estiver buscando ou durante a mudança de página */}
//       {(isFetching || isPageChanging) ? (
//         <div className="space-y-4">
//           <div className="flex justify-end mb-4">
//             <Skeleton className="h-10 w-[180px]" />
//           </div>
          
//           <div className="w-full">
//             <Skeleton className="h-10 w-full mb-2" /> {/* Cabeçalho da tabela */}
//             {Array.from({ length: pageSize }).map((_, index) => (
//               <Skeleton key={index} className="h-12 w-full mb-2" />
//             ))}
//           </div>
          
//           <div className="mt-4 flex justify-between items-center">
//             <Skeleton className="h-10 w-24" /> {/* Botão anterior */}
//             <Skeleton className="h-6 w-32" />  {/* Texto de paginação */}
//             <Skeleton className="h-10 w-24" /> {/* Botão próxima */}
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
//                 <TableHead>Status</TableHead>
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

// export default RentalListings;








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
import { Info, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from "@/hooks/getUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definitions
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

// Format date function
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Format rental period
const formatRentalPeriod = (days: number): string => {
  if (days < 30) {
    return `${days} dias`;
  }
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? "mês" : "meses"}`;
};

// Fetch rentals function based on user role
async function fetchRentals(
  userId: string,
  role: string,
  page: number,
  pageSize: number
): Promise<RentalsResponse> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Delay artificial

    const endpoint =
      role === "INQUILINO"
        ? `/api/user-alugueis?page=${page}&pageSize=${pageSize}` // Para inquilinos
        : `/api/proprietario-alugueis?page=${page}&pageSize=${pageSize}`; // Para proprietários

    const response = await fetch(endpoint, {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão inválida ou não autenticada");
      }
      const errorText = await response.text();
      throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
      rentals: data.rentals || [],
      total: data.total || 0,
      totalPages: data.totalPages || 1,
      currentPage: data.currentPage || page,
    };
  } catch (error) {
    console.error("Erro completo ao buscar aluguéis:", error);
    throw error;
  }
}

const RentalListings: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch: refetchRentals,
  } = useQuery({
    queryKey: ["rentals", user?.id, user?.role, page, pageSize, searchTrigger],
    queryFn: () => fetchRentals(user!.id, user!.role, page, pageSize),
    enabled: !!user && !isPageChanging,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (user) {
      setSearchTrigger((prev) => prev + 1);
    }
  }, [user]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isPageChanging) {
      timeoutId = setTimeout(() => {
        setIsPageChanging(false);
        setSearchTrigger((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPageChanging]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setIsPageChanging(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    setPageSize(newPageSize);
    setPage(1);
    setIsPageChanging(true);
  };

  const handleRentalClick = (rentalId: string) => {
    router.push(`/detalhes/${rentalId}`);
  };

  if (userLoading || (isLoading && !isFetching && !isPageChanging)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    console.error("Rental fetch error:", error);
    return (
      <div className="text-red-500">
        Erro ao carregar aluguéis: {error instanceof Error ? error.message : "Erro desconhecido"}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {(isFetching || isPageChanging) ? (
        <div className="space-y-4">
          <div className="flex justify-end mb-4">
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <div className="w-full">
            <Skeleton className="h-10 w-full mb-2" />
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full mb-2" />
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      ) : !data || !data.rentals || data.total === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
            <div className="flex items-center justify-center mb-2">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <AlertTitle className="font-bold text-lg text-gray-800">
              Nenhum aluguel encontrado
            </AlertTitle>
            <AlertDescription className="text-gray-600">
              {user?.role === "INQUILINO"
                ? "Você ainda não possui nenhum aluguel registrado."
                : "Nenhum aluguel registrado para seus imóveis."}
            </AlertDescription>
          </Alert>
        </div>
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
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
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

          {data.total > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || isPageChanging}
                variant="outline"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <span className="text-sm text-gray-600">
                Página {page} de {data.totalPages}
              </span>
              <Button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= data.totalPages || isPageChanging}
                variant="outline"
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentalListings;