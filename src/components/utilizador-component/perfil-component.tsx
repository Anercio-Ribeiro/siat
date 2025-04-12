// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { NextPage } from "next";
// import { UtilizadorCustom } from "@/app/model/type";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User } from "@prisma/client";
// import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";

// const PerfilPage: NextPage<{ params: { id: string } }> = ({ params }) => {
//   const { id } = params;
//   const router = useRouter();

//   const [utilizador, setUtilizador] = useState<UtilizadorCustom | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [reloading, setReloading] = useState(false);
//   const [headerMessage, setHeaderMessage] = useState<string | null>(null);
//   const [email, setEmail] = useState("");
//   const [telefone, setTelefone] = useState("");
//   const [senha, setSenha] = useState("");
//   const [novaSenha, setNovaSenha] = useState("");
//   const [imagem, setImagem] = useState<File | null>(null);
//   const [previewImagem, setPreviewImagem] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [senhaError, setSenhaError] = useState<string | null>(null);

//   // Buscar dados do utilizador
//   useEffect(() => {
//     const fetchUtilizador = async () => {
//       try {
//         const response = await fetch(`/api/utilizador/get/${id}`, { method: "GET" });
//         const data = await response.json();

//         if (response.ok && data.utilizador) {
//           setUtilizador(data.utilizador);
//           setEmail(data.utilizador.email);
//           setTelefone(data.utilizador.telefone);
//           setPreviewImagem(data.utilizador.picture || null);
//         } else {
//           setHeaderMessage("Utilizador não encontrado");
//           toast.error("Utilizador não encontrado");
//         }
//       } catch (err) {
//         setHeaderMessage("Erro ao conectar com o servidor");
//         toast.error("Erro ao conectar com o servidor");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUtilizador();
//   }, [id]);

//   // Upload da imagem
//   const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImagem(file);
//       setPreviewImagem(URL.createObjectURL(file));
//     }
//   };

//   // Função para simular atraso
//   const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//   // Submissão do formulário
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setHeaderMessage(null);
//     setSenhaError(null);

//     if (!utilizador) {
//       setHeaderMessage("Utilizador não encontrado");
//       toast.error("Utilizador não encontrado");
//       return;
//     }

//     setIsSubmitting(true);

//     // Verificar se está a tentar atualizar a senha
//     const atualizarSenha = novaSenha.length > 0;
    
//     // Se estiver a tentar atualizar senha, verifique primeiro a senha atual
//     if (atualizarSenha) {
//       if (!senha) {
//         setSenhaError("Por favor, insira a senha atual");
//         toast.error("Por favor, insira a senha atual");
//         setIsSubmitting(false);
//         return;
//       }

//       // Verificar a senha atual com o servidor antes de prosseguir
//       try {
//         const verificarSenhaResponse = await fetch(`/api/utilizador/verificar-senha/${id}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ senha }),
//         });

//         const verificarSenhaData = await verificarSenhaResponse.json();
        
//         if (!verificarSenhaResponse.ok || !verificarSenhaData.valida) {
//           setSenhaError("A senha atual introduzida não corresponde à senha na base de dados");
//           toast.error("Senha atual incorreta");
//           setIsSubmitting(false);
//           return;
//         }
        
//         // Verificar se a nova senha é igual à atual
//         if (senha === novaSenha) {
//           setSenhaError("A nova senha não pode ser igual à senha atual");
//           toast.error("A nova senha deve ser diferente da atual");
//           setIsSubmitting(false);
//           return;
//         }
//       } catch (err) {
//         setSenhaError("Erro ao verificar a senha atual");
//         toast.error("Erro ao verificar a senha atual");
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     // Preparar dados para atualização
//     const updatedData: Partial<Omit<User, "id">> & { senha?: string; novaSenha?: string } = {};
//     if (email !== utilizador.email) updatedData.email = email;
//     if (telefone !== utilizador.telefone) updatedData.telefone = telefone;
//     if (atualizarSenha) {
//       updatedData.senha = senha; // Senha atual para verificação no servidor
//       updatedData.novaSenha = novaSenha; // Nova senha para atualização
//     }

