import { UtilizadorService } from '@/app/services/utilizadorService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const utilizadorService = new UtilizadorService();
    const body = await req.json();
    const { nome, username, email, senha, role, telefone, picture, estado } = body;

        const data = {
            nome,
            username,
            email,
            senha,
            role,
            telefone,
            picture,
            estado: true,
            criadoEm: new Date(), 
            atualizadoEm: new Date(), 
};

    try {
      const utilizador = await utilizadorService.criarUtilizador(data);
      if (utilizador.telefone ==  telefone) {
        return NextResponse.json({ error: 'Este número já está cadastrado', status: 400 });
      }
      return NextResponse.json({utilizador, status: 201});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erro ao criar utilizador', status: 400 });
    }
  }
