import PlaceholderContent from "@/components/content/placeholder-content";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";

export default function UsersPage() {

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/users" },
        { label: "Users" }
      ]}
    >
       <p>Welcome to the Users!</p>
       </PageWithBreadcrumb>
  );


}
