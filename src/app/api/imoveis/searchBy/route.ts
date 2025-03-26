

import { ImovelService } from '@/app/services/imovelService';
import { NextRequest, NextResponse } from 'next/server';

const imovelService = new ImovelService(); // Instancia o serviço

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = url.searchParams; // Usa diretamente searchParams

  const filters: any = {};

  if (params.get('tipologia')) {
    filters.tipologia = { contains: params.get('tipologia'), mode: 'insensitive' };
  }
  if (params.get('municipio')) {
    filters.municipio = { contains: params.get('municipio'), mode: 'insensitive' };
  }
  if (params.get('numeroQuarto')) {
    filters.numeroQuarto = { contains: params.get('numeroQuarto'), mode: 'insensitive' };
  }
  if (params.get('garagem')) {
    filters.garagem = { contains: params.get('garagem'), mode: 'insensitive' };
  }
  if (params.get('provincia')) {
    filters.provincia = { contains: params.get('provincia'), mode: 'insensitive' };
  }
  if (params.get('bairro')) {
    filters.bairro = { contains: params.get('bairro'), mode: 'insensitive' };
  }
  if (params.get('precoMin') && params.get('precoMax')) {
    filters.preco = {
      gte: parseFloat(params.get('precoMin')!),
      lte: parseFloat(params.get('precoMax')!),
    };
  } else {
    if (params.get('precoMin')) filters.preco = { gte: parseFloat(params.get('precoMin')!) };
    if (params.get('precoMax')) filters.preco = { lte: parseFloat(params.get('precoMax')!) };
  }

  const pageNumber = params.get('page') ? parseInt(params.get('page')!, 10) : 1;
  const pageSize = 8;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const imoveis = await imovelService.buscarImoveisBy(filters, skip, pageSize);
    const totalImoveis = await imovelService.contarImoveis(filters);

    return NextResponse.json({
      imoveis,
      totalImoveis,
      totalPages: Math.ceil(totalImoveis / pageSize),
      currentPage: pageNumber,
      status: 200
    });
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return NextResponse.json({ message: 'Erro interno no servidor', status: 500 });
  }
}
