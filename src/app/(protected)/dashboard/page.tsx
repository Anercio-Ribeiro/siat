// "use client";

// import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
// import { HouseCard } from "@/components/house-components/house-card";
// import { ImovelLDto } from "@/app/model/type";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useQuery } from "@tanstack/react-query";

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
//   // Usando useQuery para buscar os imóveis
//   const {
//     data: imoveis,
//     error,
//     isLoading,
//   } = useQuery<ImovelLDto[], Error>({
//     queryKey: ["imoveis"],
//     queryFn: fetchImoveis,
//   });

//   if (error) return <div>Erro: {error.message}</div>;

//   return (
//     <PageWithBreadcrumb
//       title="Dashboard"
//       breadcrumbItems={[
//         { label: "Início", href: "/" },
//         { label: "Dashboard" },
//       ]}
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {isLoading
//           ? Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))
//           : imoveis?.map((imovel: ImovelLDto) => (
//               <div key={imovel.id} className="min-w-[300px] w-full">
//                 <HouseCard imovel={imovel} />
//               </div>
//             ))}
//       </div>
//     </PageWithBreadcrumb>
//   );
// }


// "use client";

// import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
// import { HouseCard } from "@/components/house-components/house-card";
// import { ImovelLDto } from "@/app/model/type";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Info } from "lucide-react"; // ícone de informação
// import { useQuery } from "@tanstack/react-query";

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
//   // Usando useQuery para buscar os imóveis
//   const {
//     data: imoveis,
//     error,
//     isLoading,
//   } = useQuery<ImovelLDto[], Error>({
//     queryKey: ["imoveis"],
//     queryFn: fetchImoveis,
//   });

//   if (error) return <div>Erro: {error.message}</div>;

//   return (
//     <PageWithBreadcrumb
//       title="Dashboard"
//       breadcrumbItems={[
//         { label: "Início", href: "/" },
//         { label: "Dashboard" },
//       ]}
//     >
//       {/* Centraliza o Alert tanto vertical quanto horizontalmente */}
//       {!isLoading && imoveis && imoveis.length === 0 && (
//         <div className="flex items-center justify-center min-h-[50vh]">
//           <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//             <div className="flex items-center justify-center mb-2">
//               <Info className="h-6 w-6 text-blue-600" />
//             </div>
//             <AlertTitle className="font-bold text-lg text-gray-800">Nenhum imóvel disponível</AlertTitle>
//             <AlertDescription className="text-gray-600">
//               No momento, não há imóveis para exibição. Por favor, volte mais tarde para conferir novas opções.
//             </AlertDescription>
//           </Alert>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {isLoading ? (
//           Array.from({ length: 6 }).map((_, index) => (
//             <div key={index} className="min-w-[300px] w-full">
//               <Skeleton className="h-52 w-full mb-2" />
//               <Skeleton className="h-6 w-3/4 mb-2" />
//               <Skeleton className="h-6 w-1/2" />
//             </div>
//           ))
//         ) : (
//           imoveis?.map((imovel: ImovelLDto) => (
//             <div key={imovel.id} className="min-w-[300px] w-full">
//               <HouseCard imovel={imovel} />
//             </div>
//           ))
//         )}
//       </div>
//     </PageWithBreadcrumb>
//   );
// }

"use client";

import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react"; // ícone de informação
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
    refetchOnWindowFocus: false, // Evita refetch desnecessário quando a janela foca
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


