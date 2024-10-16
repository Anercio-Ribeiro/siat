


"use client"

import { useEffect, useState } from 'react';
import { PageWithBreadcrumb } from '../../../components/PageWithBreadcrumb';
import { HouseCard } from '@/components/house-components/house-card';
import { Card, CardContent } from '@/components/ui/card';
import { ImovelLDto } from '@/app/model/type';

export default function DashboardPage() {
  const [imoveis, setImoveis] = useState<ImovelLDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch('/api/imoveis/getAll');
        if (!response.ok) {
          throw new Error('Erro ao buscar imóveis');
        }
        const data = await response.json();
        setImoveis(data.imoveis); // Verifique se `data.imoveis` tem a estrutura correta
      } catch (err) {
        console.log(err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido'); // Atualize o estado de erro
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  if (loading) return <div>Carregando...</div>;
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
  {imoveis.map(imovel => (
    <div key={imovel.id} className="min-w-[300px] w-full">
      <HouseCard imovel={imovel} />
    </div>
  ))}
</div>





    
    </PageWithBreadcrumb>
  );
}
