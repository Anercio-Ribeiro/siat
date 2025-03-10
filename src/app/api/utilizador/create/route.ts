import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const utilizadorService = new UtilizadorService();
    const body = await req.json();
    const { nome, username, email, senha, role, telefone } = body;

        const data = {
            nome,
            username,
            email,
            senha,
            role,
            telefone,
            criadoEm: new Date(), 
            atualizadoEm: new Date(), 
};

    try {
      const utilizador = await utilizadorService.criarUtilizador(data);
      return NextResponse.json({utilizador, status: 201});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erro ao criar utilizador', status: 400 });
    }
  }
