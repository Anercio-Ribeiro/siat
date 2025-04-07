// import { format } from "date-fns";
// import { pt } from "date-fns/locale";
// import { estatisticasRepository } from "../repositories/dashboardRepository";

// export const estatisticasService = {
//   async getPrecoPorZona(year?: string, tipoAluguel?: string) {
//     const data = await estatisticasRepository.getPrecoPorZona(year, tipoAluguel);
//     return data.map((item) => ({
//       zona: `${item.bairro}, ${item.provincia}`,
//       precoMedio: item._avg.preco || 0, // Ajuste para o campo correto
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
//       preco: item.preco, // Ajuste para o campo correto
//       provincia: item.provincia,
//       bairro: item.bairro,
//     }));
//   },
// };








import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { estatisticasRepository } from "../repositories/dashboardRepository";

export const estatisticasService = {
  async getPrecoPorZona(year?: string, tipoAluguel?: string, month?: string) {
    const data = await estatisticasRepository.getPrecoPorZona(year, tipoAluguel, month);
    return data.map((item) => ({
      zona: `${item.bairro}, ${item.provincia}`,
      precoMedio: item._avg.preco || 0,
      provincia: item.provincia,
      bairro: item.bairro,
    }));
  },

  async getProximidades(year?: string, tipoAluguel?: string, month?: string) {
    return estatisticasRepository.getProximidades(year, tipoAluguel, month);
  },

  async getPrecoPorMes(year?: string, tipoAluguel?: string, month?: string) {
    const data = await estatisticasRepository.getPrecoPorMes(year, tipoAluguel, month);
    return data.map((item) => ({
      mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
      precoMedio: item.precoMedio,
    }));
  },

  async getPrecoMensalPorZona(year?: string, tipoAluguel?: string, provincia?: string, bairro?: string, month?: string) {
    const data = await estatisticasRepository.getPrecoMensalPorZona(year, tipoAluguel, provincia, bairro, month);
    return data.map((item) => ({
      zona: item.zona,
      mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
      preco: item.preco,
      provincia: item.provincia,
      bairro: item.bairro,
    }));
  },

  async getTotalImoveis(year?: string, tipoAluguel?: string, month?: string) {
    return estatisticasRepository.getTotalImoveis(year, tipoAluguel, month);
  },

  async getTotalAlugados(year?: string, tipoAluguel?: string, month?: string) {
    return estatisticasRepository.getTotalAlugados(year, tipoAluguel, month);
  },

  async getZonasMaisAlugadas(year?: string, tipoAluguel?: string, month?: string) {
    const data = await estatisticasRepository.getZonasMaisAlugadas(year, tipoAluguel, month);
    return data.map((item) => ({
      provincia: item.provincia,
      bairro: item.bairro,
      count: item.count,
      mes: format(new Date(item.mes), "MMM yyyy", { locale: pt }),
    }));
  },
};