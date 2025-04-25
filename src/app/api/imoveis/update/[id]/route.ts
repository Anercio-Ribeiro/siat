import { NextResponse } from 'next/server';
import { ImovelService } from '@/app/services/imovelService';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const imovelService = new ImovelService();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verificar autenticação com Lucia Auth
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { user } = await lucia.validateSession(sessionId);
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar imóvel para verificar permissões
    const imovel = await imovelService.encontrarImovelPorId(params.id);
    if (!imovel) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 });
    }


    // Obter dados do corpo da requisição
    const data = await request.json();

    // Validar dados
    if (
      !data.titulo ||
      !data.descricao ||
      !data.endereco ||
      !data.provincia ||
      !data.bairro ||
      !data.municipio ||
      !data.tipologia ||
      data.numeroQuarto == null ||
      data.numeroCasaBanho == null ||
      data.garagem == null ||
      data.latitude == null ||
      data.longitude == null
    ) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Atualizar imóvel
    const updatedImovel = await prisma.imovel.update({
      where: { id: params.id },
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        preco: data.preco,
        precoMensal: data.precoMensal,
        endereco: data.endereco,
        provincia: data.provincia,
        bairro: data.bairro,
        municipio: data.municipio,
        tipologia: data.tipologia,
        numeroQuarto: data.numeroQuarto,
        numeroCasaBanho: data.numeroCasaBanho,
        garagem: data.garagem,
        latitude: data.latitude,
        longitude: data.longitude,
        visualizacoes: data.visualizacoes,
        imagens: {
          deleteMany: {}, // Remove imagens existentes
          create: data.imagens.map((img: { url: string }) => ({
            url: img.url,
          })),
        },
      },
      include: {
        imagens: true,
        proprietario: {
          select: { id: true, nome: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json(updatedImovel);
  } catch (error) {
    console.error('Erro ao atualizar imóvel:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}