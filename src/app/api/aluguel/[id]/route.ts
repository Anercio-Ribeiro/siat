
import { NextResponse } from "next/server";
import { RentalService } from "@/app/services/aluguelService";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const rentalService = new RentalService();
    const rental = await rentalService.getRentalDetails(params.id);
    return NextResponse.json(rental);
  } catch (error) {
    console.error("GET /api/aluguel error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao buscar detalhes do aluguel" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    const rentalService = new RentalService();
    const updatedRental = await rentalService.updateRentalStatus(params.id, status);
    return NextResponse.json(updatedRental || { message: "Aluguel cancelado e deletado com sucesso" });
  } catch (error) {
    console.error("PATCH /api/aluguel error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const rentalService = new RentalService();
    await rentalService.deleteRental(params.id);
    return NextResponse.json({ message: "Aluguel deletado com sucesso" });
  } catch (error) {
    console.error("DELETE /api/aluguel error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao deletar aluguel" },
      { status: 500 }
    );
  }
}
