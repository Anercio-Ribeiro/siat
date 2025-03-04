"use client";

import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Loader } from "lucide-react"; // Ícone de spinner
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/getUser";
import { useEffect } from "react";

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
  const { user, loading: userLoading, refetch } = useUser();
  const {
    data: imoveis,
    error,
    isLoading,
  } = useQuery<ImovelLDto[]>({
    queryKey: ["imoveis"],
    queryFn: fetchImoveis,
    enabled: !!user, // Só busca imóveis se houver usuário
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (userLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }


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



// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useUser } from "@/hooks/getUser";
// import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
// import { HouseCard } from "@/components/house-components/house-card";
// import { ImovelLDto } from "@/app/model/type";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Info, Loader } from "lucide-react"; // Ícone de spinner
// import React from "react";

// // Função para buscar imóveis
// async function fetchImoveis(): Promise<ImovelLDto[]> {
//   const response = await fetch("/api/imoveis/getAll");
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   const data = await response.json();
//   return data.imoveis;
// }

// export default function DashboardPage() {
//   const { user, loading: userLoading } = useUser();
//   const {
//     data: imoveis,
//     error,
//     isLoading,
//   } = useQuery<ImovelLDto[]>({
//     queryKey: ["imoveis"],
//     queryFn: fetchImoveis,
//     enabled: !!user, // Só busca imóveis se houver usuário
//     refetchOnWindowFocus: false,
//   });

//   if (userLoading || isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader className="w-10 h-10 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Alert>
//           <Info className="mr-2" />
//           <AlertTitle>Usuário não autenticado</AlertTitle>
//           <AlertDescription>
//             Você precisa estar autenticado para acessar esta página.
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Alert>
//           <Info className="mr-2" />
//           <AlertTitle>Erro</AlertTitle>
//           <AlertDescription>{error.message}</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <PageWithBreadcrumb title="Dashboard" breadcrumbItems={[]}>
//       {imoveis && imoveis.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {imoveis.map((imovel) => (
//             <HouseCard key={imovel.id} imovel={imovel} />
//           ))}
//         </div>
//       ) : (
//         <div className="flex items-center justify-center min-h-[50vh]">
//           <Alert>
//             <Info className="mr-2" />
//             <AlertTitle>Nenhum imóvel disponível</AlertTitle>
//             <AlertDescription>
//               No momento, não há imóveis para exibição. Por favor, volte mais tarde.
//             </AlertDescription>
//           </Alert>
//         </div>
//       )}
//     </PageWithBreadcrumb>
//   );
// }
