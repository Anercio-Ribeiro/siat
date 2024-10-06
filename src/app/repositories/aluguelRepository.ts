// src/repositories/aluguelRepository.ts
import { prisma } from '@/lib/prisma';
import { Aluguel } from '@prisma/client';


export class AluguelRepository {
  async criarAluguel(data: Omit<Aluguel, 'id'>): Promise<Aluguel> {
    return await prisma.aluguel.create({
      data,
    });
  }

  async encontrarAluguelPorId(id: string): Promise<Aluguel | null> {
    return await prisma.aluguel.findUnique({
      where: { id },
    });
  }

  async atualizarAluguel(id: string, data: Partial<Omit<Aluguel, 'id'>>): Promise<Aluguel> {
    return await prisma.aluguel.update({
      where: { id },
      data,
    });
  }

  async deletarAluguel(id: string): Promise<Aluguel> {
    return await prisma.aluguel.delete({
      where: { id },
    });
  }

  async listarAlugueis(): Promise<Aluguel[]> {
    return await prisma.aluguel.findMany();
  }
}
