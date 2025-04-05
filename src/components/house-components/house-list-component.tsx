// //  "use client";
// // import { useState, useEffect } from "react";

// // import { ImovelLDto } from "@/app/model/type";
// // import { Button } from "../ui/button";
// // import { HouseCard } from "./house-card";
// // import { Alert } from "../ui/alert";
// // import { Skeleton } from "../ui/skeleton";
// // import { useUser } from "@/hooks/getUser";
// // import { useQuery } from "@tanstack/react-query";

// //  import { Info, Loader, Loader2 } from 'lucide-react';

// // export const dynamic = 'force-dynamic';

// // // // Type definition for API response
// // interface ImoveisResponse {
// //   imoveis: ImovelLDto[];
// //   total: number;
// //   totalPages: number;
// //   currentPage: number;
// // }

// // // Function to fetch imoveis with pagination
// // async function fetchImoveis(page: number, pageSize: number): Promise<ImoveisResponse> {
// //   const response = await fetch(`/api/imoveis/getAll?page=${page}&pageSize=${pageSize}`);
// //   if (!response.ok) {
// //     throw new Error("Erro ao buscar imóveis");
// //   }
// //   return await response.json();
// // }


// // export default function ImovelListings() {
// //     const [page, setPage] = useState(1);
// //     const [searchTrigger, setSearchTrigger] = useState(0);
// //     const pageSize = 6;
  
// //     const { user, loading: userLoading, refetch } = useUser();
// //     console.log("User:", user);
  
// //     const { data, error, isLoading, isFetching, refetch: refetchImoveis } = useQuery<ImoveisResponse>({
// //       queryKey: ["imoveis", page, pageSize, searchTrigger],
// //       queryFn: () => fetchImoveis(page, pageSize),
// //       enabled: !!user,
// //       refetchOnWindowFocus: false,
// //       staleTime: 30000,
// //       gcTime: 5 * 60 * 1000,
// //     });
  
// //     console.log("Query State:", { data, error, isLoading, isFetching });
  
// //     useEffect(() => {
// //       if (user) setSearchTrigger((prev) => prev + 1);
// //     }, [user]);
  
// //     const handlePageChange = (newPage: number) => {
// //       setPage(newPage);
// //       window.scrollTo({ top: 0, behavior: "smooth" });
// //     };
  
// //     if (userLoading || (isLoading && !isFetching)) {
// //       return <div className="flex justify-center items-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;
// //     }
  
// //     if (!user) {
// //       return <div>Please log in to view properties.</div>;
// //     }
  
// //     return (
// //       <div>
// //         {isFetching ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {Array.from({ length: pageSize }).map((_, index) => (
// //               <Skeleton key={index} className="h-52 w-full mb-2" />
// //             ))}
// //           </div>
// //         ) : error ? (
// //           <div className="text-red-500">Erro: {error instanceof Error ? error.message : "Unknown error"}</div>
// //         ) : !data?.imoveis?.length ? (
// //           <Alert>...</Alert>
// //         ) : (
// //           <>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {data.imoveis.map((imovel: ImovelLDto) => (
// //                 <div key={imovel.id} className="min-w-[300px] w-full">
// //                   <HouseCard imovel={imovel} />
// //                 </div>
// //               ))}
// //             </div>
// //             {data.totalPages > 1 && (
// //               <div className="mt-4 flex justify-between items-center">
// //                 <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} variant="outline">Anterior</Button>
// //                 <span>Página {page} de {data.totalPages}</span>
// //                 <Button onClick={() => handlePageChange(page + 1)} disabled={page === data.totalPages} variant="outline">Próxima</Button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     );
// //   }



// "use client";
// import { useState, useEffect } from "react";
// import { ImovelLDto } from "@/app/model/type";
// import { Button } from "../ui/button";
// import { HouseCard } from "./house-card";
// import { Alert } from "../ui/alert";
// import { Skeleton } from "../ui/skeleton";
// import { useUser } from "@/hooks/getUser";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronLeft, ChevronRight, Info, Loader, Loader2 } from 'lucide-react';

// export const dynamic = 'force-dynamic';

// interface ImoveisResponse {
//   imoveis: ImovelLDto[];
//   total: number;
//   totalPages: number;
//   currentPage: number;
// }

// async function fetchImoveis(page: number, pageSize: number): Promise<ImoveisResponse> {
//   const response = await fetch(`/api/imoveis/getAll?page=${page}&pageSize=${pageSize}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return await response.json();
// }

// export default function ImovelListings() {
//   const [page, setPage] = useState(1);
//   const [searchTrigger, setSearchTrigger] = useState(0);
//   const pageSize = 6;

//   const { user, loading: userLoading, refetch } = useUser();
  
