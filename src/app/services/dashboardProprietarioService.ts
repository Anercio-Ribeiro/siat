
import { AluguelRepository } from "../repositories/aluguelRepository";
import { ImovelRepository } from "../repositories/imovelRepository";
// export class DashboardProprietarioService {
//   constructor(
//     private imovelRepo = new ImovelRepository(),
//     private aluguelRepo = new AluguelRepository()
//   ) {}

//   async getStats(proprietarioId: string, tipoAluguel: "TURISTICO" | "RESIDENCIAL") {
//     const imoveis = await this.imovelRepo.getImoveisByProprietario(proprietarioId);
//     const alugueis = await this.aluguelRepo.getAlugueisByProprietario(proprietarioId).then(a =>
//       a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
//     );

//     const totalDias = 30; // Últimos 30 dias
//     const now = new Date();
//     const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     // Taxa de Ocupação
//     const diasOcupados = alugueis
//       .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
//       .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
//     const totalPossivel = imoveis.length * totalDias;
//     const taxaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

//     // Receita Total (últimos 30 dias)
//     const receitaTotal = alugueis
//       .filter(a => a.status === "concluído")
//       .reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0);

//     // Receita Mensal (últimos 6 meses)
//     const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
//     const receitaMensal = Array(6).fill(0);
//     alugueis
//       .filter(a => new Date(a.criadoEm) >= sixMonthsAgo)
//       .forEach(a => {
//         const monthIndex = Math.floor((now.getTime() - new Date(a.criadoEm).getTime()) / (30 * 24 * 60 * 60 * 1000));
//         if (monthIndex < 6) receitaMensal[5 - monthIndex] += a.contrato?.valorTotal || 0;
//       });

//     // Aluguéis Concluídos
//     const alugueisConcluidos = alugueis
//       //.filter(a => a.status === "concluído");
//        .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo).length;

//     // Tempo Médio de Reserva
//     const tempoMedioReserva = alugueis.length > 0
//       ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length
//       : 0;

//     // Imóvel Mais Popular
//     const alugueisPorImovel = alugueis.reduce((acc, a) => {
//       acc[a.imovelId] = (acc[a.imovelId] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);
//     const maisPopularId = Object.entries(alugueisPorImovel).sort((a, b) => b[1] - a[1])[0]?.[0];
//     const imovelPopular = maisPopularId ? imoveis.find(i => i.id === maisPopularId) : null;

//     // Comparação com Média (média da plataforma)
//     const allAlugueisPlataforma = await this.aluguelRepo.getAllAlugueis().then(a =>
//       a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
//     );
//     const totalDiasPlataforma = (await this.imovelRepo.getTotalImoveis()) * totalDias;
//     const diasOcupadosPlataforma = allAlugueisPlataforma
//       .filter(a => new Date(a.criadoEm) >= thirtyDaysAgo)
//       .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
//     const mediaTaxaOcupacao = totalDiasPlataforma > 0 ? (diasOcupadosPlataforma / totalDiasPlataforma) * 100 : 0;
//     const comparacaoMedia = taxaOcupacao - mediaTaxaOcupacao;

//     // Solicitações Pendentes (últimos 30 dias)
//     const pendentes = alugueis.filter(a => a.status.toUpperCase() === "PENDENTE");
//     console.log(pendentes)
//     //const pendentes = alugueis.filter(a => a.status === "PENDENTE" && new Date(a.criadoEm) >= thirtyDaysAgo);

//     return {
//       taxaOcupacao: Number(taxaOcupacao.toFixed(2)),
//       receitaTotal: receitaTotal || 0,
//       receitaMensal, // Array com 6 valores para o gráfico
//       alugueisConcluidos: alugueisConcluidos || 0,
//       tempoMedioReserva: Number(tempoMedioReserva.toFixed(1)),
//       imovelMaisPopular: imovelPopular ? { titulo: imovelPopular.titulo, reservas: alugueisPorImovel[maisPopularId] || 0 } : null,
//       comparacaoMedia: Number(comparacaoMedia.toFixed(2)),
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

    // Taxa de Ocupação (apenas "concluído")
    const diasOcupados = alugueis
      .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
    const totalPossivel = imoveis.length * totalDias;
    const taxaOcupacao = totalPossivel > 0 ? (diasOcupados / totalPossivel) * 100 : 0;

    // Receita Total (apenas "concluído", usando valorTotal do contrato)
    const receitaTotal = alugueis
      .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + (a.contrato?.valorTotal || 0), 0);

    // Receita Mensal (últimos 6 meses, apenas "concluído")
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
    const receitaMensal = Array(6).fill(0);
    alugueis
      .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= sixMonthsAgo)
      .forEach(a => {
        const monthIndex = Math.floor((now.getTime() - new Date(a.criadoEm).getTime()) / (30 * 24 * 60 * 60 * 1000));
        if (monthIndex < 6) receitaMensal[5 - monthIndex] += a.contrato?.valorTotal || 0;
      });

    // Aluguéis Concluídos (últimos 30 dias)
    const alugueisConcluidos = alugueis
      .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo).length;

    // Tempo Médio de Reserva (todos os aluguéis, sem filtro de status)
    const tempoMedioReserva = alugueis.length > 0
      ? alugueis.reduce((sum, a) => sum + a.periodoAluguel, 0) / alugueis.length
      : 0;

    // Imóvel Mais Popular (apenas "concluído")
    const alugueisPorImovel = alugueis
      .filter(a => a.status === "concluído")
      .reduce((acc, a) => {
        acc[a.imovelId] = (acc[a.imovelId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    const maisPopularId = Object.entries(alugueisPorImovel).sort((a, b) => b[1] - a[1])[0]?.[0];
    const imovelPopular = maisPopularId ? imoveis.find(i => i.id === maisPopularId) : null;

    // Comparação com Média (apenas "concluído")
    const allAlugueisPlataforma = await this.aluguelRepo.getAllAlugueis().then(a =>
      a.filter(aluguel => aluguel.tipoAluguel === tipoAluguel)
    );
    const totalDiasPlataforma = (await this.imovelRepo.getTotalImoveis()) * totalDias;
    const diasOcupadosPlataforma = allAlugueisPlataforma
      .filter(a => a.status === "concluído" && new Date(a.criadoEm) >= thirtyDaysAgo)
      .reduce((sum, a) => sum + Math.min(a.periodoAluguel, totalDias), 0);
    const mediaTaxaOcupacao = totalDiasPlataforma > 0 ? (diasOcupadosPlataforma / totalDiasPlataforma) * 100 : 0;
    const comparacaoMedia = taxaOcupacao - mediaTaxaOcupacao;

    // Solicitações Pendentes (sem alteração, mantém todos os pendentes)
    const pendentes = alugueis.filter(a => a.status.toUpperCase() === "PENDENTE");

    return {
      taxaOcupacao: Number(taxaOcupacao.toFixed(2)),
      receitaTotal: receitaTotal || 0,
      receitaMensal,
      alugueisConcluidos: alugueisConcluidos || 0,
      tempoMedioReserva: Number(tempoMedioReserva.toFixed(1)),
      imovelMaisPopular: imovelPopular ? { titulo: imovelPopular.titulo, reservas: alugueisPorImovel[maisPopularId] || 0 } : null,
      comparacaoMedia: Number(comparacaoMedia.toFixed(2)),
      pendencias: pendentes.length || 0,
    };
  }
}