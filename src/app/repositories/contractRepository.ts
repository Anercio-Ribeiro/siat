import { prisma } from "@/lib/prisma";
import { PrismaClient, Contrato, Aluguel } from "@prisma/client";

export class ContractRepository {
  // Criar um contrato
  async createContract(data: {
    aluguelId: string;
    dataInicio: Date;
    dataFim: Date;
    valorTotal: number;
    termosContrato: string;
    urlDocumento?: string;
  }): Promise<Contrato> {
    return await prisma.contrato.create({
      data,
    });
  }

  // Buscar contrato por ID
  async findContractById(id: string): Promise<Contrato | null> {
    return await prisma.contrato.findUnique({
      where: { id },
    });
  }

  // Buscar contrato por aluguelId
  async findContractByAluguelId(aluguelId: string): Promise<Contrato | null> {
    return await prisma.contrato.findUnique({
      where: { aluguelId },
    });
  }

  // Atualizar contrato
  async updateContract(
    id: string,
    data: {
      dataInicio?: Date;
      dataFim?: Date;
      valorTotal?: number;
      termosContrato?: string;
      urlDocumento?: string;
    }
  ): Promise<Contrato> {
    return await prisma.contrato.update({
      where: { id },
      data,
    });
  }

  // Deletar contrato
  async deleteContract(id: string): Promise<Contrato> {
    return await prisma.contrato.delete({
      where: { id },
    });
  }

  // Atualizar status do aluguel (mantido para integração)
  async updateRentalStatus(aluguelId: string, status: string): Promise<Aluguel> {
    return await prisma.aluguel.update({
      where: { id: aluguelId },
      data: { status },
      include: { imovel: true, inquilino: true, contrato: true },
    });
  }

  // Buscar aluguel por ID
  async findRentalById(aluguelId: string): Promise<Aluguel | null> {
    return await prisma.aluguel.findUnique({
      where: { id: aluguelId },
      include: { imovel: true, inquilino: true, contrato: true },
    });
  }
}