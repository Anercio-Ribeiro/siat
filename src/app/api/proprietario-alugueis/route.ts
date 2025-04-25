import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers"; // Note: This is for App Router; adjust if using Pages Router
import { lucia } from "@/lib/lucia"; // Ensure lucia is configured
import { AluguelRepository } from "@/app/repositories/aluguelRepository";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {

  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Validate session using cookies (adjust for Pages Router if needed)
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return new Response(null, { status: 401 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      cookies().delete(lucia.sessionCookieName);
      return new Response(null, { status: 401 });
    }

    const proprietarioId = user.id;
    const rentalRepo = new AluguelRepository();

    // Fetch rentals and total count
    const rentals = await rentalRepo.obterReservasPorProprietario(proprietarioId, page, pageSize);
    const total = await prisma.aluguel.count({
      where: {
        imovel: { proprietarioId },
        NOT: { inquilinoId: proprietarioId },
      },
    });
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      rentals,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Erro ao obter aluguéis do proprietário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" });
  }
}