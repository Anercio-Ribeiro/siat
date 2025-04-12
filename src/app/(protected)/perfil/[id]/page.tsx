// "use client";

import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
import PerfilPage from "@/components/utilizador-component/perfil-component";


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

// const PerfilPage: NextPage<{ params: { id: string } }> = ({ params }) => {
//   const { id } = params;
//   const router = useRouter();

//   const [utilizador, setUtilizador] = useState<UtilizadorCustom | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [headerMessage, setHeaderMessage] = useState<string | null>(null);
//   const [email, setEmail] = useState("");
//   const [telefone, setTelefone] = useState("");
//   const [senha, setSenha] = useState("");
//   const [novaSenha, setNovaSenha] = useState("");
//   const [imagem, setImagem] = useState<File | null>(null);
//   const [previewImagem, setPreviewImagem] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//     if (!utilizador) {
//       setHeaderMessage("Utilizador não encontrado");
//       toast.error("Utilizador não encontrado");
//       return;
//     }

//     setIsSubmitting(true);

//     const updatedData: Partial<Omit<User, "id">> & { senha?: string; novaSenha?: string } = {};
//     if (email !== utilizador.email) updatedData.email = email;
//     if (telefone !== utilizador.telefone) updatedData.telefone = telefone;
//     if (novaSenha) {
//       if (!senha) {
//         setHeaderMessage("Por favor, insira a senha atual");
//         toast.error("Por favor, insira a senha atual");
//         setIsSubmitting(false);
//         return;
//       }
//       updatedData.senha = senha; // Senha atual
//       updatedData.novaSenha = novaSenha; // Nova senha
//     }

//     if (imagem) {
//       const formData = new FormData();
//       formData.append("file", imagem);
//       const uploadResponse = await fetch("/api/utilizador/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const uploadData = await uploadResponse.json();
//       if (uploadResponse.ok) {
//         updatedData.picture = uploadData.url;
//       } else {
//         setHeaderMessage("Erro ao fazer upload da imagem");
//         toast.error("Erro ao fazer upload da imagem");
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     try {
//       await delay(3000); // Atraso de 3 segundos

//       const response = await fetch(`/api/utilizador/update/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUtilizador(data.utilizador);
//         setSenha("");
//         setNovaSenha("");
//         setHeaderMessage("Perfil atualizado com sucesso!");
//         toast.success("Perfil atualizado com sucesso!");
//       } else {
//         setHeaderMessage(data.error || "Erro ao atualizar perfil");
//         toast.error(data.error || "Erro ao atualizar perfil");
//       }
//     } catch (err) {
//       setHeaderMessage("Erro ao conectar com o servidor");
//       toast.error("Erro ao conectar com o servidor");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 max-w-2xl text-center">
//         <p>Carregando...</p>
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
//                 <Label htmlFor="senha">Senha Atual</Label>
//                 <Input
//                   id="senha"
//                   type="password"
//                   value={senha}
//                   onChange={(e) => setSenha(e.target.value)}
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

// export default PerfilPage;


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { NextPage } from "next";
// import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
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

// const PerfilPage: NextPage<{ params: { id: string } }> = ({ params }) => {
//   const { id } = params;
//   const router = useRouter();

//   // Estados
//   const [utilizador, setUtilizador] = useState<UtilizadorCustom | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [email, setEmail] = useState("");
//   const [telefone, setTelefone] = useState("");
//   const [senha, setSenha] = useState("");
//   const [novaSenha, setNovaSenha] = useState("");
//   const [imagem, setImagem] = useState<File | null>(null);
//   const [previewImagem, setPreviewImagem] = useState<string | null>(null);

//   // Buscar dados do utilizador
//   useEffect(() => {
//     const fetchUtilizador = async () => {
//       try {
//         const response = await fetch(`/api/utilizador/get/${id}`, { method: "GET" });
//         const data = await response.json();

//         if (response.ok) {
//           setUtilizador(data.utilizador);
//           setEmail(data.utilizador.email);
//           setTelefone(data.utilizador.telefone);
//           setPreviewImagem(data.utilizador.picture || null);
//         } else {
//         //   setError(data.error || "Erro ao carregar utilizador");
//             toast.error(data.error || "Erro ao carregar utilizador");
//         }
//       } catch (err) {
//         toast.error("Erro ao conectar com o servidor");
//         // setError("Erro ao conectar com o servidor");
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

//   // Submissão do formulário
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const updatedData: Partial<Omit<User, "id">> = {};
//     if (email !== utilizador?.email) updatedData.email = email;
//     if (telefone !== utilizador?.telefone) updatedData.telefone = telefone;
//     if (novaSenha) updatedData.senha = novaSenha;

//     if (imagem) {
//       const formData = new FormData();
//       formData.append("file", imagem);
//       const uploadResponse = await fetch("/api/utilizador/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const uploadData = await uploadResponse.json();
//       if (uploadResponse.ok) {
//         updatedData.picture = uploadData.url;
//       } else {
//         setError("Erro ao fazer upload da imagem");
//         return;
//       }
//     }

//     try {
//       const response = await fetch(`/api/utilizador/update/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUtilizador(data.utilizador);
//         setNovaSenha("");
//         toast.success("Perfil atualizado com sucesso!");
//       } else {
//         toast.error(data.error || "Erro ao atualizar perfil");
//         // setError(data.error || "Erro ao atualizar perfil");
//       }
//     } catch (err) {
//         toast.error("Erro ao conectar com o servidor");
//     //   setError("Erro ao conectar com o servidor");
//     }
//   };

//   if (loading) return <p className="text-center">Carregando...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!utilizador) return <p className="text-center">Utilizador não encontrado</p>;

//   return (
  
//       <div className="container mx-auto p-6 max-w-2xl">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Meu Perfil</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Imagem do Perfil */}
//             <div className="flex flex-col items-center space-y-4">
//               <Avatar className="w-32 h-32">
//                 <AvatarImage src={previewImagem || "/default-avatar.png"} alt="Foto de perfil" />
//                 <AvatarFallback>{utilizador.nome[0]}</AvatarFallback>
//               </Avatar>
//               <Label htmlFor="picture" className="cursor-pointer">
//                 <Button variant="outline" asChild>
//                   <span>Alterar Imagem</span>
//                 </Button>
//                 <Input
//                   id="picture"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImagemChange}
//                 />
//               </Label>
//             </div>

//             {/* Formulário */}
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
//                 <Label htmlFor="nome">Nome de utilizador</Label>
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
//                 <Label htmlFor="senha">Senha Atual</Label>
//                 <Input
//                   id="senha"
//                   type="password"
//                   value={senha}
//                   onChange={(e) => setSenha(e.target.value)}
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

//               <Button type="submit" className="w-full">
//                 Salvar Alterações
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
 
//   );
// };

// export default PerfilPage;









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

// const PerfilPage: NextPage<{ params: { id: string } }> = ({ params }) => {
//   const { id } = params;
//   const router = useRouter();

//   const [utilizador, setUtilizador] = useState<UtilizadorCustom | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [headerMessage, setHeaderMessage] = useState<string | null>(null);
//   const [email, setEmail] = useState("");
//   const [telefone, setTelefone] = useState("");
//   const [senha, setSenha] = useState("");
//   const [novaSenha, setNovaSenha] = useState("");
//   const [imagem, setImagem] = useState<File | null>(null);
//   const [previewImagem, setPreviewImagem] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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

//     if (!utilizador) {
//       setHeaderMessage("Utilizador não encontrado");
//       toast.error("Utilizador não encontrado");
//       return;
//     }

//     setIsSubmitting(true);

//     const updatedData: Partial<Omit<User, "id">> & { senha?: string; novaSenha?: string } = {};
//     if (email !== utilizador.email) updatedData.email = email;
//     if (telefone !== utilizador.telefone) updatedData.telefone = telefone;
//     if (novaSenha) {
//       if (!senha) {
//         setHeaderMessage("Por favor, insira a senha atual");
//         toast.error("Por favor, insira a senha atual");
//         setIsSubmitting(false);
//         return;
//       }
//       updatedData.senha = senha; // Senha atual
//       updatedData.novaSenha = novaSenha; // Nova senha
//     }

//     if (imagem) {
//       const formData = new FormData();
//       formData.append("file", imagem);
//       const uploadResponse = await fetch("/api/utilizador/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const uploadData = await uploadResponse.json();
//       if (uploadResponse.ok) {
//         updatedData.picture = uploadData.url;
//       } else {
//         setHeaderMessage("Erro ao fazer upload da imagem");
//         toast.error("Erro ao fazer upload da imagem");
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     try {
//       await delay(3000); // Atraso de 3 segundos

//       const response = await fetch(`/api/utilizador/update/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUtilizador(data.utilizador);
//         setSenha("");
//         setNovaSenha("");
//         setHeaderMessage("Perfil atualizado com sucesso!");
//         toast.success("Perfil atualizado com sucesso!");
//       } else {
//         setHeaderMessage(data.error || "Erro ao atualizar perfil");
//         toast.error(data.error || "Erro ao atualizar perfil");
//       }
//     } catch (err) {
//       setHeaderMessage("Erro ao conectar com o servidor");
//       toast.error("Erro ao conectar com o servidor");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 max-w-2xl text-center">
//         <p>Carregando...</p>
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
//                 <Label htmlFor="senha">Senha Atual</Label>
//                 <Input
//                   id="senha"
//                   type="password"
//                   value={senha}
//                   onChange={(e) => setSenha(e.target.value)}
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

// export default PerfilPage;










export default function UsersPage({ params }: { params: { id: string } }) {

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/utilizador" },
        { label: "Utilizadores" }
      ]}
    >
       <PerfilPage params={params}/> 
       </PageWithBreadcrumb>
  );


}