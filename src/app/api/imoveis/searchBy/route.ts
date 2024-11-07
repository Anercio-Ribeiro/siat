// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // Usa URLSearchParams para capturar os parâmetros da query
//   const url = new URL(req.url!, `http://${req.headers.host}`);
//   const params = new URLSearchParams(url.search);

//   // Desestruturando os parâmetros da URL usando URLSearchParams
//   const bairro = params.get('bairro');
//   const precoMin = params.get('precoMin');
//   const precoMax = params.get('precoMax');
//   const tipologia = params.get('tipologia');
//   const page = params.get('page');

//   // Inicializa o objeto de filtros
//   const filters: any = {};

//   // Filtro de bairro
//   if (bairro) {
//     filters.bairro = { contains: bairro, mode: 'insensitive' };
//   }

//   // Filtro de precoMin e precoMax (faixa de preço)
//   if (precoMin && precoMax) {
//     // Se ambos os valores de preço foram passados, buscamos imóveis dentro do intervalo
//     filters.preco = {
//       gte: parseFloat(precoMin), // Maior ou igual ao preço mínimo
//       lte: parseFloat(precoMax), // Menor ou igual ao preço máximo
//     };
//   } else {
//     // Caso um dos parâmetros de preço seja passado, aplicamos o filtro correspondente
//     if (precoMin) filters.preco = { gte: parseFloat(precoMin) }; // Maior ou igual ao preço mínimo
//     if (precoMax) filters.preco = { lte: parseFloat(precoMax) }; // Menor ou igual ao preço máximo
//   }

//   // Filtro de tipologia
//   if (tipologia) {
//     filters.tipologia = { contains: tipologia, mode: 'insensitive' };
//   }

//   // Paginação
//   const pageNumber = page ? parseInt(page, 10) : 1;
//   const pageSize = 10;
//   const skip = (pageNumber - 1) * pageSize;

//   try {
//     // Consulta os imóveis com os filtros e paginação
//     const imoveis = await prisma.imovel.findMany({
//       where: filters,
//       skip,
//       take: pageSize,
//     });

//     // Conta o total de imóveis para a paginação
//     const totalImoveis = await prisma.imovel.count({ where: filters });

//     // Retorna os dados com a paginação
//     return NextResponse.json({
//       imoveis,
//       totalImoveis,
//       totalPages: Math.ceil(totalImoveis / pageSize),
//       currentPage: pageNumber,
//     });
//   } catch (error) {
//     console.error('Erro ao buscar imóveis:', error);
//     return NextResponse.json({ message: 'Erro interno no servidor' });
//   }
// }




import { ImovelService } from '@/app/services/imovelService';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const imovelService = new ImovelService(); // Instancia o serviço

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Usa URLSearchParams para capturar os parâmetros da query
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const params = new URLSearchParams(url.search);

  // Desestruturando os parâmetros da URL usando URLSearchParams
  const bairro = params.get('bairro');
  const precoMin = params.get('precoMin');
  const precoMax = params.get('precoMax');
  const tipologia = params.get('tipologia');
  const page = params.get('page');

  // Inicializa o objeto de filtros
  const filters: any = {};

  // Filtro de bairro
  if (bairro) {
    filters.bairro = { contains: bairro, mode: 'insensitive' };
  }

  // Filtro de precoMin e precoMax (faixa de preço)
  if (precoMin && precoMax) {
    filters.preco = {
      gte: parseFloat(precoMin), // Maior ou igual ao preço mínimo
      lte: parseFloat(precoMax), // Menor ou igual ao preço máximo
    };
  } else {
    if (precoMin) filters.preco = { gte: parseFloat(precoMin) }; // Maior ou igual ao preço mínimo
    if (precoMax) filters.preco = { lte: parseFloat(precoMax) }; // Menor ou igual ao preço máximo
  }

  // Filtro de tipologia
  if (tipologia) {
    filters.tipologia = { contains: tipologia, mode: 'insensitive' };
  }

  // Paginação
  const pageNumber = page ? parseInt(page, 10) : 1;
  const pageSize = 8;
  const skip = (pageNumber - 1) * pageSize;

  try {
    // Chama os métodos do serviço para buscar os imóveis e contar o total
    const imoveis = await imovelService.buscarImoveisBy(filters, skip, pageSize);
    const totalImoveis = await imovelService.contarImoveis(filters);

    // Retorna os dados com a paginação
    return NextResponse.json({
      imoveis,
      totalImoveis,
      totalPages: Math.ceil(totalImoveis / pageSize),
      currentPage: pageNumber,
     status: 200});
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return NextResponse.json({ message: 'Erro interno no servidor', status: 500 });
  }
}
