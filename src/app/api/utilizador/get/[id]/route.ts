import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const utilizadorService = new UtilizadorService();
    const utilizador = await utilizadorService.encontrarUtilizadorPorId(id);

    if (!utilizador) {
      return NextResponse.json({ error: 'Utilizador não encontrado', status: 404 });
    }

    return NextResponse.json({ utilizador, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao encontrar utilizador', status: 500 });
  }
}

