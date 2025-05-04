import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { ContratosService } from "@/app/services/contratoService";
import { getAuthUser } from "@/middleware";
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
  try {

    const user = await getAuthUser(req);
    const contratosService = new ContratosService();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    if (user?.role !== "INQUILINO") {
      return new Response(JSON.stringify({ error: "Acesso não autorizado" }), {
        status: 403,
      });
    }

    const response = await contratosService.getContratosByInquilinoId(user.id, page, pageSize);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    return new Response(null, { status: 500 });
  }
}