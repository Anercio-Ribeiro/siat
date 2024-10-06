import { ImovelService } from '@/app/services/imovelService';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const imovelService = new ImovelService();
    const imovel = await imovelService.encontrarImovelPorId(id);

    if (!imovel) {
      return NextResponse.json({ error: 'Imovel não encontrado', status: 404 });
    }

    // Remover o campo proprietarioId do retorno
    const { proprietarioId, ...imovelSemProprietarioId } = imovel;

    return NextResponse.json({ imovel: imovelSemProprietarioId, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao encontrar Imovel', status: 500 });
  }
}
