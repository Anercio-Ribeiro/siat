import { NextApiRequest, NextApiResponse } from "next";
import { getAuthUser } from "@/middleware";
import { DashboardInquilinoService } from "@/app/services/dashboardInquilinoService";
import { NextRequest, NextResponse } from "next/server";
import { TipoAluguel } from "@prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await getAuthUser(req);
  if (!user || user.role !== "INQUILINO") {
    return NextResponse.json({ error: "Acesso negado" });
  }
  const tipoAluguel = req.nextUrl.searchParams.get('tipoAluguel');
  if (!tipoAluguel || !["TURISTICO", "RESIDENCIAL"].includes(tipoAluguel as string)) {
    return NextResponse.json({ error: "Tipo de aluguel inválido" });
  }
  const service = new DashboardInquilinoService();
  const globalStats = await service.getStats(tipoAluguel as "TURISTICO" | "RESIDENCIAL");
  const inquilinoStats = await service.getInquilinoStats(user.id, tipoAluguel as "TURISTICO" | "RESIDENCIAL");
  return NextResponse.json({ ...globalStats, ...inquilinoStats });
}