// "use client";

import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
import PerfilPage from "@/components/utilizador-component/perfil-component";

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