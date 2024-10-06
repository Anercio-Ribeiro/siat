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
      {/* Conteúdo do dashboard será renderizado aqui */}
      <p>Welcome to the Imovel!</p>
    </PageWithBreadcrumb>
  );
}

