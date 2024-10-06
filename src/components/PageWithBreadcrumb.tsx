import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent from "@/components/content/placeholder-content";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface PageWithBreadcrumbProps {
  title: string;
  breadcrumbItems: { label: string; href?: string }[];
  children?: React.ReactNode; // Adicionando a prop children para conteúdo dinâmico
}

export function PageWithBreadcrumb({
  title,
  breadcrumbItems,
  children // Recebendo conteúdo adicional
}: PageWithBreadcrumbProps) {
  return (
    <ContentLayout title={title}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href ? (
                <>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                  {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                </>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>{children}</PlaceholderContent> {/* Renderiza o conteúdo dentro de PlaceholderContent */}
    </ContentLayout>
  );
}
