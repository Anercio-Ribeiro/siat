"use client"
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";

import ProximidadePage from '../../../components/proximidade-component/ProximidadePage';


export default function CategoriesPage() {
  return (
    <PageWithBreadcrumb
      title="Categories"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Categories" }
      ]}
    >
      <ProximidadePage />
    </PageWithBreadcrumb>
  );
}
