import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const estatisticasRepository = {
  async getPrecoPorZona() {
    return prisma.imovel.groupBy({
      by: ["bairro", "provincia"],
      _avg: { precoMensal: true },
      orderBy: { _avg: { precoMensal: "asc" } },
    });
  },

  async getProximidadesMaisProcuradas() {
    return prisma.proximidadeImovel.groupBy({
      by: ["proximidadeId"],
      _count: { imovelId: true },
      orderBy: { _count: { imovelId: "desc" } },
      take: 5,
    });
  },

  async getPrecoPorMes() {
    const alugueis = await prisma.aluguel.findMany({
      select: {
        checkIn: true,
        imovel: {
          select: {
            precoMensal: true,
          },
        },
      },
      where: {
        imovel: {
          precoMensal: { not: null }, // Garante que só pegamos imóveis com preço
        },
      },
    });

    const precoPorMes = alugueis.reduce((acc, aluguel) => {
      const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7); // YYYY-MM
      if (!acc[mes]) {
        acc[mes] = { total: 0, count: 0 };
      }
      acc[mes].total += aluguel.imovel.precoMensal || 0;
      acc[mes].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(precoPorMes)
      .map(([mes, { total, count }]) => ({
        mes,
        precoMedio: total / count,
      }))
      .sort((a, b) => a.mes.localeCompare(b.mes));
  },
};