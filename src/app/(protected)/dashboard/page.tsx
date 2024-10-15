import { ChartContainer } from '@/components/ui/chart';
import dynamic from 'next/dynamic';
import { PageWithBreadcrumb } from '../../../components/PageWithBreadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { PolarAngleAxis, RadialBar } from 'recharts';
import { HouseCard } from '@/components/house-components/house-card';


// Carrega o gráfico de forma dinâmica para evitar problemas de SSR
const RadialBarChartNoSSR = dynamic(() => import("recharts").then(mod => mod.RadialBarChart), { ssr: false });

export default function DashboardPage() {
  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard" },
      ]}
    >
      <HouseCard/>
    </PageWithBreadcrumb>
  );
}
