import { ImovelService } from '@/app/services/imovelService';
import { NextRequest, NextResponse } from 'next/server';

const imovelService = new ImovelService();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const page = parseInt(params.get('page') || '1', 10);
    const pageSize = parseInt(params.get('pageSize') || '500000', 10);
    const skip = (page - 1) * pageSize;

    // Construir filtros a partir dos parâmetros da query
    const filters: any = {
      status: true,
      latitude: { not: null },
      longitude: { not: null },
    };

    if (params.get('tipologia')) {
      filters.tipologia = { contains: params.get('tipologia'), mode: 'insensitive' };
    }
    if (params.get('municipio')) {
      filters.municipio = { contains: params.get('municipio'), mode: 'insensitive' };
    }
    if (params.get('numeroQuarto')) {
      filters.numeroQuarto = parseInt(params.get('numeroQuarto')!, 10);
    }
    if (params.get('garagem')) {
      filters.garagem = params.get('garagem') === 'true';
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
      if (params.get('precoMin')) {
        filters.preco = { gte: parseFloat(params.get('precoMin')!) };
      }
      if (params.get('precoMax')) {
        filters.preco = { lte: parseFloat(params.get('precoMax')!) };
      }
    }

    const imoveis = await imovelService.buscarOnTheMapImoveis(filters);
    const totalImoveis = await imovelService.contarImoveis(filters);

    return NextResponse.json({
      imoveis,
      totalImoveis,
      totalPages: Math.ceil(totalImoveis / pageSize),
      currentPage: page,
      status: 200,
    });
  } catch (error) {
    console.error('Erro ao buscar imóveis para o mapa:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', status: 500 },
      { status: 500 }
    );
  }
}