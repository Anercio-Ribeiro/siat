
// import { PrismaClient, TipoAluguel } from "@prisma/client";

// const prisma = new PrismaClient();

// export const estatisticasRepository = {
//   async getPrecoPorZona(year?: string, tipoAluguel?: string) {
//     const whereClause = {
//       alugueis: {
//         some: {
//           checkIn: year
//             ? {
//                 gte: new Date(`${year}-01-01`),
//                 lte: new Date(`${year}-12-31`),
//               }
//             : undefined,
//           tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
//         },
//       },
//       preco: { not: null },
//     };
//     return prisma.imovel.groupBy({
//       by: ["bairro", "provincia"],
//       _avg: { preco: true }, // Ajuste para o campo correto
//       where: whereClause,
//       orderBy: { _avg: { preco: "asc" } },
//     });
//   },

//   async getProximidades(year?: string, tipoAluguel?: string) {
//     const whereClause = year || tipoAluguel ? {
//       imovel: {
//         is: {
//           alugueis: {
//             some: {
//               ...(year ? {
//                 checkIn: {
//                   gte: new Date(`${year}-01-01`),
//                   lte: new Date(`${year}-12-31`),
//                 }
//               } : {}),
//               ...(tipoAluguel ? { tipoAluguel: tipoAluguel as TipoAluguel } : {})
//             }
//           }
//         }
//       }
//     } : {};
//     return prisma.proximidadeImovel.groupBy({
//       by: ["proximidadeId"],
//       _count: { proximidadeId: true },
//       where: whereClause,
//     }).then(async (results) => {
//       return Promise.all(
//         results.map(async (result) => {
//           const proximidade = await prisma.proximidade.findUnique({
//             where: { id: result.proximidadeId },
//             select: { tipo: true },
//           });
//           return { tipo: proximidade?.tipo, count: result._count.proximidadeId };
//         })
//       );
//     });
//   },

//   async getPrecoPorMes(year?: string, tipoAluguel?: string) {
//     const alugueis = await prisma.aluguel.findMany({
//       where: {
//         checkIn: year
//           ? {
//               gte: new Date(`${year}-01-01`),
//               lte: new Date(`${year}-12-31`),
//             }
//           : undefined,
//         tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
//       },
//       select: {
//         checkIn: true,
//         imovel: { select: { preco: true } }, // Ajuste para o campo correto
//       },
//     });
//     const precoPorMes = alugueis.reduce((acc, aluguel) => {
//       const mes = aluguel.checkIn.toISOString().slice(0, 7);
//       if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
//       acc[mes].total += aluguel.imovel.preco || 0; // Ajuste para o campo correto
//       acc[mes].count += 1;
//       return acc;
//     }, {} as Record<string, { total: number; count: number }>);
//     return Object.entries(precoPorMes).map(([mes, { total, count }]) => ({
//       mes,
//       precoMedio: total / count,
//     }));
//   },

//   async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string) {
//     const whereClause: any = {
//       imovel: {
//         preco: { not: null }, // Ajuste para o campo correto
//         alugueis: {
//           some: {
//             checkIn: year
//               ? {
//                   gte: new Date(`${year}-01-01`),
//                   lte: new Date(`${year}-12-31`),
//                 }
//               : undefined,
//             tipoAluguel: tipoAluguel || undefined,
//           },
//         },
//       },
//     };
//     if (provincia && provincia !== "all") whereClause.imovel.provincia = provincia;
//     if (bairro && bairro !== "all") whereClause.imovel.bairro = bairro;

//     const alugueis = await prisma.aluguel.findMany({
//       select: {
//         checkIn: true,
//         imovel: {
//           select: {
//             preco: true, // Ajuste para o campo correto
//             provincia: true,
//             bairro: true,
//           },
//         },
//       },
//       where: whereClause,
//     });

//     const precoPorZonaMes = alugueis.reduce((acc, aluguel) => {
//       const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
//       const zona = `${aluguel.imovel.bairro}, ${aluguel.imovel.provincia}`;
//       const key = `${zona}-${mes}`;
//       if (!acc[key]) {
//         acc[key] = { zona, mes, total: 0, count: 0 };
//       }
//       acc[key].total += aluguel.imovel.preco || 0; // Ajuste para o campo correto
//       acc[key].count += 1;
//       return acc;
//     }, {} as Record<string, { zona: string; mes: string; total: number; count: number }>);

//     return Object.values(precoPorZonaMes).map((item) => ({
//       zona: item.zona,
//       mes: item.mes,
//       preco: item.total / item.count, // Retorna como 'preco'
//       provincia: item.zona.split(", ")[1],
//       bairro: item.zona.split(", ")[0],
//     }));
//   },
// };






import { PrismaClient, TipoAluguel } from "@prisma/client";

