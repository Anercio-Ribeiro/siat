import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const utilizadorService = new UtilizadorService();
    const utilizadorDeletado = await utilizadorService.deletarUtilizador(id);

    return NextResponse.json({ message: 'Utilizador deletado com sucesso', utilizador: utilizadorDeletado, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao deletar utilizador', status: 500 });
  }
}
