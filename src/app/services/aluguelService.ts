
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
}
