"use client";

import { Favorite } from "@/app/model/type";
import { HouseCard } from "@/components/house-components/house-card";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/hooks/useFavoritos";
import { TipoAluguel } from "@prisma/client";

export default function FavoritesList() {
  const { favorites, loading, isAuthenticated } = useFavorites();

  if (loading) {
    return (
      <PageWithBreadcrumb
        title="Lista de favoritos"
        breadcrumbItems={[
          { label: "Lista de favoritos", href: "/" },
          { label: "Lista de favoritos", href: "/dashboard" },
          { label: "Imóvel" },
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-96 w-full rounded-md" />
          ))}
        </div>
      </PageWithBreadcrumb>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageWithBreadcrumb
        title="Lista de favoritos"
        breadcrumbItems={[
          { label: "Lista de favoritos", href: "/" },
          { label: "Lista de favoritos", href: "/dashboard" },
          { label: "Imóvel" },
        ]}
      >
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Acesso Restrito</h3>
          <p className="text-muted-foreground">
            Por favor, faça login como INQUILINO para visualizar seus favoritos.
          </p>
        </Card>
      </PageWithBreadcrumb>
    );
  }

  if (favorites.length === 0) {
    return (
      <PageWithBreadcrumb
        title="Lista de favoritos"
        breadcrumbItems={[
          { label: "Lista de favoritos", href: "/" },
          { label: "Lista de favoritos", href: "/dashboard" },
          { label: "Imóvel" },
        ]}
      >
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Nenhum Favorito Encontrado</h3>
          <p className="text-muted-foreground">
            Você ainda não adicionou nenhum imóvel à sua lista de favoritos.
          </p>
        </Card>
      </PageWithBreadcrumb>
    );
  }

  return (
    <PageWithBreadcrumb
      title="Lista de favoritos"
      breadcrumbItems={[
        { label: "Lista de favoritos", href: "/" },
        { label: "Lista de favoritos", href: "/dashboard" },
        { label: "Imóvel" },
      ]}
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Meus Favoritos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite: Favorite) => {
            //TODO: Remover logs em produção
            // console.log("Favorite data:", favorite.imovel);
            return <HouseCard key={favorite?.id} imovel={favorite.imovel} />;

            
          })}
        </div>
      </div>
    </PageWithBreadcrumb>
  );
}

