
// // import { format } from "date-fns";

// // import { pt } from "date-fns/locale";

// // import { estatisticasRepository } from "../repositories/dashboardRepository";
// // import { prisma } from "@/lib/prisma";

// // export const estatisticasService = {
// //   async getPrecoPorZona() {
// //     const data = await estatisticasRepository.getPrecoPorZona();
// //     return data.map((item) => ({
// //       zona: `${item.bairro}, ${item.provincia}`,
// //       precoMedio: item._avg.precoMensal,
// //     }));
// //   },

// //   async getProximidadesMaisProcuradas() {
// //     const data = await estatisticasRepository.getProximidadesMaisProcuradas();
// //     return Promise.all(
// //       data.map(async (item) => {
// //         const proximidade = await prisma.proximidade.findUnique({
// //           where: { id: item.proximidadeId },
// //         });
// //         return {
// //           nome: proximidade?.nome,
// //           tipo: proximidade?.tipo,
// //           count: item._count.imovelId,
// //         };
// //       })
// //     );
// //   },

// //   async getPrecoPorMes() {
// //     const data = await estatisticasRepository.getPrecoPorMes();
// //     return data.map((item) => ({
// //       mes: format(new Date(item.mes), "MMM yyyy"),
// //       precoMedio: item.precoMedio,
// //     }));
// //   },

// //   async getPrecoMensalPorZona(provincia?: string, bairro?: string) {
// //     const data = await estatisticasRepository.getPrecoMensalPorZona(provincia, bairro);
// //     return data.map((item) => ({
// //       zona: `${item.bairro}, ${item.provincia}`,
// //       precoMensal: item._avg.precoMensal,
// //       provincia: item.provincia,
// //       bairro: item.bairro,
// //     }));
// //   }

// // }









// import { format } from "date-fns";
// import { pt } from "date-fns/locale";
// import { estatisticasRepository } from "../repositories/dashboardRepository";
// import { prisma } from "@/lib/prisma";

// export const estatisticasService = {
//   async getPrecoPorZona(year?: string) {
//     const data = await estatisticasRepository.getPrecoPorZona(year);
//     return data.map((item) => ({
//       zona: `${item.bairro}, ${item.provincia}`,
//       precoMedio: item._avg.precoMensal,
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },

//   async getProximidadesMaisProcuradas(year?: string) {
//     const data = await estatisticasRepository.getProximidadesMaisProcuradas(year);
//     return Promise.all(
//       data.map(async (item) => {
//         const proximidade = await prisma.proximidade.findUnique({
//           where: { id: item.proximidadeId },
//         });
//         return {
//           nome: proximidade?.nome,
//           tipo: proximidade?.tipo,
//           count: item._count.imovelId,
//         };
//       })
//     );
//   },

//   async getPrecoPorMes(year?: string) {
//     const data = await estatisticasRepository.getPrecoPorMes(year);
//     return data.map((item) => ({
//       mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
//       precoMedio: item.precoMedio,
//     }));
//   },

//   async getPrecoMensalPorZona(provincia?: string, bairro?: string, year?: string) {
//     const data = await estatisticasRepository.getPrecoMensalPorZona(provincia, bairro, year);
//     return data.map((item) => ({
//       zona: `${item.bairro}, ${item.provincia}`,
//       precoMensal: item._avg.precoMensal,
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },


// };
//   // async getPrecoMensalPorZona(provincia?: string, bairro?: string, year?: string) {
//   //   const data = await estatisticasRepository.getPrecoMensalPorZona(provincia, bairro, year);
//   //   return data.map((item) => ({
//   //     zona: `${item.bairro}, ${item.provincia}`,
//   //     //precoMensal: item.avg.precoMensal,
//   //     provincia: item.provincia,
//   //     bairro: item.bairro,
//   //   }));
//   // },







// import { format } from "date-fns";
// import { pt } from "date-fns/locale";
// import { estatisticasRepository } from "../repositories/dashboardRepository";


// export const estatisticasService = {
//   async getPrecoPorZona(year?: string, tipoAluguel?: string) {
//     const data = await estatisticasRepository.getPrecoPorZona(year, tipoAluguel);
//     return data.map((item) => ({
//       zona: `${item.bairro}, ${item.provincia}`,
//       precoMedio: item._avg.precoMensal || 0,
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },

//   async getProximidades(year?: string, tipoAluguel?: string) {
//     return estatisticasRepository.getProximidades(year, tipoAluguel);
//   },

//   async getPrecoPorMes(year?: string, tipoAluguel?: string) {
//     const data = await estatisticasRepository.getPrecoPorMes(year, tipoAluguel);
//     return data.map((item) => ({
//       mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
//       precoMedio: item.precoMedio,
//     }));
//   },

//   async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string) {
//     const data = await estatisticasRepository.getPrecoMensalPorZona(year, tipoAluguel, provincia, bairro);
//     return data.map((item) => ({
//       zona: item.zona,
//       mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
//       precoMensal: item.precoMensal,
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },
// };





// import { format } from "date-fns";
// import { pt } from "date-fns/locale";
// import { estatisticasRepository } from "../repositories/dashboardRepository";

// export const estatisticasService = {
//   async getPrecoPorZona(year?: string, tipoAluguel?: string) {
//     const data = await estatisticasRepository.getPrecoPorZona(year, tipoAluguel);
//     const precoField = tipoAluguel === "RESIDENCIAL" ? "precoMensal" : "preco";
//     return data.map((item) => ({
//       zona: `${item.bairro}, ${item.provincia}`,
//       precoMedio: item._avg[precoField] || 0,
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },

//   async getProximidades(year?: string, tipoAluguel?: string) {
//     return estatisticasRepository.getProximidades(year, tipoAluguel);
//   },

//   async getPrecoPorMes(year?: string, tipoAluguel?: string) {
//     const data = await estatisticasRepository.getPrecoPorMes(year, tipoAluguel);
//     return data.map((item) => ({
//       mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
//       precoMedio: item.precoMedio,
//     }));
//   },

//   async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string) {
//     const data = await estatisticasRepository.getPrecoMensalPorZona(year, tipoAluguel, provincia, bairro);
//     const precoField = tipoAluguel === "RESIDENCIAL" ? "precoMensal" : "preco";
//     return data.map((item) => ({
//       zona: item.zona,
//       mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
//       [precoField]: item[precoField],
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },
// };














import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { estatisticasRepository } from "../repositories/dashboardRepository";

export const estatisticasService = {
  async getPrecoPorZona(year?: string, tipoAluguel?: string) {
    const data = await estatisticasRepository.getPrecoPorZona(year, tipoAluguel);
    return data.map((item) => ({
      zona: `${item.bairro}, ${item.provincia}`,
      precoMedio: item._avg.preco || 0, // Ajuste para o campo correto
      provincia: item.provincia,
      bairro: item.bairro,
    }));
  },

  async getProximidades(year?: string, tipoAluguel?: string) {
    return estatisticasRepository.getProximidades(year, tipoAluguel);
  },

  async getPrecoPorMes(year?: string, tipoAluguel?: string) {
    const data = await estatisticasRepository.getPrecoPorMes(year, tipoAluguel);
    return data.map((item) => ({
      mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
      precoMedio: item.precoMedio,
    }));
  },

  async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string) {
    const data = await estatisticasRepository.getPrecoMensalPorZona(year, tipoAluguel, provincia, bairro);
    return data.map((item) => ({
      zona: item.zona,
      mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
      preco: item.preco, // Ajuste para o campo correto
      provincia: item.provincia,
      bairro: item.bairro,
    }));
  },
};