// "use client";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
// import { HouseCard } from "@/components/house-components/house-card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ImovelLDto } from "./model/type";
// import { useRouter } from "next/navigation";
// import { Info } from 'lucide-react';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// interface FetchImoveisResponse {
//   imoveis: ImovelLDto[];
//   totalImoveis: number;
//   totalPages: number;
//   currentPage: number;
// }

// async function fetchImoveis(filters: Record<string, any>, page: number): Promise<FetchImoveisResponse> {
//   const queryParams = new URLSearchParams(filters as any);
//   queryParams.set("page", String(page));
//   const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);

//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return response.json();
// }

// export default function HomePage() {
//   const [precoMin, setPrecoMin] = useState<string>("");
//   const [precoMax, setPrecoMax] = useState<string>("");
//   const [bairro, setBairro] = useState<string>("");
//   const [tipologia, setTipologia] = useState<string>("");
//   const [activeTab, setActiveTab] = useState<string>("preco");
//   const [page, setPage] = useState<number>(1);
//   const [isSearchClicked, setIsSearchClicked] = useState(false);
//   const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);

//   const { data, isLoading, error, refetch } = useQuery<FetchImoveisResponse, Error>({
//     queryKey: ["imoveis", page],
//     queryFn: () => fetchImoveis(isSearchClicked ? { precoMin, precoMax, bairro, tipologia } : {}, page),
//     enabled: page > 0,
//   });

//   const router = useRouter();

//   useEffect(() => {
//     const session = document.cookie.includes('sessionId'); // Validar sessão pelo cookie (ou outra lógica)
//     if (!session) {
//       router.push('/'); // Redirecionar para "/" se não autenticado
//     }
//   }, []);

//   useEffect(() => {
//     setIsSkeletonVisible(true);
//     const timer = setTimeout(() => {
//       setIsSkeletonVisible(false);
//     }, 500);

//     refetch();

//     return () => clearTimeout(timer);
//   }, [page, refetch]);

//   const handleSearch = () => {
//     setIsSearchClicked(true);
//     setPage(1);
//     refetch();
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
//         <h1 className="text-2xl font-bold">Imóveis</h1>
//         <div>
//           <Button className="mr-2">Página Inicial</Button>
//           <Button>Sobre</Button>
//         </div>
//       </nav>

//       <div
//         className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
//         style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <Tabs defaultValue="preco" onValueChange={handleTabChange} className="w-10/12 max-w-3xl bg-white p-4 rounded-md shadow-lg">
//             <TabsList className="flex space-x-4 mb-4 bg-white w-96">
//               <TabsTrigger value="preco" className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === "preco" ? "border-b-2 border-red-500" : ""}`}>
//                 Preço
//               </TabsTrigger>
//               <TabsTrigger value="localizacao" className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === "localizacao" ? "border-b-2 border-red-500" : ""}`}>
//                 Localização
//               </TabsTrigger>
//               <TabsTrigger value="tipologia" className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === "tipologia" ? "border-b-2 border-red-500" : ""}`}>
//                 Tipologia
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="preco">
//               <div className="flex items-center space-x-2">
//                 <Input value={precoMin} onChange={(e) => setPrecoMin(e.target.value)} placeholder="Preço mínimo" className="w-full" />
//                 <Input value={precoMax} onChange={(e) => setPrecoMax(e.target.value)} placeholder="Preço máximo" className="w-full" />
//                 <Button className="ml-2" onClick={handleSearch}>Pesquisar</Button>
//               </div>
//             </TabsContent>
//             <TabsContent value="localizacao">
//               <div className="flex items-center space-x-2">
//                 <Input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Digite a localização" className="w-full" />
//                 <Button className="ml-2" onClick={handleSearch}>Pesquisar</Button>
//               </div>
//             </TabsContent>
//             <TabsContent value="tipologia">
//               <div className="flex items-center space-x-2">
//                 <Input value={tipologia} onChange={(e) => setTipologia(e.target.value)} placeholder="Digite a tipologia" className="w-full" />
//                 <Button className="ml-2" onClick={handleSearch}>Pesquisar</Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       {/* <div className="mt-8">
//         {isLoading || isSkeletonVisible ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {data?.imoveis.map((imovel) => (
//               <HouseCard key={imovel.id} imovel={imovel} />
//             ))}
//           </div>
//         )}
//       </div> */}


