import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";


export default function AccountPage() {
  return (
    <PageWithBreadcrumb
      title="Account"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Account" }
      ]}
    >
       <p>Welcome to the Account!</p>
       </PageWithBreadcrumb>
  );
}
