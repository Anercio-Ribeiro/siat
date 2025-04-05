// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // export const estatisticasRepository = {
// //   async getPrecoPorZona() {
// //     return prisma.imovel.groupBy({
// //       by: ["bairro", "provincia"],
// //       _avg: { precoMensal: true },
// //       orderBy: { _avg: { precoMensal: "asc" } },
// //     });
// //   },

// //   async getProximidadesMaisProcuradas() {
// //     return prisma.proximidadeImovel.groupBy({
// //       by: ["proximidadeId"],
// //       _count: { imovelId: true },
// //       orderBy: { _count: { imovelId: "desc" } },
// //       take: 5,
// //     });
// //   },

// //   async getPrecoPorMes() {
// //     const alugueis = await prisma.aluguel.findMany({
// //       select: {
// //         checkIn: true,
// //         imovel: {
// //           select: {
// //             precoMensal: true,
// //           },
// //         },
// //       },
// //       where: {
// //         imovel: {
// //           precoMensal: { not: null }, // Garante que só pegamos imóveis com preço
// //         },
// //       },
// //     });

// //     const precoPorMes = alugueis.reduce((acc, aluguel) => {
// //       const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7); // YYYY-MM
// //       if (!acc[mes]) {
// //         acc[mes] = { total: 0, count: 0 };
// //       }
// //       acc[mes].total += aluguel.imovel.precoMensal || 0;
// //       acc[mes].count += 1;
// //       return acc;
// //     }, {} as Record<string, { total: number; count: number }>);

// //     return Object.entries(precoPorMes)
// //       .map(([mes, { total, count }]) => ({
// //         mes,
// //         precoMedio: total / count,
// //       }))
// //       .sort((a, b) => a.mes.localeCompare(b.mes));
// //   },



// //   async getPrecoMensalPorZona(provincia?: string, bairro?: string) {
// //     const whereClause: any = {
// //       precoMensal: { not: null },
// //     };
// //     if (provincia && provincia !== "all") whereClause.provincia = provincia;
// //     if (bairro && bairro !== "all") whereClause.bairro = bairro;

// //     return prisma.imovel.groupBy({
// //       by: ["bairro", "provincia"],
// //       _avg: { precoMensal: true },
// //       where: whereClause,
// //       orderBy: { _avg: { precoMensal: "asc" } },
// //     });
// //   },
// // };














// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const estatisticasRepository = {
//   async getPrecoPorZona(year?: string) {
//     const whereClause = year ? {
//       alugueis: {
//         some: {
//           checkIn: {
//             gte: new Date(`${year}-01-01`),
//             lte: new Date(`${year}-12-31`),
//           },
//         },
//       },
//     } : {};
//     return prisma.imovel.groupBy({
//       by: ["bairro", "provincia"],
//       _avg: { precoMensal: true },
//       where: whereClause,
//       orderBy: { _avg: { precoMensal: "asc" } },
//     });
//   },

//   async getProximidadesMaisProcuradas(year?: string) {
//     const whereClause = year ? {
//       imovel: {
//         alugueis: {
//           some: {
//             checkIn: {
//               gte: new Date(`${year}-01-01`),
//               lte: new Date(`${year}-12-31`),
//             },
//           },
//         },
//       },
//     } : {};
//     return prisma.proximidadeImovel.groupBy({
//       by: ["proximidadeId"],
//       _count: { imovelId: true },
//       where: whereClause,
//       orderBy: { _count: { imovelId: "desc" } },
//       take: 5,
//     });
//   },

//   async getPrecoPorMes(year?: string) {
//     const whereClause = year ? {
//       checkIn: {
//         gte: new Date(`${year}-01-01`),
//         lte: new Date(`${year}-12-31`),
//       },
//       imovel: { precoMensal: { not: null } },
//     } : { imovel: { precoMensal: { not: null } } };

//     const alugueis = await prisma.aluguel.findMany({
//       select: {
//         checkIn: true,
//         imovel: { select: { precoMensal: true } },
//       },
//       where: whereClause,
//     });

//     const precoPorMes = alugueis.reduce((acc, aluguel) => {
//       const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
//       if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
//       acc[mes].total += aluguel.imovel.precoMensal || 0;
//       acc[mes].count += 1;
//       return acc;
//     }, {} as Record<string, { total: number; count: number }>);