// <div className="mt-8">
//         {isLoading || isSkeletonVisible ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//         ) : data?.imoveis.length === 0 ? (
//           <div className="flex items-center justify-center min-h-[50vh]">
//             <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//               <div className="flex items-center justify-center mb-2">
//                 <Info className="h-6 w-6 text-blue-600" />
//               </div>
//               <AlertTitle className="font-bold text-lg text-gray-800">Nenhum imóvel disponível</AlertTitle>
//               <AlertDescription className="text-gray-600">
//                 No momento, não há imóveis para exibição. Por favor, volte mais tarde para conferir novas opções.
//               </AlertDescription>
//             </Alert>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {data?.imoveis.map((imovel) => (
//               <HouseCard key={imovel.id} imovel={imovel} />
//             ))}
//           </div>
//         )}
//       </div>

      

//       <div className="mt-4 flex justify-between">
//         <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
//           Anterior
//         </Button>
//         <Button onClick={() => handlePageChange(page + 1)} disabled={page === data?.totalPages}>
//           Próxima
//         </Button>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { HouseCard } from "@/components/house-components/house-card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ImovelLDto } from "./model/type";
// import { Info } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// interface FetchImoveisResponse {
//   imoveis: ImovelLDto[];
//   totalImoveis: number;
//   totalPages: number;
//   currentPage: number;
// }

// interface SearchFilters {
//   precoMin: string;
//   precoMax: string;
//   bairro: string;
//   tipologia: string;
// }

// // Default empty filters that match the SearchFilters type
// const emptyFilters: SearchFilters = {
//   precoMin: "",
//   precoMax: "",
//   bairro: "",
//   tipologia: "",
// };

// async function fetchImoveis(filters: SearchFilters, page: number): Promise<FetchImoveisResponse> {
//   const queryParams = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) queryParams.append(key, value);
//   });
//   queryParams.set("page", String(page));

//   const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return response.json();
// }

// export default function HomePage() {
//   const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
//   const [activeTab, setActiveTab] = useState<string>("preco");
//   const [page, setPage] = useState<number>(1);
//   const [isSearching, setIsSearching] = useState(false);

//   const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
//     queryKey: ["imoveis", page, isSearching ? filters : emptyFilters],
//     queryFn: () => fetchImoveis(isSearching ? filters : emptyFilters, page),
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   const handleSearch = () => {
//     setIsSearching(true);
//     setPage(1);
//   };

//   const handleInputChange = (field: keyof SearchFilters, value: string) => {
//     setFilters((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
//         <h1 className="text-2xl font-bold">Imóveis</h1>
//         <div>
//           <Button className="mr-2">Página Inicial</Button>
//           <Button>Sobre</Button>
//         </div>
//       </nav>

//       <div
//         className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
//         style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <Tabs
//             defaultValue="preco"
//             onValueChange={handleTabChange}
//             className="w-10/12 max-w-3xl bg-white p-4 rounded-md shadow-lg"
//           >
//             <TabsList className="flex space-x-4 mb-4 bg-white w-96">
//               <TabsTrigger
//                 value="preco"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "preco" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Preço
//               </TabsTrigger>
//               <TabsTrigger
//                 value="localizacao"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "localizacao" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Localização
//               </TabsTrigger>
//               <TabsTrigger
//                 value="tipologia"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "tipologia" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Tipologia
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="preco">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.precoMin}
//                   onChange={(e) => handleInputChange("precoMin", e.target.value)}
//                   placeholder="Preço mínimo"
//                   className="w-full"
//                 />
//                 <Input
//                   value={filters.precoMax}
//                   onChange={(e) => handleInputChange("precoMax", e.target.value)}
//                   placeholder="Preço máximo"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="localizacao">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.bairro}
//                   onChange={(e) => handleInputChange("bairro", e.target.value)}
//                   placeholder="Digite a localização"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="tipologia">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.tipologia}
//                   onChange={(e) => handleInputChange("tipologia", e.target.value)}
//                   placeholder="Digite a tipologia"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       <div className="mt-8">
//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//         ) : data?.imoveis.length === 0 ? (
//           <div className="flex items-center justify-center min-h-[50vh]">
//             <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//               <div className="flex items-center justify-center mb-2">
//                 <Info className="h-6 w-6 text-blue-600" />
//               </div>
//               <AlertTitle className="font-bold text-lg text-gray-800">
//                 Nenhum imóvel encontrado
//               </AlertTitle>
//               <AlertDescription className="text-gray-600">
//                 Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
//               </AlertDescription>
//             </Alert>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {data?.imoveis.map((imovel) => (
//               <HouseCard key={imovel.id} imovel={imovel} />
//             ))}
//           </div>
//         )}
//       </div>

