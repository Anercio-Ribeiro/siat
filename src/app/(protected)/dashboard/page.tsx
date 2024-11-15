"use client";

import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Loader } from "lucide-react"; // Ícone de spinner
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/getUser";

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
  const {
    data: imoveis,
    error,
    isLoading,
  } = useQuery<ImovelLDto[], Error>({
    queryKey: ["imoveis"],
    queryFn: fetchImoveis,
    refetchOnWindowFocus: false,
  });

  const { user, loading: userLoading } = useUser();
  console.log(user);

  if (isLoading || userLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Loader className="animate-spin text-cyan-300 h-16 w-16" />
      </div>
    );
  }

  if (!user) return <div>Usuário não autenticado</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard" },
      ]}
    >
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="min-w-[300px] w-full">
              <Skeleton className="h-52 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))}
        </div>
      ) : imoveis && imoveis.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imoveis.map((imovel: ImovelLDto) => (
            <div key={imovel.id} className="min-w-[300px] w-full">
              <HouseCard imovel={imovel} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
            <div className="flex items-center justify-center mb-2">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <AlertTitle className="font-bold text-lg text-gray-800">Nenhum imóvel disponível</AlertTitle>
            <AlertDescription className="text-gray-600">
              No momento, não há imóveis para exibição. Por favor, volte mais tarde para conferir novas opções.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </PageWithBreadcrumb>
  );
}
