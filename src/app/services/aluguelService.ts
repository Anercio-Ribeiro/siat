import { AluguelRepository } from '../repositories/aluguelRepository';
import { Aluguel } from '@prisma/client';

const aluguelRepo = new AluguelRepository();

export class AluguelService {
  async criarAluguel(data: Omit<Aluguel, 'id'>): Promise<Aluguel> {
    // Adicione aqui a lógica de negócios que desejar
    return await aluguelRepo.criarAluguel(data);
  }

  async encontrarAluguelPorId(id: string): Promise<Aluguel | null> {
    return await aluguelRepo.encontrarAluguelPorId(id);
  }

  async atualizarAluguel(id: string, data: Partial<Omit<Aluguel, 'id'>>): Promise<Aluguel> {
    return await aluguelRepo.atualizarAluguel(id, data);
  }

  async deletarAluguel(id: string): Promise<Aluguel> {
    return await aluguelRepo.deletarAluguel(id);
  }

  async listarAlugueis(): Promise<Aluguel[]> {
    return await aluguelRepo.listarAlugueis();
  }
}
