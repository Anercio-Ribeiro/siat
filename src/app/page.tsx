"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Definindo o tipo da resposta da API
interface FetchImoveisResponse {
  imoveis: ImovelLDto[];
}

// Função assíncrona para buscar imóveis
async function fetchImoveis(): Promise<FetchImoveisResponse> {
  const response = await fetch(`/api/imoveis/getAll`); // Altere a URL se necessário
  if (!response.ok) {
    throw new Error("Erro ao buscar imóveis");
  }
  return response.json();
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("preco");

  // Usando useQuery para buscar imóveis
  const { data, isLoading, error } = useQuery<FetchImoveisResponse, Error>({
    queryKey: ["imoveis"],
    queryFn: fetchImoveis,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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

      <div className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden mt-8" style={{ backgroundImage: "url('/imoveis/home-background.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Tabs defaultValue="preco" onValueChange={handleTabChange} className="w-10/12 max-w-3xl bg-white p-4 rounded-md shadow-lg">
            <TabsList className="flex space-x-4 mb-4 bg-white w-96">
              <TabsTrigger
                value="preco"
                className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === 'preco' ? 'border-b-2 border-red-500' : ''}`}
              >
                Preço
              </TabsTrigger>
              <TabsTrigger
                value="localizacao"
                className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === 'localizacao' ? 'border-b-2 border-red-500' : ''}`}
              >
                Localização
              </TabsTrigger>
              <TabsTrigger
                value="tipologia"
                className={`text-xl font-medium bg-white hover:bg-gray-200 ${activeTab === 'tipologia' ? 'border-b-2 border-red-500' : ''}`}
              >
                Tipologia
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preco">
              <div className="flex items-center space-x-2">
                <Input placeholder="Preço mínimo" className="w-full" />
                <Input placeholder="Preço máximo" className="w-full" />
                <Button className="ml-2">Pesquisar</Button>
              </div>
            </TabsContent>
            <TabsContent value="localizacao">
              <div className="flex items-center space-x-2">
                <Input placeholder="Digite a localização" className="w-full" />
                <Button className="ml-2">Pesquisar</Button>
              </div>
            </TabsContent>
            <TabsContent value="tipologia">
              <div className="flex items-center space-x-2">
                <Input placeholder="Digite a tipologia" className="w-full" />
                <Button className="ml-2">Pesquisar</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Seção de listagem de imóveis */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">Erro ao carregar imóveis: {error.message}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data?.imoveis.map((imovel) => (
              <HouseCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
