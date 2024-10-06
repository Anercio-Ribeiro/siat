import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  
  try {
    const utilizadorService = new UtilizadorService();
    console.log(body)
    console.log(id)

    const utilizadorAtualizado = await utilizadorService.atualizarUtilizador(id, body);
    
    return NextResponse.json({ utilizador: utilizadorAtualizado, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao atualizar utilizador', status: 400 });
  }
}
