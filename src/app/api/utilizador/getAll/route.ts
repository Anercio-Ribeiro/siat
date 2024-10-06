import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';


export async function GET() {

  const utilizadorService = new UtilizadorService();
  try {
    const utilizadores = await utilizadorService.listarUtilizadores();
    return NextResponse.json({ utilizadores, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao listar utilizadores', status: 500 });
  }
}
