// import { NextResponse } from 'next/server';
// import { ImovelService } from '@/app/services/imovelService';

// const imovelService = new ImovelService();

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const imovel = await imovelService.encontrarImovelPorId(params.id);
//     if (!imovel) {
//       return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 });
//     }
//     return NextResponse.json(imovel);
//   } catch (error) {
//     console.error('Erro ao buscar imóvel:', error);
//     return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { ImovelService } from '@/app/services/imovelService';

const imovelService = new ImovelService();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const imovel = await imovelService.encontrarImovelPorId(params.id);
    if (!imovel) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 });
    }
    return NextResponse.json(imovel);
  } catch (error) {
    console.error('Erro ao buscar imóvel:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}