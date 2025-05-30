import { PrismaClient, TipoAluguel } from "@prisma/client";

const prisma = new PrismaClient();

export const estatisticasRepository = {
  async getPrecoPorZona(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      status: "concluído",
      contrato: { isNot: null },
      checkIn: year
        ? {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          }
        : undefined,
      tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
      ...(month && month !== "all"
        ? {
            checkIn: {
              gte: new Date(`${year}-${months.indexOf(month) + 1}-01`),
              lte: new Date(`${year}-${months.indexOf(month) + 1}-31`),
            },
          }
        : {}),
    };

    const alugueis = await prisma.aluguel.findMany({
      where: whereClause,
      select: {
        contrato: { select: { valorTotal: true } },
        imovel: { select: { bairro: true, provincia: true } },
      },
    });

    const precoPorZona = alugueis.reduce(
      (acc, aluguel) => {
        const { bairro, provincia } = aluguel.imovel;
        const key = `${bairro}-${provincia}`;
        if (!acc[key]) {
          acc[key] = { bairro, provincia, total: 0, count: 0 };
        }
        acc[key].total += aluguel.contrato?.valorTotal || 0;
        acc[key].count += 1;
        return acc;
      },
      {} as Record<string, { bairro: string; provincia: string; total: number; count: number }>
    );

    return Object.values(precoPorZona)
      .map((item) => ({
        bairro: item.bairro,
        provincia: item.provincia,
        precoMedio: item.count > 0 ? item.total / item.count : 0,
      }))
      .sort((a, b) => a.precoMedio - b.precoMedio);
  },

  async getProximidades(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = year || tipoAluguel || month
      ? {
          imovel: {
            is: {
              alugueis: {
                some: {
                  ...(year
                    ? { checkIn: { gte: new Date(`${year}-01-01`), lte: new Date(`${year}-12-31`) } }
                    : {}),
                  ...(tipoAluguel ? { tipoAluguel: tipoAluguel as TipoAluguel } : {}),
                  status: "concluído",
                  contrato: { isNot: null },
                  ...(month && month !== "all"
                    ? {
                        checkIn: {
                          gte: new Date(`${year}-${months.indexOf(month) + 1}-01`),
                          lte: new Date(`${year}-${months.indexOf(month) + 1}-31`),
                        },
                      }
                    : {}),
                },
              },
            },
          },
        }
      : {};
    return prisma.proximidadeImovel.groupBy({
      by: ["proximidadeId"],
      _count: { proximidadeId: true },
      where: whereClause,
    }).then(async (results) => {
      return Promise.all(
        results.map(async (result) => {
          const proximidade = await prisma.proximidade.findUnique({
            where: { id: result.proximidadeId },
            select: { tipo: true },
          });
          return { tipo: proximidade?.tipo, count: result._count.proximidadeId };
        })
      );
    });
  },

  async getPrecoPorMes(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      checkIn: year
        ? {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          }
        : undefined,
      tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
      status: "concluído",
      contrato: { isNot: null },
      ...(month && month !== "all"
        ? {
            checkIn: {
              gte: new Date(`${year}-${months.indexOf(month) + 1}-01`),
              lte: new Date(`${year}-${months.indexOf(month) + 1}-31`),
            },
          }
        : {}),
    };
    const alugueis = await prisma.aluguel.findMany({
      where: whereClause,
      select: {
        checkIn: true,
        contrato: { select: { valorTotal: true } },
      },
    });
    const precoPorMes = alugueis.reduce(
      (acc, aluguel) => {
        const mes = aluguel.checkIn.toISOString().slice(0, 7);
        if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
        acc[mes].total += aluguel.contrato?.valorTotal || 0;
        acc[mes].count += 1;
        return acc;
      },
      {} as Record<string, { total: number; count: number }>
    );
    return Object.entries(precoPorMes).map(([mes, { total, count }]) => ({
      mes,
      precoMedio: count > 0 ? total / count : 0,
    }));
  },

  async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string, month?: string) {
    const whereClause: any = {
      status: "concluído",
      contrato: { isNot: null },
      checkIn: year
        ? {
            gte: new Date(`${year}-01-01`),
            lte: new Date(`${year}-12-31`),
          }
        : undefined,
      tipoAluguel: tipoAluguel || undefined,
      ...(month && month !== "all"
        ? {
            checkIn: {
              gte: new Date(`${year}-${months.indexOf(month) + 1}-01`),
              lte: new Date(`${year}-${months.indexOf(month) + 1}-31`),
            },
          }
        : {}),
      imovel: {
        ...(provincia && provincia !== "all" ? { provincia } : {}),
        ...(bairro && bairro !== "all" ? { bairro } : {}),
      },
    };

    const alugueis = await prisma.aluguel.findMany({
      select: {
        checkIn: true,
        contrato: { select: { valorTotal: true } },
        imovel: { select: { provincia: true, bairro: true } },
      },
      where: whereClause,
    });

    const precoPorZonaMes = alugueis.reduce(
      (acc, aluguel) => {
        const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
        const zona = `${aluguel.imovel.bairro}, ${aluguel.imovel.provincia}`;
        const key = `${zona}-${mes}`;
        if (!acc[key]) acc[key] = { zona, mes, total: 0, count: 0 };
        acc[key].total += aluguel.contrato?.valorTotal || 0;
        acc[key].count += 1;
        return acc;
      },
      {} as Record<string, { zona: string; mes: string; total: number; count: number }>
    );

    return Object.values(precoPorZonaMes).map((item) => ({
      zona: item.zona,
      mes: item.mes,
      preco: item.count > 0 ? item.total / item.count : 0,
      provincia: item.zona.split(", ")[1],
      bairro: item.zona.split(", ")[0],
    }));
  },

  async getTotalImoveis(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      ...(tipoAluguel
        ? {
            alugueis: {
              some: {
                tipoAluguel: tipoAluguel as TipoAluguel,
                status: "concluído",
                contrato: { isNot: null },
                ...(year
                  ? { checkIn: { gte: new Date(`${year}-01-01`), lte: new Date(`${year}-12-31`) } }
                  : {}),
                ...(month && month !== "all"
                  ? {
                      checkIn: {
                        gte: new Date(`${year}-${months.indexOf(month) + 1}-01`),
                        lte: new Date(`${year}-${months.indexOf(month) + 1}-31`),
                      },
                    }
                  : {}),
              },
            },
          }
        : {}),
    };
    const total = await prisma.imovel.count({ where: whereClause });
    return { total };
  },

  async getTotalAlugados(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      status: "concluído",
      tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
      contrato: { isNot: null },
      ...(year && month && month !== "all"
        ? {
            OR: [
              { checkIn: { lte: new Date(`${year}-${months.indexOf(month) + 1}-31`) } },
              { checkOut: { gte: new Date(`${year}-${months.indexOf(month) + 1}-01`) } },
            ],
          }
        : year
        ? {
            OR: [
              { checkIn: { lte: new Date(`${year}-12-31`) } },
              { checkOut: { gte: new Date(`${year}-01-01`) } },
            ],
          }
        : {}),
    };
    const total = await prisma.aluguel.count({ where: whereClause });
    return { total };
  },

  async getZonasMaisAlugadas(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      status: "concluído",
      tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
      contrato: { isNot: null },
      ...(year && month && month !== "all"
        ? {
            OR: [
              { checkIn: { lte: new Date(`${year}-${months.indexOf(month) + 1}-31`) } },
              { checkOut: { gte: new Date(`${year}-${months.indexOf(month) + 1}-01`) } },
            ],
          }
        : year
        ? {
            OR: [
              { checkIn: { lte: new Date(`${year}-12-31`) } },
              { checkOut: { gte: new Date(`${year}-01-01`) } },
            ],
          }
        : {}),
    };
    const alugueis = await prisma.aluguel.findMany({
      where: whereClause,
      select: {
        checkIn: true,
        imovel: { select: { provincia: true, bairro: true } },
      },
    });
    const zonasCount = alugueis.reduce(
      (acc, aluguel) => {
        const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
        const key = `${aluguel.imovel.provincia}-${aluguel.imovel.bairro}-${mes}`;
        if (!acc[key]) acc[key] = { provincia: aluguel.imovel.provincia, bairro: aluguel.imovel.bairro, count: 0, mes };
        acc[key].count += 1;
        return acc;
      },
      {} as Record<string, { provincia: string; bairro: string; count: number; mes: string }>
    );
    return Object.values(zonasCount);
  },
};

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];