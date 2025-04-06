import { NextApiRequest, NextApiResponse } from "next";
import { getAuthUser } from "@/middleware";
import { DashboardInquilinoService } from "@/app/services/dashboardInquilinoService";
import { NextRequest, NextResponse } from "next/server";
import { TipoAluguel } from "@prisma/client";


// export async function GET(req: NextRequest, res: NextResponse) {
//   const user = await getAuthUser(req);
//   if (!user || user.role !== "INQUILINO") {
//     return NextResponse.json({ error: "Acesso negado" , status: 403 });
//   }

//   const service = new DashboardInquilinoService();
//   const globalStats = await service.getStats(user.id, TipoAluguel.RESIDENCIAL);
//   const inquilinoStats = await service.getInquilinoStats(user.id);
//   return NextResponse.json({ ...globalStats, ...inquilinoStats });
// }





// export async function GET(req: NextRequest, res: NextResponse) {
//     const user = await getAuthUser(req);
//     if (!user || user.role !== "INQUILINO") {
//       return NextResponse.json({ error: "Acesso negado" });
//     }
//     //const { tipoAluguel } = req.query;
//     const service = new DashboardInquilinoService();
//     const globalStats = await service.getStats(user.id, TipoAluguel.RESIDENCIAL || TipoAluguel.TURISTICO );
//     const inquilinoStats = await service.getInquilinoStats(user.id, TipoAluguel.RESIDENCIAL || TipoAluguel.TURISTICO);
//     return NextResponse.json({ ...globalStats, ...inquilinoStats });
//   }







// Supondo um middleware de autenticação
// import { DashboardProprietarioService } from "@/app/services/dashboardProprietarioService";

// export async function GET(req: NextRequest, res: NextResponse) {
//   const user = await getAuthUser(req);
//   if (!user || user.role !== "PROPRIETARIO") {
//     return NextResponse.json({ error: "Acesso negado" });
//   }
//   const tipoAluguel = req.nextUrl.searchParams.get('tipoAluguel');
//   if (!tipoAluguel || !["TURISTICO", "RESIDENCIAL"].includes(tipoAluguel)) {
//     return NextResponse.json({ error: "Tipo de aluguel inválido" });
//   }
//   const service = new DashboardProprietarioService();
//   const stats = await service.getStats(user.id, tipoAluguel as "TURISTICO" | "RESIDENCIAL");
//   return NextResponse.json(stats);
// }








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