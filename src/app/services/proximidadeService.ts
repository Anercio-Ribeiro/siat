import { ProximidadeRepository } from '../repositories/proximidadeRepository';
import { Proximidade } from '@prisma/client';

const proximidadeRepo = new ProximidadeRepository();

export class ProximidadeService {
  // async criarProximidade(data: Omit<Proximidade, 'id'>): Promise<Proximidade> {
  //   // Adicione aqui a lógica de negócios que desejar
  //   return await proximidadeRepo.criarProximidade(data);
  // }

  async encontrarProximidadePorId(id: string): Promise<Proximidade | null> {
    return await proximidadeRepo.encontrarProximidadePorId(id);
  }

  async atualizarProximidade(id: string, data: Partial<Omit<Proximidade, 'id'>>): Promise<Proximidade> {
    return await proximidadeRepo.atualizarProximidade(id, data);
  }

  async deletarProximidade(id: string): Promise<Proximidade> {
    return await proximidadeRepo.deletarProximidade(id);
  }

  async listarProximidades(): Promise<Proximidade[]> {
    return await proximidadeRepo.listarProximidades();
  }
}
