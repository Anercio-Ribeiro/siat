import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}



// import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import { getAuthenticatedUser } from "@/utils/getAuthenticatedUser";

// interface ProtectedLayoutProps {
//   children: ReactNode;
// }

// export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
//   try {
//     // Tenta obter o usuário autenticado
//     const user = await getAuthenticatedUser();

//     // Se o usuário estiver autenticado, renderiza o conteúdo protegido
//     if (user) {
//       return <>{children}</>;
//     }
//   } catch (error) {
//     // Redireciona para a página pública se a autenticação falhar
//     redirect("/");
//   }

//   return null; // Garante que nada será renderizado se a verificação falhar
// }
