import { AluguelRepository } from "@/app/repositories/aluguelRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const imovelId = searchParams.get('imovelId');
      console.log(imovelId);
      
      if (!imovelId) {
        return NextResponse.json({ error: 'ImovelId é obrigatório' }, { status: 400 });
      }
  
      const alugueis = await AluguelRepository.getAlugueisByImovelId(imovelId);
      return NextResponse.json(alugueis);
    } catch (error) {
      return NextResponse.json({ error: 'Erro ao buscar alugueis' }, { status: 500 });
    }
  }