const prisma = new PrismaClient();

export const estatisticasRepository = {
  async getPrecoPorZona(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      alugueis: {
        some: {
          checkIn: year
            ? {
                gte: new Date(`${year}-01-01`),
                lte: new Date(`${year}-12-31`),
              }
            : undefined,
          tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
          ...(month && month !== "all" ? { checkIn: { gte: new Date(`${year}-${months.indexOf(month) + 1}-01`), lte: new Date(`${year}-${months.indexOf(month) + 1}-31`) } } : {}),
        },
      },
      preco: { not: null },
    };
    return prisma.imovel.groupBy({
      by: ["bairro", "provincia"],
      _avg: { preco: true },
      where: whereClause,
      orderBy: { _avg: { preco: "asc" } },
    });
  },

  async getProximidades(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = year || tipoAluguel || month
      ? {
          imovel: {
            is: {
              alugueis: {
                some: {
                  ...(year ? { checkIn: { gte: new Date(`${year}-01-01`), lte: new Date(`${year}-12-31`) } } : {}),
                  ...(tipoAluguel ? { tipoAluguel: tipoAluguel as TipoAluguel } : {}),
                  ...(month && month !== "all" ? { checkIn: { gte: new Date(`${year}-${months.indexOf(month) + 1}-01`), lte: new Date(`${year}-${months.indexOf(month) + 1}-31`) } } : {}),
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
      ...(month && month !== "all" ? { checkIn: { gte: new Date(`${year}-${months.indexOf(month) + 1}-01`), lte: new Date(`${year}-${months.indexOf(month) + 1}-31`) } } : {}),
    };
    const alugueis = await prisma.aluguel.findMany({
      where: whereClause,
      select: {
        checkIn: true,
        imovel: { select: { preco: true } },
      },
    });
    const precoPorMes = alugueis.reduce((acc, aluguel) => {
      const mes = aluguel.checkIn.toISOString().slice(0, 7);
      if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
      acc[mes].total += aluguel.imovel.preco || 0;
      acc[mes].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);
    return Object.entries(precoPorMes).map(([mes, { total, count }]) => ({
      mes,
      precoMedio: total / count,
    }));
  },

  async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string, month?: string) {
    const whereClause: any = {
      imovel: {
        preco: { not: null },
        alugueis: {
          some: {
            checkIn: year
              ? {
                  gte: new Date(`${year}-01-01`),
                  lte: new Date(`${year}-12-31`),
                }
              : undefined,
            tipoAluguel: tipoAluguel || undefined,
            ...(month && month !== "all" ? { checkIn: { gte: new Date(`${year}-${months.indexOf(month) + 1}-01`), lte: new Date(`${year}-${months.indexOf(month) + 1}-31`) } } : {}),
          },
        },
      },
    };
    if (provincia && provincia !== "all") whereClause.imovel.provincia = provincia;
    if (bairro && bairro !== "all") whereClause.imovel.bairro = bairro;

    const alugueis = await prisma.aluguel.findMany({
      select: {
        checkIn: true,
        imovel: { select: { preco: true, provincia: true, bairro: true } },
      },
      where: whereClause,
    });

    const precoPorZonaMes = alugueis.reduce((acc, aluguel) => {
      const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
      const zona = `${aluguel.imovel.bairro}, ${aluguel.imovel.provincia}`;
      const key = `${zona}-${mes}`;
      if (!acc[key]) acc[key] = { zona, mes, total: 0, count: 0 };
      acc[key].total += aluguel.imovel.preco || 0;
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { zona: string; mes: string; total: number; count: number }>);

    return Object.values(precoPorZonaMes).map((item) => ({
      zona: item.zona,
      mes: item.mes,
      preco: item.total / item.count,
      provincia: item.zona.split(", ")[1],
      bairro: item.zona.split(", ")[0],
    }));
  },

  async getTotalImoveis(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      ...(tipoAluguel ? { alugueis: { some: { tipoAluguel: tipoAluguel as TipoAluguel } } } : {}),
    };
    const total = await prisma.imovel.count({ where: whereClause });
    return { total };
  },

  async getTotalAlugados(year?: string, tipoAluguel?: string, month?: string) {
    const whereClause = {
      status: "pendente",
      tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
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
      status: { in: ["PENDENTE", ""] },
      tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
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
    const zonasCount = alugueis.reduce((acc, aluguel) => {
      const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
      const key = `${aluguel.imovel.provincia}-${aluguel.imovel.bairro}-${mes}`;
      if (!acc[key]) acc[key] = { provincia: aluguel.imovel.provincia, bairro: aluguel.imovel.bairro, count: 0, mes };
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { provincia: string; bairro: string; count: number; mes: string }>);
    return Object.values(zonasCount);
  },
};

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];