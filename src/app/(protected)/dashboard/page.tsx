"use client";

import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

// Função para buscar imóveis
async function fetchImoveis(): Promise<ImovelLDto[]> {
  const response = await fetch("/api/imoveis/getAll");
  if (!response.ok) {
    throw new Error("Erro ao buscar imóveis");
  }
  const data = await response.json();
  return data.imoveis;
}

export default function DashboardPage() {
  // Usando useQuery para buscar os imóveis
  const {
    data: imoveis,
    error,
    isLoading,
  } = useQuery<ImovelLDto[], Error>({
    queryKey: ["imoveis"],
    queryFn: fetchImoveis,
  });

  if (error) return <div>Erro: {error.message}</div>;

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard" },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="min-w-[300px] w-full">
                <Skeleton className="h-52 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))
          : imoveis?.map((imovel: ImovelLDto) => (
              <div key={imovel.id} className="min-w-[300px] w-full">
                <HouseCard imovel={imovel} />
              </div>
            ))}
      </div>
    </PageWithBreadcrumb>
  );
}


