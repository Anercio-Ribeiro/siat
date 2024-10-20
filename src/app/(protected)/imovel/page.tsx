import RegistrarImovelForm from "@/components/house-components/create-imovel";
import { HouseCard } from "@/components/house-components/house-card";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";

export default function ImovelPage() {

  return (
    <PageWithBreadcrumb
      title="Imóvel"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Imóvel" },
        
      ]}
    >
      <RegistrarImovelForm/>
    </PageWithBreadcrumb>
  );
}

