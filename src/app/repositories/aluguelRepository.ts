import { prisma } from '@/lib/prisma';
import { Aluguel } from '@prisma/client';

export class AluguelRepository {
  async criarAluguel(data: Omit<Aluguel, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Aluguel> {
    
    return await prisma.aluguel.create({ data });
  }

  async buscarAluguelByImovel(imovelId: string): Promise<Aluguel[]> {
    return await prisma.aluguel.findMany({
      where: { imovelId },
      include: { imovel: true, inquilino: true, contrato: true },
    });
  }

  async findRentalsByUserId(
    inquilinoId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Aluguel[]> {
    const skip = (page - 1) * pageSize;
    return await prisma.aluguel.findMany({
      where: { inquilinoId },
      include: { imovel: true, inquilino: true, contrato: true },
      take: pageSize,
      skip,
    });
  }

  async countRentalsByUserId(inquilinoId: string): Promise<number> {
    return await prisma.aluguel.count({ where: { inquilinoId } });
  }

  async obterReservasPorProprietario(proprietarioId: string, page: number = 1,
    pageSize: number = 10): Promise<Aluguel[]> {
      const skip = (page - 1) * pageSize;
    return await prisma.aluguel.findMany({
      where: {
        imovel: {
          proprietarioId: proprietarioId,
        },
        NOT: {
          inquilinoId: proprietarioId, // Exclui os alugueis feitos pelo próprio proprietário
        },
      },
      include: {
        imovel: true, // Inclui os detalhes do imóvel
        inquilino: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
          },
        },
        
      },
      take: pageSize,
      skip,
    });
  }

  async getAlugueisByProprietario(proprietarioId: string) {
    return prisma.aluguel.findMany({
      where: { imovel: { proprietarioId } },
      include: { imovel: true, contrato: true },
    });
  }

  async getAlugueisByInquilino(inquilinoId: string) {
    return prisma.aluguel.findMany({
      where: { inquilinoId },
      include: { imovel: true, contrato: true },
    });
  }

  async getPendingAlugueis(proprietarioId: string) {
    return prisma.aluguel.findMany({
      where: { imovel: { proprietarioId }, status: "pendente" },
    });
  }

  async getAllAlugueis() {
    return prisma.aluguel.findMany({
      include: { contrato: true, imovel: true },
    });
  }
  
}
