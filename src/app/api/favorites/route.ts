import { FavoritosService } from '@/app/services/favoritoService';
import { NextRequest, NextResponse } from 'next/server';


const favoritosService = new FavoritosService();

export async function POST(request: NextRequest) {
  try {
    const { userId, imovelId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const isFavorite = await favoritosService.toggleFavorite(userId, imovelId);
    return NextResponse.json({ isFavorite });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar favorito' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const imovelId = searchParams.get('imovelId');

    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    if (imovelId) {
      const isFavorite = await favoritosService.checkIsFavorite(userId, imovelId);
      return NextResponse.json({ isFavorite });
    }

    const favorites = await favoritosService.getUserFavorites(userId);
    return NextResponse.json({ favorites });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar favoritos' }, { status: 500 });
  }
}