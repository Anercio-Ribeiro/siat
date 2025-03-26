 "use client";
import { useState, useEffect } from "react";

import { ImovelLDto } from "@/app/model/type";
import { Button } from "../ui/button";
import { HouseCard } from "./house-card";
import { Alert } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "@/hooks/getUser";
import { useQuery } from "@tanstack/react-query";

 import { Info, Loader, Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

// // Type definition for API response
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


export default function ImovelListings() {
    const [page, setPage] = useState(1);
    const [searchTrigger, setSearchTrigger] = useState(0);
    const pageSize = 6;
  
    const { user, loading: userLoading, refetch } = useUser();
    console.log("User:", user);
  
    const { data, error, isLoading, isFetching, refetch: refetchImoveis } = useQuery<ImoveisResponse>({
      queryKey: ["imoveis", page, pageSize, searchTrigger],
      queryFn: () => fetchImoveis(page, pageSize),
      enabled: !!user,
      refetchOnWindowFocus: false,
      staleTime: 30000,
      gcTime: 5 * 60 * 1000,
    });
  
    console.log("Query State:", { data, error, isLoading, isFetching });
  
    useEffect(() => {
      if (user) setSearchTrigger((prev) => prev + 1);
    }, [user]);
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    if (userLoading || (isLoading && !isFetching)) {
      return <div className="flex justify-center items-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;
    }
  
    if (!user) {
      return <div>Please log in to view properties.</div>;
    }
  
    return (
      <div>
        {isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="h-52 w-full mb-2" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">Erro: {error instanceof Error ? error.message : "Unknown error"}</div>
        ) : !data?.imoveis?.length ? (
          <Alert>...</Alert>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.imoveis.map((imovel: ImovelLDto) => (
                <div key={imovel.id} className="min-w-[300px] w-full">
                  <HouseCard imovel={imovel} />
                </div>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="mt-4 flex justify-between items-center">
                <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} variant="outline">Anterior</Button>
                <span>Página {page} de {data.totalPages}</span>
                <Button onClick={() => handlePageChange(page + 1)} disabled={page === data.totalPages} variant="outline">Próxima</Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }