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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Search, Edit } from "lucide-react";
import { useUser } from "@/hooks/getUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: string;
  estado: boolean;
  criadoEm: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  totalPages: number;
  currentPage: number;
}

async function fetchUsers(
  page: number,
  pageSize: number,
  filters: {
    name?: string;
    role?: string;
    status?: boolean;
  }
): Promise<UsersResponse> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(filters.name && { name: filters.name }),
    ...(filters.role && filters.role !== "all" && { role: filters.role }),
    ...(filters.status !== undefined && { status: filters.status.toString() }),
  });

  const response = await fetch(`/api/utilizador/getAll`, {
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error("Sessão inválida ou não autenticada");
    const errorText = await response.text();
    throw new Error(`Erro ao buscar utilizadores: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  return {
    users: data.users || [],
    total: data.total || 0,
    totalPages: data.totalPages || 1,
    currentPage: data.currentPage || page,
  };
}

async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const response = await fetch(`/api/utilizador/update/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao atualizar utilizador: ${response.status} - ${errorText}`);
  }
  const result = await response.json();
  return result.utilizador;
}

const UtilizadorListings: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  // Estados para os filtros de entrada
  const [inputName, setInputName] = useState("");
  const [inputRole, setInputRole] = useState("all");
  const [inputStatus, setInputStatus] = useState<string>("all");

  // Estados para os filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState<{
    name?: string;
    role?: string;
    status?: boolean;
  }>({});

  // Estado para edição de utilizador
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTelefone, setEditTelefone] = useState("");
  const [editEstado, setEditEstado] = useState<boolean | undefined>(undefined);

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["users", user?.id, page, pageSize, JSON.stringify(appliedFilters)],
    queryFn: () => fetchUsers(page, pageSize, appliedFilters),
    enabled: !!user,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const handleSearch = () => {
    setAppliedFilters({
      name: inputName,
      role: inputRole,
      status: inputStatus === "true" ? true : inputStatus === "false" ? false : undefined,
    });
    setPage(1);
    refetch();
  };

  const handleClearFilters = () => {
    setInputName("");
    setInputRole("all");
    setInputStatus("all");
    setAppliedFilters({});
    setPage(1);
    refetch();
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setEditNome(user.nome);
    setEditEmail(user.email);
    setEditEstado(user.estado);
    setEditTelefone(user.telefone);
  };

  const handleSaveUser = async () => {
    if (!editUser) return;
    try {
      await updateUser(editUser.id, {
        nome: editNome,
        email: editEmail,
        estado: editEstado,
        telefone: editTelefone, // Preserving telefone as it is not editable in this context
      });
      setEditUser(null);
      refetch();
    } catch (error) {
      console.error("Erro ao atualizar utilizador:", error);
    }
  };

  const getPageNumbers = () => {
    if (!data?.totalPages) return { pages: [], showFirst: false, showLast: false, showLeftEllipsis: false, showRightEllipsis: false };
    const maxPagesToShow = 5;
    const pages = [];
    const currentPage = data.currentPage;
    const totalPages = data.totalPages;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      pages,
      showFirst: startPage > 1,
      showLast: endPage < totalPages,
      showLeftEllipsis: startPage > 2,
      showRightEllipsis: endPage < totalPages - 1,
    };
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

  if (!user) return <div>Please log in to view users.</div>;

  return (
    <div className="p-4 space-y-4 relative">
      {/* Barra de Pesquisa */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Nome do Utilizador"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Select value={inputRole} onValueChange={setInputRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecionar Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="INQUILINO">Inquilino</SelectItem>
              <SelectItem value="PROPRIETARIO">Proprietário</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={inputStatus} onValueChange={setInputStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecionar Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Ativo</SelectItem>
              <SelectItem value="false">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          Pesquisar
        </Button>
        <Button onClick={handleClearFilters} variant="outline">
          Limpar
        </Button>
      </div>

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
          Erro: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      ) : !data?.users?.length ? (
        <Alert className="w-full max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-4 bg-white">
          <div className="flex items-center justify-center mb-2">
            <Info className="h-6 w-6 text-blue-600" />
          </div>
          <AlertTitle className="font-bold text-lg text-gray-800">
            Nenhum utilizador encontrado
          </AlertTitle>
          <AlertDescription className="text-gray-600">
            Nenhum utilizador registrado com os filtros aplicados.
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
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Criado Em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.users.map((user) => (
                <TableRow key={user.id} className="cursor-pointer hover:bg-gray-100">
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telefone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: user.estado ? "green" : "red",
                        color: "white",
                      }}
                    >
                      {user.estado ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.criadoEm).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      {editUser?.id === user.id && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Utilizador</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Nome</Label>
                              <Input
                                value={editNome}
                                onChange={(e) => setEditNome(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                              />
                            </div>
                             <div>
                              <Label>Telefone</Label>
                              <Input
                                value={editTelefone}
                                onChange={(e) => setEditTelefone(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Estado</Label>
                              <Select
                                value={editEstado ? "true" : "false"}
                                onValueChange={(value) =>
                                  setEditEstado(value === "true")
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">Ativo</SelectItem>
                                  <SelectItem value="false">Inativo</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleSaveUser}>Salvar</Button>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
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
              {getPageNumbers().showFirst && (
                <Button
                  onClick={() => handlePageChange(1)}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                >
                  1
                </Button>
              )}
              {getPageNumbers().showLeftEllipsis && (
                <span className="text-sm text-gray-500">...</span>
              )}
              {getPageNumbers().pages.map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                >
                  {pageNum}
                </Button>
              ))}
              {getPageNumbers().showRightEllipsis && (
                <span className="text-sm text-gray-500">...</span>
              )}
              {getPageNumbers().showLast && data?.totalPages && (
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
                disabled={page === (data?.totalPages ?? 1)}
                variant="outline"
                size="sm"
              >
                Próximo
              </Button>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default UtilizadorListings;