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
//   userId: string,
//   role: string,
//   page: number,
//   pageSize: number
// ): Promise<RentalsResponse> {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
//   const endpoint =
//     role === "INQUILINO"
//       ? `/api/user-alugueis?page=${page}&pageSize=${pageSize}`
//       : `/api/proprietario-alugueis?page=${page}&pageSize=${pageSize}`;
//   const response = await fetch(endpoint, { credentials: "include" });
//   if (!response.ok) {
//     if (response.status === 401) throw new Error("Sessão inválida ou não autenticada");
//     const errorText = await response.text();
//     throw new Error(`Erro ao buscar aluguéis: ${response.status} - ${errorText}`);
//   }
//   const data = await response.json();
//   return {
//     rentals: data.rentals || [],
//     total: data.total || 0,
//     totalPages: data.totalPages || 1,
//     currentPage: data.currentPage || page,
//   };
// }

// const RentalListings: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchTrigger, setSearchTrigger] = useState(0);
//   const { user, loading: userLoading } = useUser();
//   const router = useRouter();

//   const { data, error, isLoading, isFetching } = useQuery({
//     queryKey: ["rentals", user?.id, user?.role, page, pageSize, searchTrigger],
//     queryFn: () => fetchRentals(user!.id, user!.role, page, pageSize),
//     enabled: !!user,
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

//   if (!user) return <div>Please log in to view rentals.</div>;

//   return (
//     <div className="p-4 space-y-4 relative">
//       {isFetching ? (
//         <div className="space-y-4 relative">
//           <div className="flex justify-end mb-4">
//             <Skeleton className="h-10 w-[180px] bg-blue-200" />
//           </div>
//           <div className="w-full relative">
//             <Skeleton className="h-10 w-full mb-2 bg-blue-200" />
//             {Array.from({ length: pageSize }).map((_, index) => (
//               <Skeleton key={index} className="h-12 w-full mb-2 bg-blue-200" />
//             ))}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                 <span className="text-lg text-blue-600">Carregando...</span>
//               </div>
//             </div>
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
//             {user.role === "INQUILINO"
//               ? "Você ainda não possui nenhum aluguel registrado."
//               : "Nenhum aluguel registrado para seus imóveis."}
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
//                 <TableHead>Responsável</TableHead>
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
//                             : rental.status === "concluído"
//                             ? "green"
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
//               {getPageNumbers().map((pageNum) => (
//                 <Button
//                   key={pageNum}
//                   onClick={() => handlePageChange(pageNum)}
//                   variant={page === pageNum ? "default" : "outline"}
//                   size="sm"
//                 >
//                   {pageNum}
//                 </Button>
//               ))}
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
import { Info } from "lucide-react";
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
    proprietario: {
      id: string;
      nome: string;
    };
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
  userId: string,
  role: string,
  page: number,
  pageSize: number
): Promise<RentalsResponse> {
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
  const endpoint =
    role === "INQUILINO"
      ? `/api/user-alugueis?page=${page}&pageSize=${pageSize}`
      : `/api/proprietario-alugueis?page=${page}&pageSize=${pageSize}`;
  const response = await fetch(endpoint, { credentials: "include" });
  if (!response.ok) {
    if (response.status === 401) throw new Error("Sessão inválida ou não autenticada");
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
}

const RentalListings: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["rentals", user?.id, user?.role, page, pageSize, searchTrigger],
    queryFn: () => fetchRentals(user!.id, user!.role, page, pageSize),
    enabled: !!user,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (user) setSearchTrigger((prev) => prev + 1);
  }, [user]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const handleRentalClick = (rentalId: string) => {
    router.push(`/detalhes/${rentalId}`);
  };

  const getPageNumbers = () => {
    if (!data?.totalPages) return [];
    return Array.from({ length: data.totalPages }, (_, i) => i + 1);
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

  if (!user) return <div>Please log in to view rentals.</div>;

  return (
    <div className="p-4 space-y-4 relative">
      {isFetching ? (
        <div className="space-y-4 relative">
          <div className="flex justify-end mb-4">
            <Skeleton className="h-10 w-[180px] bg-blue-200" />
          </div>
          <div className="w-full relative">
            <Skeleton className="h-10 w-full mb-2 bg-blue-200" />
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full mb-2 bg-blue-200" />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="text-lg text-blue-600">Carregando...</span>
              </div>
            </div>
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
            {user.role === "INQUILINO"
              ? "Você ainda não possui nenhum aluguel registrado."
              : "Nenhum aluguel registrado para seus imóveis."}
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
                <TableHead>
                  {user.role === "INQUILINO" ? "Nome Proprietário" : "Responsável"}
                </TableHead>
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
                  <TableCell>
                    {user.role === "INQUILINO"
                      ? rental.imovel.proprietario?.nome || "Proprietário não informado"
                      : rental.inquilino.nome}
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor:
                          rental.status === "pendente"
                            ? "yellow"
                            : rental.status === "concluído"
                            ? "green"
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
            <div className="mt-6 flex justify-center items-center gap-2">
              <Button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>
              {getPageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                >
                  {pageNum}
                </Button>
              ))}
              <Button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === data.totalPages}
                variant="outline"
                size="sm"
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentalListings;