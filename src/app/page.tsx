"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImovelLDto } from "./model/type";
import { useRouter } from "next/navigation";
import { Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface FetchImoveisResponse {
  imoveis: ImovelLDto[];
  totalImoveis: number;
  totalPages: number;
  currentPage: number;
}

async function fetchImoveis(filters: Record<string, any>, page: number): Promise<FetchImoveisResponse> {
  const queryParams = new URLSearchParams(filters as any);
  queryParams.set("page", String(page));
  const response = await fetch(`/api/imoveis/searchBy?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar imóveis");
  }
  return response.json();
}

export default function HomePage() {
  const [precoMin, setPrecoMin] = useState<string>("");
  const [precoMax, setPrecoMax] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [tipologia, setTipologia] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("preco");
  const [page, setPage] = useState<number>(1);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);

  const { data, isLoading, error, refetch } = useQuery<FetchImoveisResponse, Error>({
    queryKey: ["imoveis", page],
    queryFn: () => fetchImoveis(isSearchClicked ? { precoMin, precoMax, bairro, tipologia } : {}, page),
    enabled: page > 0,
  });

  const router = useRouter();

  useEffect(() => {
    const session = document.cookie.includes('sessionId'); // Validar sessão pelo cookie (ou outra lógica)
    if (!session) {
      router.push('/'); // Redirecionar para "/" se não autenticado
    }
  }, []);

  useEffect(() => {
    setIsSkeletonVisible(true);
    const timer = setTimeout(() => {
      setIsSkeletonVisible(false);
    }, 500);

    refetch();

    return () => clearTimeout(timer);
  }, [page, refetch]);

  const handleSearch = () => {
    setIsSearchClicked(true);
    setPage(1);
    refetch();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
          <Tabs defaultValue="preco" onValueChange={handleTabChange} className="w-10/12 max-w-3xl bg-white p-4 rounded-md shadow-lg">
            <TabsList className="flex space-x-4 mb-4 bg-white w-96">
              <TabsTrigger value="preco" className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === "preco" ? "border-b-2 border-red-500" : ""}`}>
                Preço
              </TabsTrigger>
              <TabsTrigger value="localizacao" className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === "localizacao" ? "border-b-2 border-red-500" : ""}`}>
                Localização
              </TabsTrigger>
              <TabsTrigger value="tipologia" className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === "tipologia" ? "border-b-2 border-red-500" : ""}`}>
                Tipologia
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preco">
              <div className="flex items-center space-x-2">
                <Input value={precoMin} onChange={(e) => setPrecoMin(e.target.value)} placeholder="Preço mínimo" className="w-full" />
                <Input value={precoMax} onChange={(e) => setPrecoMax(e.target.value)} placeholder="Preço máximo" className="w-full" />
                <Button className="ml-2" onClick={handleSearch}>Pesquisar</Button>
              </div>
            </TabsContent>
            <TabsContent value="localizacao">
              <div className="flex items-center space-x-2">
                <Input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Digite a localização" className="w-full" />
                <Button className="ml-2" onClick={handleSearch}>Pesquisar</Button>
              </div>
            </TabsContent>
            <TabsContent value="tipologia">
              <div className="flex items-center space-x-2">
                <Input value={tipologia} onChange={(e) => setTipologia(e.target.value)} placeholder="Digite a tipologia" className="w-full" />
                <Button className="ml-2" onClick={handleSearch}>Pesquisar</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* <div className="mt-8">
        {isLoading || isSkeletonVisible ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {data?.imoveis.map((imovel) => (
              <HouseCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div> */}


<div className="mt-8">
        {isLoading || isSkeletonVisible ? (
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
              <AlertTitle className="font-bold text-lg text-gray-800">Nenhum imóvel disponível</AlertTitle>
              <AlertDescription className="text-gray-600">
                No momento, não há imóveis para exibição. Por favor, volte mais tarde para conferir novas opções.
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

      

      <div className="mt-4 flex justify-between">
        <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Anterior
        </Button>
        <Button onClick={() => handlePageChange(page + 1)} disabled={page === data?.totalPages}>
          Próxima
        </Button>
      </div>
    </div>
  );
}


