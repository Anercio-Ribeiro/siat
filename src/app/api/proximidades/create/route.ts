// app/api/proximidades/create/route.ts
import { ProximidadeService } from '@/app/services/proximidadeService';
import { NextResponse } from 'next/server';

const proximidadeService = new ProximidadeService();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Pass the data directly without destructuring
    const proximidade = await proximidadeService.criarProximidade(data);
    
    return NextResponse.json(proximidade);
  } catch (error) {
    console.error('Erro ao criar Proximidade:', error);
    return NextResponse.json(
      { error: 'Erro ao criar Proximidade' },
      { status: 500 }
    );
  }
}