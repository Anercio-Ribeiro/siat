import { ImovelRepository } from '../repositories/imovelRepository';
import { Imovel } from '@prisma/client';

const imovelRepo = new ImovelRepository();

export class ImovelService {
  async criarImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {

    return await imovelRepo.criarImovel(data);
  }

  async encontrarImovelPorId(id: string): Promise<Imovel | null> {
    return await imovelRepo.encontrarImovelPorId(id);
  }

  async atualizarImovel(id: string, data: Partial<Omit<Imovel, 'id'>>): Promise<Imovel> {
    return await imovelRepo.atualizarImovel(id, data);
  }

  async deletarImovel(id: string): Promise<Imovel> {
    return await imovelRepo.deletarImovel(id);
  }

  async listarImoveis(): Promise<Imovel[]> {
    return await imovelRepo.listarImoveis();
  }

  async encontrarPrimeiroImovel(): Promise<Imovel | null> {
    return await imovelRepo.encontrarPrimeiroImovel();
  }
}
