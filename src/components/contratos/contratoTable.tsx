"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useUser } from "@/hooks/getUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchContratos } from "@/lib/api-getContracts";


interface Contrato {
  id: string;
  valorTotal: number;
  dataInicio: string;
  dataFim: string;
  termosContrato: string;
  urlDocumento: string;
  imovel: {
    id: string;
    titulo: string;
    endereco: string;
    bairro: string;
    provincia: string;
  };
  inquilino: {
    id: string;
    nome: string;
    email: string;
  };
  proprietario: {
    id: string;
    nome: string;
    email: string;
  };
}

interface ContratosResponse {
  contratos: Contrato[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const ContratosTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["contratos", user?.id, user?.role, page, pageSize, searchTrigger],
    queryFn: () => fetchContratos(user!.id, user!.role, page, pageSize),
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
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const handleContratoClick = (contratoId: string) => {
    router.push(`/contratos/${contratoId}`);
  };

  const getPageNumbers = () => {
    if (!data?.totalPages) return [];
    return Array.from({ length: data.totalPages }, (_, i) => i + 1);
  };

  const LoadingComponent = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="text-lg text-blue-600">Carregando...</span>
      </div>
    </div>
  );

  if (userLoading || (isLoading && !isFetching)) return <LoadingComponent />;

  if (!user) return <div>Por favor, faça login para visualizar os contratos.</div>;

  const isProprietario = user.role === "PROPRIETARIO";

  return (
    <div className="p-4 space-y-4 relative">
      {isFetching ? (
        <div className="space-y-4 relative">
          <div className="flex justify-end mb-4">
            <Skeleton className="h-10 w-[180px] bg-blue-200" />
          </div>
          <div className="w-full relative">
            <Skeleton className="h-10 w-full mb-2 bg-blue-200" />
            {Array.from({ length: pageSize }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full mb-2 bg-blue-200" />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="text-lg text-blue-600">Carregando...</span>
              </div>
            </div>
          </div>
        </div>
        ) : error ? (
          <div className="text-red-500">
            Erro: {error instanceof Error ? error.message : "Erro desconhecido"}
          </div>
        ) : !data?.contratos?.length ? (
          <Alert className="w-full max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
            <div className="flex items-center justify-center mb-2">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <AlertTitle className="font-bold text-lg text-gray-800">
              Nenhum contrato encontrado
            </AlertTitle>
            <AlertDescription className="text-gray-600">
              {isProprietario
                ? "Nenhum contrato registrado para seus imóveis."
                : "Você ainda não possui nenhum contrato registrado."}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Itens por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 por página</SelectItem>
                  <SelectItem value="20">20 por página</SelectItem>
                  <SelectItem value="30">30 por página</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isProprietario ? "Nome do Inquilino" : "Nome do Proprietário"}</TableHead>
                  <TableHead>Imóvel</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Data Fim</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.contratos.map((contrato:any) => (
                  <TableRow
                    key={contrato.id}
                    onClick={() => handleContratoClick(contrato.id)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{isProprietario ? contrato.inquilino.nome : contrato.proprietario.nome}</TableCell>
                    <TableCell>{contrato.imovel.titulo}</TableCell>
                    <TableCell>
                      {contrato.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "AOA" })}
                    </TableCell>
                    <TableCell>{contrato.dataInicio}</TableCell>
                    <TableCell>{contrato.dataFim}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {data.totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-2">
                <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  variant="outline"
                  size="sm"
                >
                  Anterior
                </Button>
                {getPageNumbers().map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                  >
                    {pageNum}
                  </Button>
                ))}
                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === data.totalPages}
                  variant="outline"
                  size="sm"
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default ContratosTable;