//       {data && data.imoveis && data.imoveis.length > 0 && (
//         <div className="mt-4 flex justify-between items-center">
//           <Button 
//             onClick={() => handlePageChange(page - 1)} 
//             disabled={page === 1}
//             variant="outline"
//           >
//             Anterior
//           </Button>
//           <span className="text-sm text-gray-600">
//             Página {page} de {data.totalPages}
//           </span>
//           <Button 
//             onClick={() => handlePageChange(page + 1)} 
//             disabled={page === data?.totalPages}
//             variant="outline"
//           >
//             Próxima
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }










// "use client";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { HouseCard } from "@/components/house-components/house-card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ImovelLDto } from "./model/type";
// import { Info } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// interface FetchImoveisResponse {
//   imoveis: ImovelLDto[];
//   totalImoveis: number;
//   totalPages: number;
//   currentPage: number;
// }

// interface SearchFilters {
//   precoMin: string;
//   precoMax: string;
//   bairro: string;
//   tipologia: string;
// }

// // Default empty filters that match the SearchFilters type
// const emptyFilters: SearchFilters = {
//   precoMin: "",
//   precoMax: "",
//   bairro: "",
//   tipologia: "",
// };

// async function fetchImoveis(filters: SearchFilters, page: number): Promise<FetchImoveisResponse> {
//   const queryParams = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) queryParams.append(key, value);
//   });
//   queryParams.set("page", String(page));

//   const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return response.json();
// }

// export default function HomePage() {
//   const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
//   const [activeTab, setActiveTab] = useState<string>("preco");
//   const [page, setPage] = useState<number>(1);
//   const [isSearching, setIsSearching] = useState(false);

//   const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
//     queryKey: ["imoveis", page, isSearching ? filters : emptyFilters],
//     queryFn: () => fetchImoveis(isSearching ? filters : emptyFilters, page),
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   const handleSearch = () => {
//     setIsSearching(true);
//     setPage(1);
//   };

//   const handleInputChange = (field: keyof SearchFilters, value: string) => {
//     setFilters((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
//         <h1 className="text-2xl font-bold">Imóveis</h1>
//         <div>
//           <Button className="mr-2">Página Inicial</Button>
//           <Button>Sobre</Button>
//         </div>
//       </nav>

//       <div
//         className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
//         style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <Tabs
//             defaultValue="preco"
//             onValueChange={handleTabChange}
//             className="w-10/12 max-w-3xl bg-white p-4 rounded-md shadow-lg"
//           >
//             <TabsList className="flex space-x-4 mb-4 bg-white w-96">
//               <TabsTrigger
//                 value="preco"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "preco" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Preço
//               </TabsTrigger>
//               <TabsTrigger
//                 value="localizacao"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "localizacao" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Localização
//               </TabsTrigger>
//               <TabsTrigger
//                 value="tipologia"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "tipologia" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Tipologia
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="preco">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.precoMin}
//                   onChange={(e) => handleInputChange("precoMin", e.target.value)}
//                   placeholder="Preço mínimo"
//                   className="w-full"
//                 />
//                 <Input
//                   value={filters.precoMax}
//                   onChange={(e) => handleInputChange("precoMax", e.target.value)}
//                   placeholder="Preço máximo"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="localizacao">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.bairro}
//                   onChange={(e) => handleInputChange("bairro", e.target.value)}
//                   placeholder="Digite a localização"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="tipologia">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.tipologia}
//                   onChange={(e) => handleInputChange("tipologia", e.target.value)}
//                   placeholder="Digite a tipologia"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       <div className="mt-8">
//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//         ) : data?.imoveis.length === 0 ? (
//           <div className="flex items-center justify-center min-h-[50vh]">
//             <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//               <div className="flex items-center justify-center mb-2">
//                 <Info className="h-6 w-6 text-blue-600" />
//               </div>
//               <AlertTitle className="font-bold text-lg text-gray-800">
//                 Nenhum imóvel encontrado
//               </AlertTitle>
//               <AlertDescription className="text-gray-600">
//                 Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
//               </AlertDescription>
//             </Alert>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {data?.imoveis.map((imovel) => (
//               <HouseCard key={imovel.id} imovel={imovel} />
//             ))}
//           </div>
//         )}
//       </div>

//       {data && data.imoveis && data.imoveis.length > 0 && (
//         <div className="mt-4 flex justify-between items-center">
//           <Button 
//             onClick={() => handlePageChange(page - 1)} 
//             disabled={page === 1}
//             variant="outline"
//           >
//             Anterior
//           </Button>
//           <span className="text-sm text-gray-600">
//             Página {page} de {data.totalPages}
//           </span>
//           <Button 
//             onClick={() => handlePageChange(page + 1)} 
//             disabled={page === data?.totalPages}
//             variant="outline"
//           >
//             Próxima
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { HouseCard } from "@/components/house-components/house-card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ImovelLDto } from "./model/type";
// import { Info } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// interface FetchImoveisResponse {
//   imoveis: ImovelLDto[];
//   totalImoveis: number;
//   totalPages: number;
//   currentPage: number;
// }

// interface SearchFilters {
//   precoMin: string;
//   precoMax: string;
//   bairro: string;
//   tipologia: string;
// }

// const emptyFilters: SearchFilters = {
//   precoMin: "",
//   precoMax: "",
//   bairro: "",
//   tipologia: "",
// };

// async function fetchImoveis(filters: SearchFilters, page: number): Promise<FetchImoveisResponse> {
//   const queryParams = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) queryParams.append(key, value);
//   });
//   queryParams.set("page", String(page));

//   const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return response.json();
// }

// export default function HomePage() {
//   const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
//   const [activeTab, setActiveTab] = useState<string>("preco");
//   const [page, setPage] = useState<number>(1);
//   // Use searchTrigger to force query refetch only when search button is clicked
//   const [searchTrigger, setSearchTrigger] = useState<number>(0);

//   const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
//     // Include searchTrigger in queryKey instead of filters
//     queryKey: ["imoveis", page, searchTrigger],
//     // Use the current filters state when the query runs
//     queryFn: () => fetchImoveis(filters, page),
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   const handleSearch = () => {
//     setPage(1);
//     // Increment searchTrigger to force a new search
//     setSearchTrigger(prev => prev + 1);
//   };

//   const handleInputChange = (field: keyof SearchFilters, value: string) => {
//     setFilters((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     // Trigger a new search when page changes
//     setSearchTrigger(prev => prev + 1);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
//         <h1 className="text-2xl font-bold">Imóveis</h1>
//         <div>
//           <Button className="mr-2">Página Inicial</Button>
//           <Button>Sobre</Button>
//         </div>
//       </nav>

//       <div
//         className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
//         style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <Tabs
//             defaultValue="preco"
//             onValueChange={handleTabChange}
//             className="w-10/12 max-w-3xl bg-white p-4 rounded-md shadow-lg"
//           >
//             <TabsList className="flex space-x-4 mb-4 bg-white w-96">
//               <TabsTrigger
//                 value="preco"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "preco" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Preço
//               </TabsTrigger>
//               <TabsTrigger
//                 value="localizacao"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "localizacao" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Localização
//               </TabsTrigger>
//               <TabsTrigger
//                 value="tipologia"
//                 className={`text-xl font-medium bg-white hover:bg-gray-200 ${
//                   activeTab === "tipologia" ? "border-b-2 border-red-500" : ""
//                 }`}
//               >
//                 Tipologia
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="preco">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.precoMin}
//                   onChange={(e) => handleInputChange("precoMin", e.target.value)}
//                   placeholder="Preço mínimo"
//                   className="w-full"
//                 />
//                 <Input
//                   value={filters.precoMax}
//                   onChange={(e) => handleInputChange("precoMax", e.target.value)}
//                   placeholder="Preço máximo"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="localizacao">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.bairro}
//                   onChange={(e) => handleInputChange("bairro", e.target.value)}
//                   placeholder="Digite a localização"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>

//             <TabsContent value="tipologia">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   value={filters.tipologia}
//                   onChange={(e) => handleInputChange("tipologia", e.target.value)}
//                   placeholder="Digite a tipologia"
//                   className="w-full"
//                 />
//                 <Button className="ml-2" onClick={handleSearch}>
//                   Pesquisar
//                 </Button>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       <div className="mt-8">
//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="min-w-[300px] w-full">
//                 <Skeleton className="h-52 w-full mb-2" />
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//         ) : data?.imoveis.length === 0 ? (
//           <div className="flex items-center justify-center min-h-[50vh]">
//             <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//               <div className="flex items-center justify-center mb-2">
//                 <Info className="h-6 w-6 text-blue-600" />
//               </div>
//               <AlertTitle className="font-bold text-lg text-gray-800">
//                 Nenhum imóvel encontrado
//               </AlertTitle>
//               <AlertDescription className="text-gray-600">
//                 Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
//               </AlertDescription>
//             </Alert>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {data?.imoveis.map((imovel) => (
//               <HouseCard key={imovel.id} imovel={imovel} />
//             ))}
//           </div>
//         )}
//       </div>

//       {data && data.imoveis && data.imoveis.length > 0 && (
//         <div className="mt-4 flex justify-between items-center">
//           <Button 
//             onClick={() => handlePageChange(page - 1)} 
//             disabled={page === 1}
//             variant="outline"
//           >
//             Anterior
//           </Button>
//           <span className="text-sm text-gray-600">
//             Página {page} de {data.totalPages}
//           </span>
//           <Button 
//             onClick={() => handlePageChange(page + 1)} 
//             disabled={page === data?.totalPages}
//             variant="outline"
//           >
//             Próxima
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }















// "use client";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { HouseCard } from "@/components/house-components/house-card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ImovelLDto } from "./model/type";
// import { Info, Filter, X } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Label } from "@/components/ui/label";

// interface FetchImoveisResponse {
//   imoveis: ImovelLDto[];
//   totalImoveis: number;
//   totalPages: number;
//   currentPage: number;
// }

// interface SearchFilters {
//   precoMin?: string;
//   precoMax?: string;
//   bairro?: string;
//   tipologia?: string;
//   provincia?: string;
//   municipio?: string;
//   numeroQuarto?: string;
//   numeroCasaBanho?: string;
//   garagem?: string;
// }

// const emptyFilters: SearchFilters = {};

// async function fetchImoveis(filters: SearchFilters, page: number): Promise<FetchImoveisResponse> {
//   const queryParams = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) queryParams.append(key, value);
//   });
//   queryParams.set("page", String(page));

//   const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
//   if (!response.ok) {
//     throw new Error("Erro ao buscar imóveis");
//   }
//   return response.json();
// }

// export default function HomePage() {
//   const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
//   const [page, setPage] = useState<number>(1);
//   const [searchTrigger, setSearchTrigger] = useState<number>(0);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
//     queryKey: ["imoveis", page, searchTrigger],
//     queryFn: () => fetchImoveis(filters, page),
//     staleTime: 30000,
//     gcTime: 5 * 60 * 1000,
//   });

//   // Load initial data on component mount
//   useEffect(() => {
//     setSearchTrigger(prev => prev + 1);
//   }, []);

//   const handleSearch = () => {
//     setPage(1);
//     setSearchTrigger(prev => prev + 1);
//     setIsDialogOpen(false);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     setSearchTrigger(prev => prev + 1);
//   };

//   const clearFilters = () => {
//     setFilters(emptyFilters);
//     setPage(1);
//     setSearchTrigger(prev => prev + 1);
//   };

//   const removeFilter = (key: keyof SearchFilters) => {
//     setFilters(prev => {
//       const newFilters = { ...prev };
//       delete newFilters[key];
//       return newFilters;
//     });
//   };

//   const getFilterLabel = (key: string, value: string) => {
//     const labels: Record<string, string> = {
//       precoMin: `Preço min: ${value}`,
//       precoMax: `Preço max: ${value}`,
//       bairro: `Bairro: ${value}`,
//       tipologia: `Tipologia: ${value}`,
//       provincia: `Província: ${value}`,
//       municipio: `Município: ${value}`,
//       numeroQuarto: `Quartos: ${value}`,
//       numeroCasaBanho: `Casas de banho: ${value}`,
//       garagem: `Garagem: ${value}`,
//     };
//     return labels[key] || `${key}: ${value}`;
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
//         <h1 className="text-2xl font-bold">Imóveis</h1>
//         <div>
//           <Button className="mr-2">Página Inicial</Button>
//           <Button>Sobre</Button>
//         </div>
//       </nav>

//       <div className="mt-8 flex flex-col gap-4">
//         <div className="flex items-center gap-2 flex-wrap">
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button variant="outline" className="gap-2">
//                 <Filter className="h-4 w-4" />
//                 Filtros
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle>Filtros de Pesquisa</DialogTitle>
//               </DialogHeader>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Preço Mínimo</Label>
//                   <Input
//                     value={filters.precoMin || ""}
//                     onChange={(e) => setFilters(prev => ({ ...prev, precoMin: e.target.value }))}
//                     placeholder="Preço mínimo"
//                     type="number"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Preço Máximo</Label>
//                   <Input
//                     value={filters.precoMax || ""}
//                     onChange={(e) => setFilters(prev => ({ ...prev, precoMax: e.target.value }))}
//                     placeholder="Preço máximo"
//                     type="number"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Província</Label>
//                   <Select
//                     value={filters.provincia}
//                     onValueChange={(value) => setFilters(prev => ({ ...prev, provincia: value }))}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione a província" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="luanda">Luanda</SelectItem>
//                       <SelectItem value="benguela">Benguela</SelectItem>
//                       {/* Add more provinces */}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Município</Label>
//                   <Select
//                     value={filters.municipio}
//                     onValueChange={(value) => setFilters(prev => ({ ...prev, municipio: value }))}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o município" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="luanda">Luanda</SelectItem>
//                       <SelectItem value="viana">Viana</SelectItem>
//                       {/* Add more municipalities */}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Bairro</Label>
//                   <Input
//                     value={filters.bairro || ""}
//                     onChange={(e) => setFilters(prev => ({ ...prev, bairro: e.target.value }))}
//                     placeholder="Digite o bairro"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Tipologia</Label>
//                   <Select
//                     value={filters.tipologia}
//                     onValueChange={(value) => setFilters(prev => ({ ...prev, tipologia: value }))}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione a tipologia" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="apartamento">Apartamento</SelectItem>
//                       <SelectItem value="vivenda">Vivenda</SelectItem>
//                       <SelectItem value="terreno">Terreno</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Número de Quartos</Label>
//                   <Select
//                     value={filters.numeroQuarto}
//                     onValueChange={(value) => setFilters(prev => ({ ...prev, numeroQuarto: value }))}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o número de quartos" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {[1, 2, 3, 4, 5].map((num) => (
//                         <SelectItem key={num} value={String(num)}>
//                           {num} {num === 1 ? "quarto" : "quartos"}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Casas de Banho</Label>
//                   <Select
//                     value={filters.numeroCasaBanho}
//                     onValueChange={(value) => setFilters(prev => ({ ...prev, numeroCasaBanho: value }))}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o número de casas de banho" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {[1, 2, 3, 4].map((num) => (
//                         <SelectItem key={num} value={String(num)}>
//                           {num} {num === 1 ? "casa de banho" : "casas de banho"}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Garagem</Label>
//                   <Select
//                     value={filters.garagem}
//                     onValueChange={(value) => setFilters(prev => ({ ...prev, garagem: value }))}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione o número de garagens" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {[0, 1, 2, 3].map((num) => (
//                         <SelectItem key={num} value={String(num)}>
//                           {num} {num === 1 ? "garagem" : "garagens"}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-4">
//                 <Button variant="outline" onClick={clearFilters}>
//                   Limpar Filtros
//                 </Button>
//                 <Button onClick={handleSearch}>
//                   Aplicar Filtros
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>

//           {Object.entries(filters).map(([key, value]) => {
//             if (!value) return null;
//             return (
//               <Badge key={key} variant="secondary" className="gap-1">
//                 {getFilterLabel(key, value)}
//                 <Button
//                   onClick={() => removeFilter(key as keyof SearchFilters)}
//                   className="ml-1 hover:bg-gray-200 rounded-full"
//                 >
//                   <X className="h-3 w-3" />
//                 </Button>
//               </Badge>
//             );
//           })}

//           {Object.keys(filters).length > 0 && (
//             <Button variant="ghost" onClick={clearFilters} className="h-8">
//               Limpar todos
//             </Button>
//           )}
//         </div>

//         <Separator className="my-4" />

//         <div className="mt-8">
//           {isLoading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <div key={index} className="min-w-[300px] w-full">
//                   <Skeleton className="h-52 w-full mb-2" />
//                   <Skeleton className="h-6 w-3/4 mb-2" />
//                   <Skeleton className="h-6 w-1/2" />
//                 </div>
//               ))}
//             </div>
//           ) : error ? (
//             <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
//           ) : data?.imoveis.length === 0 ? (
//             <div className="flex items-center justify-center min-h-[50vh]">
//               <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
//                 <div className="flex items-center justify-center mb-2">
//                   <Info className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <AlertTitle className="font-bold text-lg text-gray-800">
//                   Nenhum imóvel encontrado
//                 </AlertTitle>
//                 <AlertDescription className="text-gray-600">
//                   Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
//                 </AlertDescription>
//               </Alert>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {data?.imoveis.map((imovel) => (
//                 <HouseCard key={imovel.id} imovel={imovel} />
//               ))}
//             </div>
//           )}
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
//               disabled={page === data?.totalPages}
//               variant="outline"
//             >
//               Próxima
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { HouseCard } from "@/components/house-components/house-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImovelLDto } from "./model/type";
import { Info, Filter } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import municipiosData from "@/lib/data/municipiosData.json";
import provinciasData from "@/lib/data/provincias.json";

interface FetchImoveisResponse {
  imoveis: ImovelLDto[];
  totalImoveis: number;
  totalPages: number;
  currentPage: number;
}

interface SearchFilters {
  precoMin?: string;
  precoMax?: string;
  bairro?: string;
  tipologia?: string;
  provincia?: string;
  municipio?: string;
  numeroQuarto?: string;
  numeroCasaBanho?: string;
  garagem?: string;
}

const emptyFilters: SearchFilters = {};

