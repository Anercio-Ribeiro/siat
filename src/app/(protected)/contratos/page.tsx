import ContratosTable from "@/components/contratos/contratoTable";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";


export default function ContratosPage() {
  return (
        <PageWithBreadcrumb
          title="Imóvel"
          breadcrumbItems={[
            { label: "Início", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Contratos" },
            
          ]}
        >
    
      <ContratosTable />
    
    </PageWithBreadcrumb>
  );
}

