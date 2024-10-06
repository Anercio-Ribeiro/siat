import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";


export default function TagsPage() {
  return (
    <PageWithBreadcrumb
      title="Tags"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Tags" }
      ]}
    >
       <p>Welcome to the Tags!</p>
       </PageWithBreadcrumb>
  );
}
