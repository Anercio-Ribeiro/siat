import { RentalService } from "@/app/services/aluguelService";
import { NextRequest, NextResponse } from "next/server";


const aluguelService = new RentalService();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const proprietarioId = url.searchParams.get("proprietarioId");

    if (!proprietarioId) {
      return NextResponse.json({ erro: "O ID do proprietário é obrigatório." }, { status: 400 });
    }

    const reservas = await aluguelService.listarReservasPorProprietario(proprietarioId);
    return NextResponse.json(reservas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: "Erro ao buscar reservas." }, { status: 500 });
  }
}
