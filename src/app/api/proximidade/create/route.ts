// app/api/imoveis/route.ts

import { ImovelService } from '@/app/services/imovelService';
import { ProximidadeService } from '@/app/services/proximidadeService';
import { NextResponse } from 'next/server';

const imovelService = new ImovelService();
const proximidadeService = new ProximidadeService();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { proximidades, ...imovelData } = data;

    // Criar imóvel
    const imovel = await imovelService.criarImovel(imovelData);

    // Criar proximidades
    // if (proximidades?.length > 0) {
    //   for (const proximidade of proximidades) {
    //     await proximidadeService.criarProximidade({
    //       ...proximidade,
    //       imovelId: imovel.id
    //     });
    //   }
    // }

    return NextResponse.json(imovel);
  } catch (error) {
    console.error('Erro ao criar imóvel:', error);
    return NextResponse.json(
      { error: 'Erro ao criar imóvel' },
      { status: 500 }
    );
  }
}