//     // Upload de imagem, se houver
//     if (imagem) {
//       const formData = new FormData();
//       formData.append("file", imagem);
//       try {
//         const uploadResponse = await fetch("/api/utilizador/upload", {
//           method: "POST",
//           body: formData,
//         });
//         const uploadData = await uploadResponse.json();
//         if (uploadResponse.ok) {
//           updatedData.picture = uploadData.url;
//         } else {
//           setHeaderMessage("Erro ao fazer upload da imagem");
//           toast.error("Erro ao fazer upload da imagem");
//           setIsSubmitting(false);
//           return;
//         }
//       } catch (err) {
//         setHeaderMessage("Erro ao fazer upload da imagem");
//         toast.error("Erro ao fazer upload da imagem");
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     // Se não houver nada para atualizar
//     if (Object.keys(updatedData).length === 0) {
//       setHeaderMessage("Nenhuma alteração para salvar");
//       toast.info("Nenhuma alteração para salvar");
//       setIsSubmitting(false);
//       return;
//     }

//     // Enviar a atualização para o servidor
//     try {
//       const response = await fetch(`/api/utilizador/update/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         // Mostrar skeleton effect e recarregar após 3 segundos
//         setReloading(true);
        
//         // Mensagem de sucesso específica para atualização de senha
//         if (atualizarSenha) {
//           setHeaderMessage("Senha atualizada com sucesso!");
//           toast.success("Senha atualizada com sucesso!");
//         } else {
//           setHeaderMessage("Perfil atualizado com sucesso!");
//           toast.success("Perfil atualizado com sucesso!");
//         }
        
//         // Limpar campos de senha
//         setSenha("");
//         setNovaSenha("");
//         setSenhaError(null);
        
//         // Esperar 3 segundos para mostrar o skeleton
//         await delay(3000);
        
//         // Recarregar dados do utilizador
//         const refreshResponse = await fetch(`/api/utilizador/get/${id}`, { method: "GET" });
//         const refreshData = await refreshResponse.json();
        
//         if (refreshResponse.ok && refreshData.utilizador) {
//           setUtilizador(refreshData.utilizador);
//           setEmail(refreshData.utilizador.email);
//           setTelefone(refreshData.utilizador.telefone);
//           setPreviewImagem(refreshData.utilizador.picture || null);
//         }
//       } else {
//         setHeaderMessage(data.error || "Erro ao atualizar perfil");
//         toast.error(data.error || "Erro ao atualizar perfil");
//         if (data.error && data.error.toLowerCase().includes("senha")) {
//           setSenhaError(data.error);
//         }
//       }
//     } catch (err) {
//       setHeaderMessage("Erro ao conectar com o servidor");
//       toast.error("Erro ao conectar com o servidor");
//     } finally {
//       setIsSubmitting(false);
//       setReloading(false);
//     }
//   };

//   if (loading) {
//     return <ProfileSkeleton />;
//   }

//   if (reloading) {
//     return (
//       <div className="container mx-auto p-6 max-w-2xl">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">
//               <Skeleton className="h-8 w-40 mx-auto" />
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Skeleton para a imagem do perfil */}
//             <div className="flex flex-col items-center space-y-4">
//               <Skeleton className="h-32 w-32 rounded-full" />
//               <Skeleton className="h-10 w-32" />
//             </div>