//     return Object.entries(precoPorMes)
//       .map(([mes, { total, count }]) => ({
//         mes,
//         precoMedio: total / count,
//       }))
//       .sort((a, b) => a.mes.localeCompare(b.mes));
//   },

//   async getPrecoMensalPorZona(provincia?: string, bairro?: string, year?: string) {
//     const whereClause: any = {
//       precoMensal: { not: null },
//     };
//     if (provincia && provincia !== "all") whereClause.provincia = provincia;
//     if (bairro && bairro !== "all") whereClause.bairro = bairro;
//     if (year) {
//       whereClause.alugueis = {
//         some: {
//           checkIn: {
//             gte: new Date(`${year}-01-01`),
//             lte: new Date(`${year}-12-31`),
//           },
//         },
//       };
//     }


//   // async getPrecoMensalPorZona(provincia?: string, bairro?: string, year?: string) {
//   //   const whereClause: any = {
//   //     precoMensal: { not: null },
//   //     alugueis: {
//   //       some: {
//   //         checkIn: year ? {
//   //           gte: new Date(`${year}-01-01`),
//   //           lte: new Date(`${year}-12-31`),
//   //         } : undefined,
//   //       },
//   //     },
//   //   };
//   //   if (provincia && provincia !== "all") whereClause.provincia = provincia;
//   //   if (bairro && bairro !== "all") whereClause.bairro = bairro;

//   //   const alugueis = await prisma.aluguel.findMany({
//   //     select: {
//   //       checkIn: true,
//   //       imovel: {
//   //         select: {
//   //           precoMensal: true,
//   //           provincia: true,
//   //           bairro: true,
//   //         },
//   //       },
//   //     },
//   //     where: whereClause,
//   //   });

//   //   const precoPorZonaMes = alugueis.reduce((acc, aluguel) => {
//   //     const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7); // YYYY-MM
//   //     const zona = `${aluguel.imovel.bairro}, ${aluguel.imovel.provincia}`;
//   //     const key = `${zona}-${mes}`;
//   //     if (!acc[key]) {
//   //       acc[key] = { zona, mes, total: 0, count: 0 };
//   //     }
//   //     acc[key].total += aluguel.imovel.precoMensal || 0;
//   //     acc[key].count += 1;
//   //     return acc;
//   //   }, {} as Record<string, { zona: string; mes: string; total: number; count: number }>);

//   //   return Object.values(precoPorZonaMes).map((item) => ({
//   //     zona: item.zona,
//   //     mes: item.mes,
//   //     precoMensal: item.total / item.count,
//   //     provincia: item.zona.split(", ")[1],
//   //     bairro: item.zona.split(", ")[0],
//   //     //avg: { precoMensal: true },
//   //   }));
//   // }



//     return prisma.imovel.groupBy({
//       by: ["bairro", "provincia"],
//       _avg: { precoMensal: true },
//       where: whereClause,
//       orderBy: { _avg: { precoMensal: "asc" } },
//     });
//   },
// };










// import { prisma } from "@/lib/prisma";
// import { PrismaClient, TipoAluguel } from "@prisma/client";


// export const estatisticasRepository = {
//   async getPrecoPorZona(year?: string, tipoAluguel?: string) {
//     const whereClause = {
//       alugueis: {
//         some: {
//           checkIn: year ? {
//             gte: new Date(`${year}-01-01`),
//             lte: new Date(`${year}-12-31`),
//           } : undefined,
//           tipoAluguel: tipoAluguel as TipoAluguel | undefined,
//         },
//       },
//     };
//     return prisma.imovel.groupBy({
//       by: ["bairro", "provincia"],
//       _avg: { precoMensal: true },
//       where: whereClause,
//       orderBy: { _avg: { precoMensal: "asc" } },
//     });
//   },

