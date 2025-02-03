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
}