//             {/* Skeleton para o formulário */}
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-16" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-24" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-16" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-20" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-24" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-24" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//               <Skeleton className="h-11 w-full" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-2xl">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-center">
//             Meu Perfil
//             {headerMessage && (
//               <span className={`ml-2 text-sm ${headerMessage.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
//                 - {headerMessage}
//               </span>
//             )}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Imagem do Perfil */}
//           <div className="flex flex-col items-center space-y-4">
//             <Avatar className="w-32 h-32">
//               <AvatarImage src={previewImagem || "/default-avatar.png"} alt="Foto de perfil" />
//               <AvatarFallback>{utilizador?.nome[0] || "U"}</AvatarFallback>
//             </Avatar>
//             <Label htmlFor="picture" className="cursor-pointer">
//               <Button variant="outline" asChild>
//                 <span>Alterar Imagem</span>
//               </Button>
//               <Input
//                 id="picture"
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImagemChange}
//               />
//             </Label>
//           </div>

//           {/* Formulário */}
//           {utilizador && (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="nome">Nome</Label>
//                 <Input
//                   id="nome"
//                   value={utilizador.nome}
//                   disabled
//                   className="bg-gray-100"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="username">Nome de utilizador</Label>
//                 <Input
//                   id="username"
//                   value={utilizador.username}
//                   disabled
//                   className="bg-gray-100"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="telefone">Telefone</Label>
//                 <Input
//                   id="telefone"
//                   type="tel"
//                   value={telefone}
//                   onChange={(e) => setTelefone(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="senha" className="flex justify-between">
//                   <span>Senha Atual</span>
//                   {senhaError && <span className="text-red-500 text-xs">{senhaError}</span>}
//                 </Label>
//                 <Input
//                   id="senha"
//                   type="password"
//                   value={senha}
//                   onChange={(e) => {
//                     setSenha(e.target.value);
//                     setSenhaError(null); // Limpar erro ao digitar
//                   }}
//                   className={senhaError ? "border-red-500" : ""}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="novaSenha">Nova Senha</Label>
//                 <Input
//                   id="novaSenha"
//                   type="password"
//                   value={novaSenha}
//                   onChange={(e) => setNovaSenha(e.target.value)}
//                 />
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <svg
//                       className="animate-spin h-5 w-5 mr-2"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     Salvando...
//                   </>
//                 ) : (
//                   "Salvar Alterações"
//                 )}
//               </Button>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // Componente de esqueleto para o carregamento inicial
// const ProfileSkeleton = () => {
//   return (
//     <div className="container mx-auto p-6 max-w-2xl">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-center">
//             <Skeleton className="h-8 w-40 mx-auto" />
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Skeleton para a imagem do perfil */}
//           <div className="flex flex-col items-center space-y-4">
//             <Skeleton className="h-32 w-32 rounded-full" />
//             <Skeleton className="h-10 w-32" />
//           </div>

//           {/* Skeleton para o formulário */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-16" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-24" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-16" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-20" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-24" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-24" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//             <Skeleton className="h-11 w-full" />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PerfilPage;
