//   async getProximidades(year?: string, tipoAluguel?: string) {
//     const whereClause = year || tipoAluguel ? {
//       AND: [{
//         imovel: {
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
//       }]
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
//         checkIn: year ? {
//           gte: new Date(`${year}-01-01`),
//           lte: new Date(`${year}-12-31`),
//         } : undefined,
//         tipoAluguel: tipoAluguel as TipoAluguel | undefined,
//       },
//       select: {
//         checkIn: true,
//         imovel: { select: { precoMensal: true } },
//       },
//     });
//     const precoPorMes = alugueis.reduce((acc, aluguel) => {
//       const mes = aluguel.checkIn.toISOString().slice(0, 7);
//       if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
//       acc[mes].total += aluguel.imovel.precoMensal || 0;
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
//       precoMensal: { not: null },
//       alugueis: {
//         some: {
//           checkIn: year ? {
//             gte: new Date(`${year}-01-01`),
//             lte: new Date(`${year}-12-31`),
//           } : undefined,
//           tipoAluguel: tipoAluguel || undefined,
//         },
//       },
//     };
//     if (provincia && provincia !== "all") whereClause.provincia = provincia;
//     if (bairro && bairro !== "all") whereClause.bairro = bairro;

//     const alugueis = await prisma.aluguel.findMany({
//       select: {
//         checkIn: true,
//         imovel: {
//           select: {
//             precoMensal: true,
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
//       acc[key].total += aluguel.imovel.precoMensal || 0;
//       acc[key].count += 1;
//       return acc;
//     }, {} as Record<string, { zona: string; mes: string; total: number; count: number }>);

//     return Object.values(precoPorZonaMes).map((item) => ({
//       zona: item.zona,
//       mes: item.mes,
//       precoMensal: item.total / item.count,
//       provincia: item.zona.split(", ")[1],
//       bairro: item.zona.split(", ")[0],
//     }));
//   },
// };



























// import { PrismaClient, TipoAluguel } from "@prisma/client";

// const prisma = new PrismaClient();

// export const estatisticasRepository = {
//   async getPrecoPorZona(year?: string, tipoAluguel?: string) {
//     const precoField = tipoAluguel === "RESIDENCIAL" ? "precoMensal" : "preco";
//     const whereClause = {
//       alugueis: {
//         some: {
//           checkIn: year ? {
//             gte: new Date(`${year}-01-01`),
//             lte: new Date(`${year}-12-31`),
//           } : undefined,
//           tipoAluguel: tipoAluguel as TipoAluguel | undefined,
//         },
//       },
//     };
//     return prisma.imovel.groupBy({
//       by: ["bairro", "provincia"],
//       _avg: { [precoField]: true },
//       where: whereClause,
//       orderBy: { _avg: { [precoField]: "asc" } },
//     });
//   },

//   async getProximidades(year?: string, tipoAluguel?: string) {
//     const whereClause: any = {};
//     if (year || tipoAluguel) {
//       whereClause.imovel = {
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
//       };
//     }
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
//     const precoField = tipoAluguel === "RESIDENCIAL" ? "precoMensal" : "preco";
//     const alugueis = await prisma.aluguel.findMany({
//       where: {
//         checkIn: year ? {
//           gte: new Date(`${year}-01-01`),
//           lte: new Date(`${year}-12-31`),
//         } : undefined,
//         tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
//       },
//       select: {
//         checkIn: true,
//         imovel: { select: { [precoField]: true } },
//       },
//     });
//     const precoPorMes = alugueis.reduce((acc, aluguel) => {
//       const mes = aluguel.checkIn.toISOString().slice(0, 7);
//       if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
//       acc[mes].total += Number(aluguel.imovel[precoField]) || 0;
//       acc[mes].count += 1;
//       return acc;
//     }, {} as Record<string, { total: number; count: number }>);
//     return Object.entries(precoPorMes).map(([mes, { total, count }]) => ({
//       mes,
//       precoMedio: total / count,
//     }));
//   },

//   async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string) {
//     const precoField = tipoAluguel === "RESIDENCIAL" ? "precoMensal" : "preco";
//     const whereClause: any = {
//       [precoField]: { not: null },
//       alugueis: {
//         some: {
//           checkIn: year ? {
//             gte: new Date(`${year}-01-01`),
//             lte: new Date(`${year}-12-31`),
//           } : undefined,
//           tipoAluguel: tipoAluguel || undefined,
//         },
//       },
//     };
//     if (provincia && provincia !== "all") whereClause.provincia = provincia;
//     if (bairro && bairro !== "all") whereClause.bairro = bairro;

