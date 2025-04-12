// import { AluguelRepository } from "../repositories/aluguelRepository";
// import { ImovelRepository } from "../repositories/imovelRepository";


// export class DashboardInquilinoService {
//   constructor(
//     private imovelRepo = new ImovelRepository(),
//     private aluguelRepo = new AluguelRepository()
//   ) {}

//   async getStats(tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
//     const imoveis = await this.imovelRepo.getAllAlugueis().then(i =>
//       i.filter(imovel => imovel.tipoAluguel === tipoAluguel)
//     );
//     const totalImoveis = imoveis.length;
//     const allAlugueis = await this.aluguelRepo.getAllAlugueis().then(a =>
//       a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
//     );

//     const totalDias = 30;
//     const now = new Date();
//     const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     const diasOcupados = allAlugueis
//       .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
//       .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
//     const totalPossivel = totalImoveis * totalDias;
//     const taxaMediaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

//     const precoMedio = imoveis.length > 0 ? imoveis.reduce((sum, i) => sum + (i.imovel.preco || 0), 0) / imoveis.length : 0;
//     const novosImoveis = imoveis.filter(i => {
//       const createdAt = new Date(i.criadoEm);
//       return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 30;
//     }).length;
//     const alugueisRecentes = allAlugueis.filter(a => {
//       const createdAt = new Date(a.criadoEm);
//       return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 7;
//     }).length;

//     return {
//       totalImoveis: totalImoveis || 0,
//       taxaMediaOcupacao: Number(taxaMediaOcupacao.toFixed(2)),
//       precoMedio: Number(precoMedio.toFixed(2)),
//       crescimentoPlataforma: novosImoveis || 0,
//       atividadeRecente: alugueisRecentes || 0,
//     };
//   }

//   async getInquilinoStats(inquilinoId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
//     const alugueis = await this.aluguelRepo.getAlugueisByInquilino(inquilinoId).then(a =>
//       a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
//     );
//     const now = new Date();
//     const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
//     const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     // Gastos Mensais (últimos 6 meses)
//     const gastosMensais = Array(6).fill(0);
//     alugueis
//       .filter(a => new Date(a.criadoEm) >= sixMonthsAgo)
//       .forEach(a => {
//         const monthIndex = Math.floor((now.getTime() - new Date(a.criadoEm).getTime()) / (30 * 24 * 60 * 60 * 1000));
//         if (monthIndex < 6) gastosMensais[5 - monthIndex] += a.contrato?.valorTotal || 0;
//       });

//     // Solicitações Pendentes
//     const pendentes = alugueis.filter(a => a.status.toUpperCase() === "PENDENTE");

//     // const pendentes = alugueis.filter(a => a.status === "PENDENTE" && new Date(a.criadoEm) >= thirtyDaysAgo);

//     console.log(pendentes)

//     return {
//       numeroAlugueis: alugueis.length || 0,
//       gastoTotal: alugueis.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0) || 0,
//       gastosMensais, // Array com 6 valores para o gráfico
//       duracaoMedia: alugueis.length > 0 ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length : 0,
//       pendencias: pendentes.length || 0,
//     };
//   }
// }






import { AluguelRepository } from "../repositories/aluguelRepository";
import { estatisticasRepository } from "../repositories/dashboardRepository";
import { ImovelRepository } from "../repositories/imovelRepository";
export class DashboardInquilinoService {
  constructor(
    private imovelRepo = new ImovelRepository(),
    private aluguelRepo = new AluguelRepository()
  ) {}

  // async getStats(tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
    
  //   const imoveis = await this.imovelRepo.getAllAlugueis().then(i =>
  //     i.filter(imovel => imovel.tipoAluguel === tipoAluguel)
  //   );
  //   const totalImoveis = imoveis.length;
  //   const allAlugueis = await this.aluguelRepo.getAllAlugueis().then(a =>
  //     a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
  //   );

  //   const totalDias = 30;
  //   const now = new Date();
  //   const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  //   // Taxa Média de Ocupação (apenas "concluído")
  //   const diasOcupados = allAlugueis
  //     .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo)
  //     .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
  //   const totalPossivel = totalImoveis * totalDias;
  //   const taxaMediaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

  //   const precoMedio = imoveis.length > 0
  //     ? imoveis.reduce((sum, i) => sum + (i.imovel.preco || 0), 0) / imoveis.length
  //     : 0;
  //   const novosImoveis = imoveis.filter(i => {
  //     const createdAt = new Date(i.criadoEm);
  //     return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 30;
  //   }).length;
  //   const alugueisRecentes = allAlugueis
  //     .filter(a => a.status === "concluído" && (now.getTime() - new Date(a.criadoEm).getTime()) / (1000 * 3600 * 24) <= 7)
  //     .length;

  //   return {
  //     totalImoveis: totalImoveis || 0,
  //     taxaMediaOcupacao: Number(taxaMediaOcupacao.toFixed(2)),
  //     precoMedio: Number(precoMedio.toFixed(2)),
  //     crescimentoPlataforma: novosImoveis || 0,
  //     atividadeRecente: alugueisRecentes || 0,
  //   };
  // }

  async getStats(tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
    // Obter o total de imóveis diretamente, sem filtro por tipoAluguel
    const { total: totalImoveis } = await estatisticasRepository.getTotalImoveis();

    const imoveis = await this.imovelRepo.getAllAlugueis().then(i =>
      i.filter(imovel => imovel.tipoAluguel === tipoAluguel)
    );
    const allAlugueis = await this.aluguelRepo.getAllAlugueis().then(a =>
      a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
    );

    const totalDias = 30;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Taxa Média de Ocupação (apenas "concluído")
    const diasOcupados = allAlugueis
      .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
    const totalPossivel = totalImoveis * totalDias; // Use o totalImoveis corrigido
    const taxaMediaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

    const precoMedio = imoveis.length > 0
      ? imoveis.reduce((sum, i) => sum + (i.imovel.preco || 0), 0) / imoveis.length
      : 0;
    const novosImoveis = imoveis.filter(i => {
      const createdAt = new Date(i.criadoEm);
      return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 30;
    }).length;
    const alugueisRecentes = allAlugueis
      .filter(a => a.status === "concluído" && (now.getTime() - new Date(a.criadoEm).getTime()) / (1000 * 3600 * 24) <= 7)
      .length;

    return {
      totalImoveis: totalImoveis || 0, // Use o total corrigido
      taxaMediaOcupacao: Number(taxaMediaOcupacao.toFixed(2)),
      precoMedio: Number(precoMedio.toFixed(2)),
      crescimentoPlataforma: novosImoveis || 0,
      atividadeRecente: alugueisRecentes || 0,
    };
  }

  async getInquilinoStats(inquilinoId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
    const alugueis = await this.aluguelRepo.getAlugueisByInquilino(inquilinoId).then(a =>
      a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
    );
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Filtra apenas aluguéis concluídos
    const alugueisConcluidos = alugueis.filter(a => a.status === "concluído");

    // Gastos Mensais (últimos 6 meses, apenas "concluído")
    const gastosMensais = Array(6).fill(0);
    alugueisConcluidos
      .filter(a => new Date(a.criadoEm) >= sixMonthsAgo)
      .forEach(a => {
        const monthIndex = Math.floor((now.getTime() - new Date(a.criadoEm).getTime()) / (30 * 24 * 60 * 60 * 1000));
        if (monthIndex < 6) gastosMensais[5 - monthIndex] += a.contrato?.valorTotal || 0;
      });

    // Solicitações Pendentes (sem alteração, mantém todos os pendentes)
    const pendentes = alugueis.filter(a => a.status.toUpperCase() === "PENDENTE");

    return {
      numeroAlugueis: alugueisConcluidos.length || 0,
      gastoTotal: alugueisConcluidos.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0) || 0,
      gastosMensais,
      duracaoMedia: alugueisConcluidos.length > 0
        ? alugueisConcluidos.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueisConcluidos.length
        : 0,
      pendencias: pendentes.length || 0,
    };
  }
}