//   const { data, error, isLoading, isFetching, refetch: refetchImoveis } = useQuery<ImoveisResponse>({
//     queryKey: ["imoveis", page, pageSize, searchTrigger],
//     queryFn: () => fetchImoveis(page, pageSize),
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
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Generate page numbers array
//   const getPageNumbers = () => {
//     if (!data?.totalPages) return [];
//     const pages = [];
//     for (let i = 1; i <= data.totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   if (userLoading || (isLoading && !isFetching)) {
//     return <div className="flex justify-center items-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;
//   }

//   if (!user) {
//     return <div>Please log in to view properties.</div>;
//   }

//   return (
//     <div>
//       {isFetching ? (
//         <div className="grid grid-cols-3 gap-4">
//           {Array.from({ length: pageSize }).map((_, index) => (
//             <Skeleton key={index} className="h-52 w-full mb-2" />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="text-red-500">Erro: {error instanceof Error ? error.message : "Unknown error"}</div>
//       ) : !data?.imoveis?.length ? (
//         <Alert>...</Alert>
//       ) : (
//         <>
//           <div className="grid grid-cols-3 gap-4">
//             {data.imoveis.map((imovel: ImovelLDto) => (
//               <div key={imovel.id} className="w-full">
//                 <HouseCard imovel={imovel} />
//               </div>
//             ))}
//           </div>
          
//           {data.totalPages > 1 && (
//             <div className="mt-6 flex justify-center items-center gap-2">
//               <Button
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//                 variant="outline"
//                 size="sm"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 Anterior
//               </Button>

//               {/* First page button */}
//               <Button
//                 onClick={() => handlePageChange(1)}
//                 variant={page === 1 ? "default" : "outline"}
//                 size="sm"
//               >
//                 1
//               </Button>

//               {/* Page numbers */}
//               {data.totalPages > 5 && page > 3 && <span>...</span>}
              
//               {getPageNumbers().slice(
//                 Math.max(1, page - 2),
//                 Math.min(data.totalPages - 1, page + 1)
//               ).map((pageNum) => (
//                 pageNum !== 1 && pageNum !== data.totalPages && (
//                   <Button
//                     key={pageNum}
//                     onClick={() => handlePageChange(pageNum)}
//                     variant={page === pageNum ? "default" : "outline"}
//                     size="sm"
//                   >
//                     {pageNum}
//                   </Button>
//                 )
//               ))}

//               {data.totalPages > 5 && page < data.totalPages - 2 && <span>...</span>}

//               {/* Last page button */}
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
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }







"use client";
import { useState, useEffect } from "react";
import { ImovelLDto } from "@/app/model/type";
import { Button } from "../ui/button";
import { HouseCard } from "./house-card";
import { Alert } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "@/hooks/getUser";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Info, Loader, Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ImoveisResponse {
  imoveis: ImovelLDto[];
  total: number;
  totalPages: number;
  currentPage: number;
}

async function fetchImoveis(page: number, pageSize: number): Promise<ImoveisResponse> {
  // Simulate 3-second delay for loading visibility
  await new Promise(resolve => setTimeout(resolve, 3000));
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
  
  const { data, error, isLoading, isFetching, refetch: refetchImoveis } = useQuery<ImoveisResponse>({
    queryKey: ["imoveis", page, pageSize, searchTrigger],
    queryFn: () => fetchImoveis(page, pageSize),
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
    // Removed window.scrollTo to keep view position
  };

  const getPageNumbers = () => {
    if (!data?.totalPages) return [];
    const pages = [];
    for (let i = 1; i <= data.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (userLoading || (isLoading && !isFetching)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="text-lg text-blue-600">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>Por favor, faça o login para ver os imóveis.</div>;
  }

  return (
    <div>
      {isFetching ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Skeleton key={index} className="h-52 w-full mb-2 bg-blue-200" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Erro: {error instanceof Error ? error.message : "Unknown error"}</div>
      ) : !data?.imoveis?.length ? (
        <Alert>...</Alert>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {data.imoveis.map((imovel: ImovelLDto) => (
              <div key={imovel.id} className="w-full">
                <HouseCard imovel={imovel} />
              </div>
            ))}
          </div>
          
          {data.totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <Button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <Button
                onClick={() => handlePageChange(1)}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
              >
                1
              </Button>

              {data.totalPages > 5 && page > 3 && <span>...</span>}
              
              {getPageNumbers().slice(
                Math.max(1, page - 2),
                Math.min(data.totalPages - 1, page + 1)
              ).map((pageNum) => (
                pageNum !== 1 && pageNum !== data.totalPages && (
                  <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                  >
                    {pageNum}
                  </Button>
                )
              ))}

              {data.totalPages > 5 && page < data.totalPages - 2 && <span>...</span>}

              {data.totalPages > 1 && (
                <Button
                  onClick={() => handlePageChange(data.totalPages)}
                  variant={page === data.totalPages ? "default" : "outline"}
                  size="sm"
                >
                  {data.totalPages}
                </Button>
              )}

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
          )}
        </>
      )}
    </div>
  );
}