import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";

export default function DashboardPage() {

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard" },
      ]}
    >
      {/* Conteúdo do dashboard será renderizado aqui */}
      <p>Welcome to the dashboard!</p>
    </PageWithBreadcrumb>
  );
}

