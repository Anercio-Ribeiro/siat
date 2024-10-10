import { UtilizadorCustom } from '../model/type';
import { UtilizadorRepository } from '../repositories/utilizadorRepository';
import { Utilizador } from '@prisma/client';

const utilizadorRepo = new UtilizadorRepository();

export class UtilizadorService {
  async criarUtilizador(data: Omit<Utilizador, 'id'>): Promise<Utilizador> {
    return await utilizadorRepo.criarUtilizador(data);
  }

  async encontrarUtilizadorPorId(id: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorId(id);
  }

  async encontrarUtilizadorPorUsername(username: string): Promise<UtilizadorCustom | null> {
    return await utilizadorRepo.encontrarUtilizadorPorUsername(username);
  }

  async atualizarUtilizador(id: string, data: Partial<Omit<Utilizador, 'id'>>): Promise<Utilizador> {
    return await utilizadorRepo.atualizarUtilizador(id, data);
  }

  async deletarUtilizador(id: string): Promise<Utilizador> {
    return await utilizadorRepo.deletarUtilizador(id);
  }

  async listarUtilizadores(): Promise<Utilizador[]> {
    return await utilizadorRepo.listarUtilizadores();
  }

  async encontrarPrimeiroUtilizadorId(): Promise<string | null> {
    try {
      const id = await utilizadorRepo.encontrarPrimeiroUtilizador();
      return id; // Return the ID fetched from the repository
    } catch (error) {
      console.error("Error in service:", error);
      return null; // Handle errors appropriately
    }

};

}
