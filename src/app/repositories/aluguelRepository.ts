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

  // async buscarAluguelByUserId(inquilinoId: string): Promise<Aluguel[]> {
  //   return await prisma.aluguel.findMany({
  //     where: { inquilinoId },
  //     include: { imovel: true, inquilino: true, contrato: true },
  //   });
  // }


  // async buscarAluguelByUserId(
  //   inquilinoId: string,
  //   page: number = 1,
  //   pageSize: number = 10
  // ): Promise<Aluguel[]> {
  //   return await prisma.aluguel.findMany({
  //     where: { inquilinoId },
  //     include: { imovel: true, inquilino: true, contrato: true },
  //     take: pageSize, // Número de registros por página
  //     skip: (page - 1) * pageSize, // Pular registros conforme a página
  //   });
  // }

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
  
}
