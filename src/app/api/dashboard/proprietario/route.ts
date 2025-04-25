import { NextApiRequest, NextApiResponse } from "next";
import { getAuthUser } from "@/middleware"; // Supondo um middleware de autenticação
import { NextRequest, NextResponse } from "next/server";
import { DashboardProprietarioService } from "@/app/services/dashboardProprietarioService";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await getAuthUser(req);
  if (!user || user.role !== "PROPRIETARIO") {
    return NextResponse.json({ error: "Acesso negado" });
  }

  const tipoAluguel = req.nextUrl.searchParams.get('tipoAluguel');
  if (!tipoAluguel || !["TURISTICO", "RESIDENCIAL"].includes(tipoAluguel as string)) {
    return NextResponse.json({ error: "Tipo de aluguel inválido" });
  }

  const service = new DashboardProprietarioService();
  const stats = await service.getStats(user.id, tipoAluguel as "TURISTICO" | "RESIDENCIAL");
  return NextResponse.json(stats);
}