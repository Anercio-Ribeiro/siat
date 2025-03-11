
import { format } from "date-fns";
import { estatisticasRepository } from "../repositories/dashboardRepository";
import { prisma } from "@/lib/prisma";

export const estatisticasService = {
  async getPrecoPorZona() {
    const data = await estatisticasRepository.getPrecoPorZona();
    return data.map((item) => ({
      zona: `${item.bairro}, ${item.provincia}`,
      precoMedio: item._avg.precoMensal,
    }));
  },

  async getProximidadesMaisProcuradas() {
    const data = await estatisticasRepository.getProximidadesMaisProcuradas();
    return Promise.all(
      data.map(async (item) => {
        const proximidade = await prisma.proximidade.findUnique({
          where: { id: item.proximidadeId },
        });
        return {
          nome: proximidade?.nome,
          tipo: proximidade?.tipo,
          count: item._count.imovelId,
        };
      })
    );
  },

  async getPrecoPorMes() {
    const data = await estatisticasRepository.getPrecoPorMes();
    return data.map((item) => ({
      mes: format(new Date(item.mes), "MMM yyyy"),
      precoMedio: item.precoMedio,
    }));
  },
};