async function fetchImoveis(filters: SearchFilters, page: number): Promise<FetchImoveisResponse> {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  queryParams.set("page", String(page));

  const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar imóveis");
  }
  return response.json();
}

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
  const [page, setPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<number>(0);
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [activeTab, setActiveTab] = useState("tipologia");

  const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
    queryKey: ["imoveis", page, searchTrigger],
    queryFn: () => fetchImoveis(filters, page),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setSearchTrigger(prev => prev + 1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    setSearchTrigger(prev => prev + 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchTrigger(prev => prev + 1);
  };

  const clearFilters = () => {
    setFilters(emptyFilters);
    setSelectedProvincia("");
    setPage(1);
    setSearchTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center p-4 bg-gray-50 shadow-sm rounded-md">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <div>
          <Button className="mr-2">Página Inicial</Button>
          <Button>Sobre</Button>
        </div>
      </nav>

      <div
        className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8"
        style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="w-10/12 max-w-3xl bg-white p-6 rounded-md shadow-lg">
            <Tabs defaultValue="tipologia" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full flex justify-start mb-4">
                <TabsTrigger value="tipologia">Tipologia</TabsTrigger>
                <TabsTrigger value="bairro">Bairro</TabsTrigger>
                <TabsTrigger value="preco">Preço</TabsTrigger>
              </TabsList>

              <TabsContent value="tipologia">
                <div className="flex gap-2">
                  <Select
                    value={filters.tipologia}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, tipologia: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a tipologia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="vivenda">Vivenda</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch}>Pesquisar</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Filtros Avançados</DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Província</Label>
                          <Select
                            value={selectedProvincia}
                            onValueChange={(value) => {
                              setSelectedProvincia(value);
                              setFilters(prev => ({ ...prev, provincia: value, municipio: "" }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a província" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(municipiosData).map((provincia) => (
                                <SelectItem key={provincia} value={provincia}>
                                  {provincia}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Município</Label>
                          <Select
                            value={filters.municipio}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, municipio: value }))}
                            disabled={!selectedProvincia}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o município" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedProvincia &&
                                municipiosData[selectedProvincia as keyof typeof municipiosData].map((municipio) => (
                                  <SelectItem key={municipio} value={municipio}>
                                    {municipio}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Número de Quartos</Label>
                          <Select
                            value={filters.numeroQuarto}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, numeroQuarto: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o número de quartos" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                  {num} {num === 1 ? "quarto" : "quartos"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Casas de Banho</Label>
                          <Select
                            value={filters.numeroCasaBanho}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, numeroCasaBanho: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o número de casas de banho" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                  {num} {num === 1 ? "casa de banho" : "casas de banho"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Garagem</Label>
                          <Select
                            value={filters.garagem}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, garagem: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o número de garagens" />
                            </SelectTrigger>
                            <SelectContent>
                              {[0, 1, 2, 3].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                  {num} {num === 1 ? "garagem" : "garagens"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={clearFilters}>
                          Limpar Filtros
                        </Button>
                        <Button onClick={handleSearch}>
                          Aplicar Filtros
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>

              <TabsContent value="bairro">
                <div className="flex gap-2">
                  <Input
                    value={filters.bairro || ""}
                    onChange={(e) => setFilters(prev => ({ ...prev, bairro: e.target.value }))}
                    placeholder="Digite o bairro"
                    className="w-full"
                  />
                  <Button onClick={handleSearch}>Pesquisar</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {/* Same dialog content as above */}
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>

              <TabsContent value="preco">
                <div className="flex gap-2">
                  <Input
                    value={filters.precoMin || ""}
                    onChange={(e) => setFilters(prev => ({ ...prev, precoMin: e.target.value }))}
                    placeholder="Preço mínimo"
                    type="number"
                    className="w-full"
                  />
                  <Input
                    value={filters.precoMax || ""}
                    onChange={(e) => setFilters(prev => ({ ...prev, precoMax: e.target.value }))}
                    placeholder="Preço máximo"
                    type="number"
                    className="w-full"
                  />
                  <Button onClick={handleSearch}>Pesquisar</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      {/* Same dialog content as above */}
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mt-8">
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
        ) : error ? (
          <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
        ) : data?.imoveis.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Alert className="w-full max-w-md border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
              <div className="flex items-center justify-center mb-2">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
              <AlertTitle className="font-bold text-lg text-gray-800">
                Nenhum imóvel encontrado
              </AlertTitle>
              <AlertDescription className="text-gray-600">
                Não encontramos imóveis com os critérios selecionados. Tente ajustar seus filtros de busca.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {data?.imoveis.map((imovel) => (
              <HouseCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div>

      {data && data.imoveis && data.imoveis.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <Button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={page === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {page} de {data.totalPages}
          </span>
          <Button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={page === data?.totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}