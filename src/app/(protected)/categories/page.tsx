import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";


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
       <p>Welcome to the Categories!</p>
       </PageWithBreadcrumb>
  );
}
