// // import { AluguelRepository } from "../repositories/aluguelRepository";
// // import { ImovelRepository } from "../repositories/imovelRepository";

import { AluguelRepository } from "../repositories/aluguelRepository";
import { ImovelRepository } from "../repositories/imovelRepository";

// import { AluguelRepository } from "../repositories/aluguelRepository";
// import { ImovelRepository } from "../repositories/imovelRepository";


// // const imovelRepo = new ImovelRepository();
// // const aluguelRepo = new AluguelRepository();

// // export class DashboardInquilinoService {
// //     async getStats(proprietarioId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
// //         const alugueis = await aluguelRepo.getAlugueisByProprietario(proprietarioId).then(a =>
// //           a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
// //         );
// //     const totalImoveis = await imovelRepo.getTotalImoveis();
// //     const allAlugueis = await imovelRepo.getAllAlugueis();
// //     const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
// //     const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

// //     // Taxa Média de Ocupação
// //     const totalDias = totalImoveis * 30;
// //     const diasOcupados = allAlugueis.reduce((sum, a) => {
// //       const checkIn = new Date(a.checkIn);
// //       const checkOut = new Date(a.checkOut);
// //       return sum + Math.min(30, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)));
// //     }, 0);
// //     const taxaMediaOcupacao = totalDias > 0 ? (diasOcupados / totalDias) * 100 : 0;

// //     // Preço Médio
// //     const precoMedio = allAlugueis.length > 0
// //       ? allAlugueis.reduce((sum, a) => sum + (a.imovel.preco || 0), 0) / allAlugueis.length
// //       : 0;

// //     // Crescimento da Plataforma
// //     const novosImoveis = await imovelRepo.getImoveisByProprietario("").then(imoveis =>
// //       imoveis.filter(i => new Date(i.criadoEm) >= last30Days).length
// //     );

// //     // Atividade Recente
// //     const alugueisRecentes = allAlugueis.filter(a => new Date(a.criadoEm) >= last7Days).length;

// //     return {
// //         totalImoveis: totalImoveis || 0,
// //         taxaMediaOcupacao: taxaMediaOcupacao.toFixed(2),
// //         precoMedio: precoMedio.toFixed(2),
// //         crescimentoPlataforma: novosImoveis || 0,
// //         atividadeRecente: alugueisRecentes || 0,
// //       };
// //     }
    
// //     async getInquilinoStats(inquilinoId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
// //       const alugueis = await aluguelRepo.getAlugueisByInquilino(inquilinoId).then(a =>
// //         a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
// //       );
// //       return {
// //         numeroAlugueis: alugueis.length || 0,
// //         gastoTotal: alugueis.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0) || 0,
// //         duracaoMedia: alugueis.length > 0 ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length : 0,
// //       };
// // }
// // }











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

//     const diasOcupados = allAlugueis.reduce((sum, a) => sum + a.periodoAluguel, 0);
//     const totalPossivel = totalImoveis * 30;
//     const taxaMediaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

//     const precoMedio = imoveis.length > 0 ? imoveis.reduce((sum, i) => sum + (i.imovel.preco ?? 0), 0) / imoveis.length : 0;
//     const novosImoveis = imoveis.filter(i => {
//       const createdAt = new Date(i.criadoEm);
//       const now = new Date();
//       return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 30;
//     }).length;
//     const alugueisRecentes = allAlugueis.filter(a => {
//       const createdAt = new Date(a.criadoEm);
//       const now = new Date();
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
//     return {
//       numeroAlugueis: alugueis.length || 0,
//       gastoTotal: alugueis.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0) || 0,
//       duracaoMedia: alugueis.length > 0 ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length : 0,
//     };
//   }
// }












export class DashboardInquilinoService {
  constructor(
    private imovelRepo = new ImovelRepository(),
    private aluguelRepo = new AluguelRepository()
  ) {}

  async getStats(tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
    const imoveis = await this.imovelRepo.getAllAlugueis().then(i =>
      i.filter(imovel => imovel.tipoAluguel === tipoAluguel)
    );
    const totalImoveis = imoveis.length;
    const allAlugueis = await this.aluguelRepo.getAllAlugueis().then(a =>
      a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
    );

    const totalDias = 30;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const diasOcupados = allAlugueis
      .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
    const totalPossivel = totalImoveis * totalDias;
    const taxaMediaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

    const precoMedio = imoveis.length > 0 ? imoveis.reduce((sum, i) => sum + (i.imovel.preco || 0), 0) / imoveis.length : 0;
    const novosImoveis = imoveis.filter(i => {
      const createdAt = new Date(i.criadoEm);
      return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 30;
    }).length;
    const alugueisRecentes = allAlugueis.filter(a => {
      const createdAt = new Date(a.criadoEm);
      return (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24) <= 7;
    }).length;

    return {
      totalImoveis: totalImoveis || 0,
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

    // Gastos Mensais (últimos 6 meses)
    const gastosMensais = Array(6).fill(0);
    alugueis
      .filter(a => new Date(a.criadoEm) >= sixMonthsAgo)
      .forEach(a => {
        const monthIndex = Math.floor((now.getTime() - new Date(a.criadoEm).getTime()) / (30 * 24 * 60 * 60 * 1000));
        if (monthIndex < 6) gastosMensais[5 - monthIndex] += a.contrato?.valorTotal || 0;
      });

    // Solicitações Pendentes
    const pendentes = alugueis.filter(a => a.status.toUpperCase() === "PENDENTE");

    // const pendentes = alugueis.filter(a => a.status === "PENDENTE" && new Date(a.criadoEm) >= thirtyDaysAgo);

    console.log(pendentes)

    return {
      numeroAlugueis: alugueis.length || 0,
      gastoTotal: alugueis.reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0) || 0,
      gastosMensais, // Array com 6 valores para o gráfico
      duracaoMedia: alugueis.length > 0 ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length : 0,
      pendencias: pendentes.length || 0,
    };
  }
}