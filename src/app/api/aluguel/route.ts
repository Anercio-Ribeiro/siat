
import { NextRequest, NextResponse } from "next/server";
import { RentalService } from "@/app/services/aluguelService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      imovelId,
      inquilinoId,
      checkIn,
      checkOut,
      periodoAluguel,
      status,
      tipoAluguel,
      valorTotal,
    } = body;

    if (!imovelId || !inquilinoId || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const rentalService = new RentalService();
    const aluguel = await rentalService.createRental({
      imovelId,
      inquilinoId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      periodoAluguel,
      status,
      valorTotal,
      tipoAluguel,
    });

    return NextResponse.json(aluguel, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar aluguel:", error);
    return NextResponse.json({ error: "Erro ao criar aluguel" }, { status: 500 });
  }
}

// Mantém o GET existente
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imovelId = searchParams.get("imovelId");

    if (!imovelId) {
      return NextResponse.json({ error: "ImovelId é obrigatório" }, { status: 400 });
    }

    const rentalService = new RentalService();
    const alugueis = await rentalService.getRentalsByProperty(imovelId);

    console.log("Detalhe do imovel"+alugueis)
    return NextResponse.json(alugueis);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar alugueis" }, { status: 500 });
  }
}