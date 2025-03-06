
import { Aluguel } from '@prisma/client';
import { AluguelRepository } from '@/app/repositories/aluguelRepository';

export class RentalService {
  private rentalRepository = new AluguelRepository();

  async createRental(data: Omit<Aluguel, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Aluguel> {
    return await this.rentalRepository.criarAluguel(data);
  }

  async getRentalsByProperty(imovelId: string): Promise<Aluguel[]> {
    return await this.rentalRepository.buscarAluguelByImovel(imovelId);
  }

  // async getRentalsByUserId(userId: string): Promise<Aluguel[]> {
  //   return await this.rentalRepository.buscarAluguelByUserId(userId);
  // }

  // async getRentalsByUserId(userId: string, page: number, pageSize: number): Promise<Aluguel[]> {
  //   return await this.rentalRepository.buscarAluguelByUserId(userId, page, pageSize);
  // }

  async getRentalsByUserId(userId: string, page: number, pageSize: number) {
    return await this.rentalRepository.findRentalsByUserId(userId, page, pageSize);
  }

  async getTotalRentalsByUserId(userId: string): Promise<number> {
    return await this.rentalRepository.countRentalsByUserId(userId);
  }
  
}
