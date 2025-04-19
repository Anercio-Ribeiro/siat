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
import { DashboardProprietarioTuristico } from "@/components/card-dashboard/DashboardProprietarioTuristico";
import { DashboardInquilinoTuristico } from "@/components/card-dashboard/DashboardInquilinoTuristico";
import { DashboardProprietarioResidencial } from "@/components/card-dashboard/DashboardProprietarioResidencial";
import { DashboardInquilinoProprietarioFlipBox } from '../../../components/card-dashboard/dashboard-component/dashboard-inquilino-proprietario-flip-box';

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
 //TODO: Remover logs em produção
  //console.log(user);
  
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

  // if (user?.role === 'INQUILINO' || user?.role === 'PROPRIETARIO') {
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

       {/* <DashboardProprietarioTuristico /> */}
        {/* <DashboardProprietarioResidencial />
        <DashboardInquilinoTuristico />  */}

<DashboardInquilinoProprietarioFlipBox />

        {/* <RentalListings /> */}

      </PageWithBreadcrumb>
    );
    
  }