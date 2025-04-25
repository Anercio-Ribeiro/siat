import { Aluguel } from '@prisma/client';
import { AluguelRepository } from '@/app/repositories/aluguelRepository';
import { prisma } from '@/lib/prisma';
import { calculateDistance } from '../utils/distance';

export class RentalService {
  private rentalRepository = new AluguelRepository();

  async createRental(data: Omit<Aluguel, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Aluguel> {
    const aluguel = await this.rentalRepository.criarAluguel(data);
    const imovel = await prisma.imovel.findUnique({
      where: { id: data.imovelId },
      select: { latitude: true, longitude: true },
    });

    if (!imovel) {
      throw new Error("Imóvel não encontrado");
    }

    const proximidades = await prisma.proximidade.findMany({
      select: { id: true, latitude: true, longitude: true },
    });

    const proximidadesProximas = proximidades
      .map((prox) => {
        const distancia = calculateDistance(
          imovel.latitude,
          imovel.longitude,
          prox.latitude,
          prox.longitude
        );
        return { proximidadeId: prox.id, distancia };
      })
      .filter((item) => item.distancia <= 4);

    if (proximidadesProximas.length > 0) {
      await prisma.proximidadeImovel.createMany({
        data: proximidadesProximas.map((prox) => ({
          imovelId: data.imovelId,
          proximidadeId: prox.proximidadeId,
          distancia: prox.distancia,
        })),
        skipDuplicates: true,
      });
    }

    return aluguel;
  }

  async getRentalsByProperty(imovelId: string): Promise<Aluguel[]> {
    return await this.rentalRepository.buscarAluguelByImovel(imovelId);
  }

  async getRentalsByUserId(userId: string, page: number, pageSize: number) {
    return await this.rentalRepository.findRentalsByUserId(userId, page, pageSize);
  }

  async getTotalRentalsByUserId(userId: string): Promise<number> {
    return await this.rentalRepository.countRentalsByUserId(userId);
  }

  async listarReservasPorProprietario(proprietarioId: string): Promise<Aluguel[]> {
    if (!proprietarioId) {
      throw new Error("O ID do proprietário é obrigatório.");
    }
    return await this.rentalRepository.obterReservasPorProprietario(proprietarioId);
  }

  async updateRentalStatus(aluguelId: string, status: string): Promise<Aluguel | null> {
    const validStatuses = ["pendente", "em aluguel", "cancelado", "concluído"];
    if (!validStatuses.includes(status)) {
      throw new Error("Status inválido");
    }

    const rental = await this.rentalRepository.findRentalById(aluguelId);
    if (!rental) {
      throw new Error("Aluguel não encontrado");
    }

    if (rental.status !== "pendente" && status === "pendente") {
      throw new Error("Não é possível reverter para 'pendente'");
    }

    const updatedRental = await this.rentalRepository.updateRentalStatus(aluguelId, status);

    if (status === "cancelado") {
      await this.deleteRental(aluguelId);
      return null; // Indicate deletion
    }

    return updatedRental;
  }

  async getRentalDetails(aluguelId: string): Promise<Aluguel> {
    const rental = await this.rentalRepository.findRentalById(aluguelId);
    if (!rental) {
      throw new Error("Aluguel não encontrado");
    }
    return rental;
  }

  async deleteRental(aluguelId: string): Promise<void> {
    const rental = await this.rentalRepository.findRentalById(aluguelId);
    if (!rental) {
      throw new Error("Aluguel não encontrado");
    }

    await prisma.contrato.deleteMany({
      where: { aluguelId },
    });

    await this.rentalRepository.deletarAluguel(aluguelId);
  }
}