"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { UtilizadorCustom } from "@/app/model/type";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const PerfilPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [utilizador, setUtilizador] = useState<UtilizadorCustom | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [headerMessage, setHeaderMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Buscar dados do utilizador
  useEffect(() => {
    const fetchUtilizador = async () => {
      try {
        const response = await fetch(`/api/utilizador/get/${id}`, { method: "GET" });
        const data = await response.json();

        if (response.ok && data.utilizador) {
          setUtilizador(data.utilizador);
          setEmail(data.utilizador.email);
          setTelefone(data.utilizador.telefone);
          setPreviewImagem(data.utilizador.picture || null);
        } else {
          setHeaderMessage("Utilizador não encontrado");
          toast.error("Utilizador não encontrado");
        }
      } catch (err) {
        setHeaderMessage("Erro ao conectar com o servidor");
        toast.error("Erro ao conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUtilizador();
  }, [id]);

  // Upload da imagem
  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagem(file);
      setPreviewImagem(URL.createObjectURL(file));
    }
  };

  // Função para simular atraso
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeaderMessage(null);

    if (!utilizador) {
      setHeaderMessage("Utilizador não encontrado");
      toast.error("Utilizador não encontrado");
      return;
    }

    setIsSubmitting(true);

    // Preparar dados para atualização
    const updatedData: Partial<Omit<User, "id">> & { novaSenha?: string } = {};
    if (email !== utilizador.email) updatedData.email = email;
    if (telefone !== utilizador.telefone) updatedData.telefone = telefone;
    if (novaSenha.length > 0) {
      updatedData.novaSenha = novaSenha;
    }

    // Upload de imagem, se houver
    if (imagem) {
      const formData = new FormData();
      formData.append("file", imagem);
      try {
        const uploadResponse = await fetch("/api/utilizador/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok) {
          updatedData.picture = uploadData.url;
        } else {
          setHeaderMessage("Erro ao fazer upload da imagem");
          toast.error("Erro ao fazer upload da imagem");
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        setHeaderMessage("Erro ao fazer upload da imagem");
        toast.error("Erro ao fazer upload da imagem");
        setIsSubmitting(false);
        return;
      }
    }

    // Se não houver nada para atualizar
    if (Object.keys(updatedData).length === 0) {
      setHeaderMessage("Nenhuma alteração para salvar");
      toast.info("Nenhuma alteração para salvar");
      setIsSubmitting(false);
      return;
    }

    // Enviar a atualização para o servidor
    try {
      const response = await fetch(`/api/utilizador/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Mostrar skeleton effect e recarregar após 3 segundos
        setReloading(true);
        
        // Mensagem de sucesso específica para atualização de senha
        if (novaSenha.length > 0) {
          setHeaderMessage("Senha atualizada com sucesso!");
          toast.success("Senha atualizada com sucesso!");
        } else {
          setHeaderMessage("Perfil atualizado com sucesso!");
          toast.success("Perfil atualizado com sucesso!");
        }
        
        // Limpar campo de senha
        setNovaSenha("");
        
        // Esperar 3 segundos para mostrar o skeleton
        await delay(3000);
        
        // Recarregar dados do utilizador
        const refreshResponse = await fetch(`/api/utilizador/get/${id}`, { method: "GET" });
        const refreshData = await refreshResponse.json();
        
        if (refreshResponse.ok && refreshData.utilizador) {
          setUtilizador(refreshData.utilizador);
          setEmail(refreshData.utilizador.email);
          setTelefone(refreshData.utilizador.telefone);
          setPreviewImagem(refreshData.utilizador.picture || null);
        }
      } else {
        setHeaderMessage(data.error || "Erro ao atualizar perfil");
        toast.error(data.error || "Erro ao atualizar perfil");
      }
    } catch (err) {
      setHeaderMessage("Erro ao conectar com o servidor");
      toast.error("Erro ao conectar com o servidor");
    } finally {
      setIsSubmitting(false);
      setReloading(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (reloading) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <Skeleton className="h-8 w-40 mx-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Skeleton para a imagem do perfil */}
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Skeleton para o formulário */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-11 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Meu Perfil
            {headerMessage && (
              <span className={`ml-2 text-sm ${headerMessage.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
                - {headerMessage}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Imagem do Perfil */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={previewImagem || "/default-avatar.png"} alt="Foto de perfil" />
              <AvatarFallback>{utilizador?.nome[0] || "U"}</AvatarFallback>
            </Avatar>
            <Label htmlFor="picture" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>Alterar Imagem</span>
              </Button>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImagemChange}
              />
            </Label>
          </div>

          {/* Formulário */}
          {utilizador && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={utilizador.nome}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nome de utilizador</Label>
                <Input
                  id="username"
                  value={utilizador.username}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="novaSenha">Nova Senha</Label>
                <Input
                  id="novaSenha"
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Deixe em branco para manter a senha atual"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de esqueleto para o carregamento inicial
const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <Skeleton className="h-8 w-40 mx-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skeleton para a imagem do perfil */}
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Skeleton para o formulário */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-11 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerfilPage;