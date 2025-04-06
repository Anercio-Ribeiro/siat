// // // import { AluguelRepository } from "../repositories/aluguelRepository";
// // // import { ImovelRepository } from "../repositories/imovelRepository";

import { AluguelRepository } from "../repositories/aluguelRepository";
import { ImovelRepository } from "../repositories/imovelRepository";

// import { AluguelRepository } from "../repositories/aluguelRepository";
// import { ImovelRepository } from "../repositories/imovelRepository";

// // import { AluguelRepository } from "../repositories/aluguelRepository";
// // import { ImovelRepository } from "../repositories/imovelRepository";


// // // const imovelRepo = new ImovelRepository();
// // // const aluguelRepo = new AluguelRepository();

// // // export class DashboardProprietarioService {
// // //     async getStats(proprietarioId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
// // //         const alugueis = await aluguelRepo.getAlugueisByProprietario(proprietarioId).then(a =>
// // //           a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
// // //         );
// // //     const imoveis = await imovelRepo.getImoveisByProprietario(proprietarioId);
// // //     //const alugueis = await aluguelRepo.getAlugueisByProprietario(proprietarioId);
// // //     const pendentes = await aluguelRepo.getPendingAlugueis(proprietarioId);
// // //     const now = new Date();
// // //     const last30Days = new Date(now.setDate(now.getDate() - 30));

// // //     // Taxa de Ocupação
// // //     const totalDias = imoveis.length * 30;
// // //     const diasOcupados = alugueis.reduce((sum, a) => {
// // //       const checkIn = new Date(a.checkIn);
// // //       const checkOut = new Date(a.checkOut);
// // //       return sum + Math.min(30, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)));
// // //     }, 0);
// // //     const taxaOcupacao = totalDias > 0 ? (diasOcupados / totalDias) * 100 : 0;

// // //     // Receita Total
// // //     const receitaTotal = alugueis
// // //       .filter(a => a.contrato && new Date(a.criadoEm) >= last30Days)
// // //       .reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0);

// // //     // Aluguéis Concluídos
// // //     const alugueisConcluidos = alugueis.filter(a => a.status === "disponivel" && new Date(a.criadoEm) >= last30Days).length;

// // //     // Tempo Médio de Reserva
// // //     const tempoMedioReserva = alugueis.length > 0
// // //       ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length
// // //       : 0;

// // //     // Imóvel Mais Popular
// // //     const alugueisPorImovel = alugueis.reduce((acc, a) => {
// // //       acc[a.imovelId] = (acc[a.imovelId] || 0) + 1;
// // //       return acc;
// // //     }, {} as Record<string, number>);
// // //     const maisPopularId = Object.entries(alugueisPorImovel).sort((a, b) => b[1] - a[1])[0]?.[0];
// // //     const imovelPopular = imoveis.find(i => i.id === maisPopularId);

// // //     // Comparação com Média (simplificada)
// // //     const allAlugueis = await imovelRepo.getAllAlugueis();
// // //     const mediaPlataforma = (allAlugueis.length / (await imovelRepo.getTotalImoveis() * 30)) * 100;
// // //     const comparacaoMedia = taxaOcupacao - mediaPlataforma;

// // //     // return {
// // //     //   taxaOcupacao: taxaOcupacao.toFixed(2),
// // //     //   receitaTotal,
// // //     //   alugueisConcluidos,
// // //     //   tempoMedioReserva: tempoMedioReserva.toFixed(1),
// // //     //   imovelMaisPopular: imovelPopular ? { titulo: imovelPopular.titulo, reservas: alugueisPorImovel[maisPopularId] } : null,
// // //     //   comparacaoMedia: comparacaoMedia.toFixed(2),
// // //     //   pendencias: pendentes.length,
// // //     // };

// // //     return {
// // //         taxaOcupacao: taxaOcupacao.toFixed(2),
// // //         receitaTotal: receitaTotal || 0,
// // //         alugueisConcluidos: alugueisConcluidos || 0,
// // //         tempoMedioReserva: tempoMedioReserva.toFixed(1),
// // //         imovelMaisPopular: imovelPopular ? { titulo: imovelPopular.titulo, reservas: alugueisPorImovel[maisPopularId] || 0 } : null,
// // //         comparacaoMedia: comparacaoMedia.toFixed(2),
// // //         pendencias: pendentes.length || 0,
// // //       };
// // //   }
// // // }
















// // export class DashboardProprietarioService {
// //   constructor(
// //     private imovelRepo = new ImovelRepository(),
// //     private aluguelRepo = new AluguelRepository()
// //   ) {}

// //   async getStats(proprietarioId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
// //     const imoveis = await this.imovelRepo.getImoveisByProprietario(proprietarioId);
// //     const alugueis = await this.aluguelRepo.getAlugueisByProprietario(proprietarioId).then(a =>
// //       a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
// //     );

// //     const totalDias = 30; // Últimos 30 dias
// //     const diasOcupados = alugueis.reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
// //     const totalPossivel = imoveis.length * totalDias;
// //     const taxaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

// //     const receitaTotal = alugueis.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0);
// //     const alugueisConcluidos = alugueis.filter(a => a.status === "CONCLUIDO").length;
// //     const tempoMedioReserva = alugueis.length > 0 ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length : 0;

// //     const alugueisPorImovel = alugueis.reduce((acc, a) => {
// //       acc[a.imovelId] = (acc[a.imovelId] || 0) + 1;
// //       return acc;
// //     }, {} as Record<string, number>);
// //     const maisPopularId = Object.entries(alugueisPorImovel).sort((a, b) => b[1] - a[1])[0]?.[0];
// //     const imovelPopular = maisPopularId ? imoveis.find(i => i.id === maisPopularId) : null;

// //     const mediaTaxaOcupacao = taxaOcupacao; // Aqui poderia ser uma média geral da plataforma
// //     const comparacaoMedia = taxaOcupacao - mediaTaxaOcupacao;

// //     const pendentes = alugueis.filter(a => a.status === "PENDENTE");

// //     return {
// //       taxaOcupacao: Number(taxaOcupacao.toFixed(2)),
// //       receitaTotal: receitaTotal || 0,
// //       alugueisConcluidos: alugueisConcluidos || 0,
// //       tempoMedioReserva: Number(tempoMedioReserva.toFixed(1)),
// //       imovelMaisPopular: imovelPopular ? { titulo: imovelPopular.titulo, reservas: alugueisPorImovel[maisPopularId] || 0 } : null,
// //       comparacaoMedia: Number(comparacaoMedia.toFixed(2)),
// //       pendencias: pendentes.length || 0,
// //     };
// //   }
// // }










// export class DashboardInquilinoService {
//   constructor(
//     private imovelRepo = new ImovelRepository(),
//     private aluguelRepo = new AluguelRepository()
//   ) {}

//   async getStats(tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
//     const imoveis = await this.imovelRepo.getAllImoveis().then(i =>
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

//     const precoMedio = imoveis.length > 0 ? imoveis.reduce((sum, i) => sum + (i.preco || 0), 0) / imoveis.length : 0;
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
//     const pendentes = alugueis.filter(a => a.status === "PENDENTE" && new Date(a.criadoEm) >= thirtyDaysAgo);

//     return {
//       numeroAlugueis: alugueis.length || 0,
//       gastoTotal: alugueis.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0) || 0,
//       gastosMensais, // Array com 6 valores para o gráfico
//       duracaoMedia: alugueis.length > 0 ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length : 0,
//       pendencias: pendentes.length || 0,
//     };
//   }
// }


















export class DashboardProprietarioService {
  constructor(
    private imovelRepo = new ImovelRepository(),
    private aluguelRepo = new AluguelRepository()
  ) {}

  async getStats(proprietarioId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
    const imoveis = await this.imovelRepo.getImoveisByProprietario(proprietarioId);
    const alugueis = await this.aluguelRepo.getAlugueisByProprietario(proprietarioId).then(a =>
      a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
    );

    const totalDias = 30; // Últimos 30 dias
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Taxa de Ocupação
    const diasOcupados = alugueis
      .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
    const totalPossivel = imoveis.length * totalDias;
    const taxaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

    // Receita Total (últimos 30 dias)
    const receitaTotal = alugueis
      .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0);

    // Receita Mensal (últimos 6 meses)
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
    const receitaMensal = Array(6).fill(0);
    alugueis
      .filter(a => new Date(a.criadoEm) >= sixMonthsAgo)
      .forEach(a => {
        const monthIndex = Math.floor((now.getTime() - new Date(a.criadoEm).getTime()) / (30 * 24 * 60 * 60 * 1000));
        if (monthIndex < 6) receitaMensal[5 - monthIndex] += a.contrato?.valorTotal || 0;
      });

    // Aluguéis Concluídos
    const alugueisConcluidos = alugueis
      .filter(a => a.status === "CONCLUIDO" && new Date(a.criadoEm) >= thirtyDaysAgo).length;

    // Tempo Médio de Reserva
    const tempoMedioReserva = alugueis.length > 0
      ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length
      : 0;

    // Imóvel Mais Popular
    const alugueisPorImovel = alugueis.reduce((acc, a) => {
      acc[a.imovelId] = (acc[a.imovelId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const maisPopularId = Object.entries(alugueisPorImovel).sort((a, b) => b[1] - a[1])[0]?.[0];
    const imovelPopular = maisPopularId ? imoveis.find(i => i.id === maisPopularId) : null;

    // Comparação com Média (média da plataforma)
    const allAlugueisPlataforma = await this.aluguelRepo.getAllAlugueis().then(a =>
      a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
    );
    const totalDiasPlataforma = (await this.imovelRepo.getTotalImoveis()) * totalDias;
    const diasOcupadosPlataforma = allAlugueisPlataforma
      .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
    const mediaTaxaOcupacao = totalDiasPlataforma > 0 ? (diasOcupadosPlataforma / totalDiasPlataforma) * 100 : 0;
    const comparacaoMedia = taxaOcupacao - mediaTaxaOcupacao;

    // Solicitações Pendentes (últimos 30 dias)
    const pendentes = alugueis.filter(a => a.status.toUpperCase() === "PENDENTE");
    console.log(pendentes)
    //const pendentes = alugueis.filter(a => a.status === "PENDENTE" && new Date(a.criadoEm) >= thirtyDaysAgo);

    return {
      taxaOcupacao: Number(taxaOcupacao.toFixed(2)),
      receitaTotal: receitaTotal || 0,
      receitaMensal, // Array com 6 valores para o gráfico
      alugueisConcluidos: alugueisConcluidos || 0,
      tempoMedioReserva: Number(tempoMedioReserva.toFixed(1)),
      imovelMaisPopular: imovelPopular ? { titulo: imovelPopular.titulo, reservas: alugueisPorImovel[maisPopularId] || 0 } : null,
      comparacaoMedia: Number(comparacaoMedia.toFixed(2)),
      pendencias: pendentes.length || 0,
    };
  }
}