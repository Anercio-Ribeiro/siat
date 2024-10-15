import { UtilizadorCustom } from '../model/type';
import { UtilizadorRepository } from '../repositories/utilizadorRepository';
import { User } from '@prisma/client';

const utilizadorRepo = new UtilizadorRepository();

export class UtilizadorService {
  async criarUtilizador(data: Omit<User, 'id'>): Promise<User> {
    return await utilizadorRepo.criarUtilizador(data);
  }

  async encontrarUtilizadorPorId(id: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorId(id);
  }

  async encontrarUtilizadorPorUsername(username: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorUsername(username);
  }

  async atualizarUtilizador(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    return await utilizadorRepo.atualizarUtilizador(id, data);
  }

  async deletarUtilizador(id: string): Promise<User> {
    return await utilizadorRepo.deletarUtilizador(id);
  }

  async listarUtilizadores(): Promise<User[]> {
    return await utilizadorRepo.listarUtilizadores();
  }

  async encontrarPrimeiroUtilizadorId(): Promise<string | null> {
    try {
      const id = await utilizadorRepo.encontrarPrimeiroUtilizador();
      return id;
    } catch (error) {
      console.error("Error in service:", error);
      return null;
    }

};

}