//     const alugueis = await prisma.aluguel.findMany({
//       select: {
//         checkIn: true,
//         imovel: {
//           select: {
//             [precoField]: true,
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
//       acc[key].total += Number(aluguel.imovel[precoField as keyof typeof aluguel.imovel]) || 0;
//       acc[key].count += 1;
//       return acc;
//     }, {} as Record<string, { zona: string; mes: string; total: number; count: number }>);

//     return Object.values(precoPorZonaMes).map((item) => ({
//       zona: item.zona,
//       mes: item.mes,
//       [precoField]: item.total / item.count,
//       provincia: item.zona.split(", ")[1],
//       bairro: item.zona.split(", ")[0],
//     }));
//   },
// };





















import { PrismaClient, TipoAluguel } from "@prisma/client";

const prisma = new PrismaClient();

export const estatisticasRepository = {
  async getPrecoPorZona(year?: string, tipoAluguel?: string) {
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
        },
      },
      preco: { not: null },
    };
    return prisma.imovel.groupBy({
      by: ["bairro", "provincia"],
      _avg: { preco: true }, // Ajuste para o campo correto
      where: whereClause,
      orderBy: { _avg: { preco: "asc" } },
    });
  },

  async getProximidades(year?: string, tipoAluguel?: string) {
    const whereClause = year || tipoAluguel ? {
      imovel: {
        is: {
          alugueis: {
            some: {
              ...(year ? {
                checkIn: {
                  gte: new Date(`${year}-01-01`),
                  lte: new Date(`${year}-12-31`),
                }
              } : {}),
              ...(tipoAluguel ? { tipoAluguel: tipoAluguel as TipoAluguel } : {})
            }
          }
        }
      }
    } : {};
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

  async getPrecoPorMes(year?: string, tipoAluguel?: string) {
    const alugueis = await prisma.aluguel.findMany({
      where: {
        checkIn: year
          ? {
              gte: new Date(`${year}-01-01`),
              lte: new Date(`${year}-12-31`),
            }
          : undefined,
        tipoAluguel: tipoAluguel ? (tipoAluguel as TipoAluguel) : undefined,
      },
      select: {
        checkIn: true,
        imovel: { select: { preco: true } }, // Ajuste para o campo correto
      },
    });
    const precoPorMes = alugueis.reduce((acc, aluguel) => {
      const mes = aluguel.checkIn.toISOString().slice(0, 7);
      if (!acc[mes]) acc[mes] = { total: 0, count: 0 };
      acc[mes].total += aluguel.imovel.preco || 0; // Ajuste para o campo correto
      acc[mes].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);
    return Object.entries(precoPorMes).map(([mes, { total, count }]) => ({
      mes,
      precoMedio: total / count,
    }));
  },

  async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string) {
    const whereClause: any = {
      imovel: {
        preco: { not: null }, // Ajuste para o campo correto
        alugueis: {
          some: {
            checkIn: year
              ? {
                  gte: new Date(`${year}-01-01`),
                  lte: new Date(`${year}-12-31`),
                }
              : undefined,
            tipoAluguel: tipoAluguel || undefined,
          },
        },
      },
    };
    if (provincia && provincia !== "all") whereClause.imovel.provincia = provincia;
    if (bairro && bairro !== "all") whereClause.imovel.bairro = bairro;

    const alugueis = await prisma.aluguel.findMany({
      select: {
        checkIn: true,
        imovel: {
          select: {
            preco: true, // Ajuste para o campo correto
            provincia: true,
            bairro: true,
          },
        },
      },
      where: whereClause,
    });

    const precoPorZonaMes = alugueis.reduce((acc, aluguel) => {
      const mes = new Date(aluguel.checkIn).toISOString().slice(0, 7);
      const zona = `${aluguel.imovel.bairro}, ${aluguel.imovel.provincia}`;
      const key = `${zona}-${mes}`;
      if (!acc[key]) {
        acc[key] = { zona, mes, total: 0, count: 0 };
      }
      acc[key].total += aluguel.imovel.preco || 0; // Ajuste para o campo correto
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { zona: string; mes: string; total: number; count: number }>);

    return Object.values(precoPorZonaMes).map((item) => ({
      zona: item.zona,
      mes: item.mes,
      preco: item.total / item.count, // Retorna como 'preco'
      provincia: item.zona.split(", ")[1],
      bairro: item.zona.split(", ")[0],
    }));
  },
};