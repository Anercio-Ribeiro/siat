"use client";
import { useState, useEffect } from "react";
import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/getUser";
import { Button } from "@/components/ui/button";
import RentalListings from "@/components/house-components/rental-lists";
import Dashboard from "@/components/dashboard/dashboard";
import EstatisticasDashboard from "@/components/dashboard/dashboard";

export const dynamic = 'force-dynamic';

// Type definition for API response
interface ImoveisResponse {
  imoveis: ImovelLDto[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Function to fetch imoveis with pagination
async function fetchImoveis(page: number, pageSize: number): Promise<ImoveisResponse> {
  const response = await fetch(`/api/imoveis/getAll?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar imóveis");
  }
  return await response.json();
}

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const pageSize = 6; // Show 6 properties per page
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  
  const { user, loading: userLoading, refetch } = useUser();
 console.log(user);
  
  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch: refetchImoveis
  } = useQuery({
    queryKey: ["imoveis", page, pageSize, searchTrigger],
    queryFn: () => fetchImoveis(page, pageSize),
    enabled: !!user, // Only fetch if user is logged in
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
    refetch();
  }, [refetch]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (userLoading || (isLoading && !isFetching)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (user?.role === 'INQUILINO' || user?.role === 'PROPRIETARIO') {
    return (
      <PageWithBreadcrumb
        title="Dashboard"
        breadcrumbItems={[
          { label: "Início", href: "/" },
          { label: "Dashboard" },
        ]}
      >
        {/*<Dashboard/> */}
        <EstatisticasDashboard/>
        {/* <RentalListings /> */}

      </PageWithBreadcrumb>
    );
    
  }
  
  // return (
  //   <PageWithBreadcrumb
  //     title="Dashboard"
  //     breadcrumbItems={[
  //       { label: "Início", href: "/" },
  //       { label: "Dashboard" },
  //     ]}
  //   >
  //     {isFetching ? (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //         {Array.from({ length: pageSize }).map((_, index) => (
  //           <div key={index} className="min-w-[300px] w-full">
  //             <Skeleton className="h-52 w-full mb-2" />
  //             <Skeleton className="h-6 w-3/4 mb-2" />
  //             <Skeleton className="h-6 w-1/2" />
  //           </div>
  //         ))}
  //       </div>
  //     ) : error ? (
  //       <div className="text-red-500">Erro ao carregar imóveis: {error instanceof Error ? error.message : "Erro desconhecido"}</div>
  //     ) : data?.imoveis?.length === 0 ? (
  //       <div className="flex items-center justify-center min-h-[50vh]">
  //         <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
  //           <div className="flex items-center justify-center mb-2">
  //             <Info className="h-6 w-6 text-blue-600" />
  //           </div>
  //           <AlertTitle className="font-bold text-lg text-gray-800">Nenhum imóvel disponível</AlertTitle>
  //           <AlertDescription className="text-gray-600">
  //             No momento, não há imóveis para exibição. Por favor, volte mais tarde para conferir novas opções.
  //           </AlertDescription>
  //         </Alert>
  //       </div>
  //     ) : (
  //       <>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {data?.imoveis.map((imovel: ImovelLDto) => (
  //             <div key={imovel.id} className="min-w-[300px] w-full">
  //               <HouseCard imovel={imovel} />
  //             </div>
  //           ))}
  //         </div>
          
  //         {data && data.imoveis && data.imoveis.length > 0 && (
  //           <div className="mt-4 flex justify-between items-center">
  //             <Button 
  //               onClick={() => handlePageChange(page - 1)} 
  //               disabled={page === 1}
  //               variant="outline"
  //             >
  //               Anterior
  //             </Button>
  //             <span className="text-sm text-gray-600">
  //               Página {page} de {data.totalPages}
  //             </span>
  //             <Button 
  //               onClick={() => handlePageChange(page + 1)} 
  //               disabled={page === data.totalPages}
  //               variant="outline"
  //             >
  //               Próxima
  //             </Button>
  //           </div>
  //         )}
          
  //       </>
  //     )}
  //   </PageWithBreadcrumb>
  // );
}