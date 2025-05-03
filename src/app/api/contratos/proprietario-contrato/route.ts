import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { ContratosService } from "@/app/services/contratoService";
import { getAuthUser } from "@/middleware";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    const contratosService = new ContratosService();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    // const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    // if (!sessionId) {
    //   return new Response(null, { status: 401 });
    // }

    // const { session, user } = await lucia.validateSession(sessionId);
    // if (!session) {
    //   cookies().delete(lucia.sessionCookieName);
    //   return new Response(null, { status: 401 });
    // }

    if (!user || user.role !== "PROPRIETARIO") {
      return new Response(JSON.stringify({ error: "Acesso não autorizado" }), {
        status: 403,
      });
    }

    const response = await contratosService.getContratosByProprietarioId(user.id, page, pageSize);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar contratos:", error);
    return new Response(null, { status: 500 });
  }
}