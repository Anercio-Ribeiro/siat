"use client";

import { useEffect, useState } from "react";
import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { HouseCard } from "@/components/house-components/house-card";
import { ImovelLDto } from "@/app/model/type";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [imoveis, setImoveis] = useState<ImovelLDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch("/api/imoveis/getAll");
        if (!response.ok) {
          throw new Error("Erro ao buscar imóveis");
        }
        const data = await response.json();
        setImoveis(data.imoveis); // Verifique se `data.imoveis` tem a estrutura correta
      } catch (err) {
        console.log(err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  if (error) return <div>Erro: {error}</div>;

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard" },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="min-w-[300px] w-full">
                {/* Skeleton for card */}
                <Skeleton className="h-52 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))
          : imoveis.map((imovel) => (
              <div key={imovel.id} className="min-w-[300px] w-full">
                <HouseCard imovel={imovel} />
              </div>
            ))}
      </div>
    </PageWithBreadcrumb>
  );
}
