// // import { NextApiRequest, NextApiResponse } from "next";
// // import { PrismaClient } from "@prisma/client";
// // import { NextRequest, NextResponse } from "next/server";
// // import { getAuthUser } from "@/middleware";

// // const prisma = new PrismaClient();

// // export  async function GET(req: NextRequest, res: NextResponse) {
// //   const { tipo, year } = req.nextUrl.searchParams; // Obtendo os parâmetros da URL
// //   const user = await getAuthUser(req); // Supondo um middleware de autenticação
// //   if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" });

// //   const startDate = new Date(`${year}-01-01`);
// //   const endDate = new Date(`${year}-12-31`);

// //   switch (tipo) {
// //     case "preco-por-zona":
// //       const precoZona = await prisma.imovel.groupBy({
// //         by: ["provincia"],
// //         _min: { preco: true },
// //         _max: { preco: true },
// //         _avg: { preco: true },
// //         where: { criadoEm: { gte: startDate, lte: endDate } },
// //       });
// //       return res.json(precoZona.map(p => ({
// //         zona: p.provincia,
// //         precoMin: p._min.preco || 0,
// //         precoMax: p._max.preco || 0,
// //         precoMedio: p._avg.preco || 0,
// //       })));

// //     case "proximidades":
// //       const proximidades = await prisma.proximidadeImovel.groupBy({
// //         by: ["proximidadeId"],
// //         _count: { id: true },
// //         where: { imovel: { criadoEm: { gte: startDate, lte: endDate } } },
// //       });
// //       const proximidadesFull = await prisma.proximidade.findMany({
// //         where: { id: { in: proximidades.map(p => p.proximidadeId) } },
// //       });
// //       return res.json(proximidades.map(p => ({
// //         tipo: proximidadesFull.find(prox => prox.id === p.proximidadeId)?.tipo || "Desconhecido",
// //         count: p._count.id,
// //       })));

// //     case "alugueis-por-mes":
// //       const alugueisPorMes = await prisma.aluguel.groupBy({
// //         by: ["criadoEm"],
// //         _count: { id: true },
// //         where: { criadoEm: { gte: startDate, lte: endDate } },
// //       });
// //       return res.json(alugueisPorMes.map(a => ({
// //         mes: new Date(a.criadoEm).toLocaleString("pt", { month: "short" }),
// //         count: a._count.id,
// //       })));

// //     case "zonas-populares":
// //       const zonasPopulares = await prisma.aluguel.groupBy({
// //         by: ["imovelId"],
// //         _count: { id: true },
// //         where: { criadoEm: { gte: startDate, lte: endDate } },
// //       });
// //       const imoveis = await prisma.imovel.findMany({
// //         where: { id: { in: zonasPopulares.map(z => z.imovelId) } },
// //       });
// //       return res.json(zonasPopulares.map(z => ({
// //         zona: imoveis.find(i => i.id === z.imovelId)?.provincia || "Desconhecido",
// //         count: z._count.id,
// //       })));

// //     default:
// //       return res.status(400).json({ error: "Tipo inválido" });
// //   }
// // }




// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { tipo, year } = req.query;
//   const user = await getUser(req); // Supondo um middleware de autenticação
//   if (!user || user.role !== "ADMIN") return res.status(403).json({ error: "Acesso negado" });

//   const startDate = new Date(`${year}-01-01`);
//   const endDate = new Date(`${year}-12-31`);

//   switch (tipo) {
//     case "preco-por-zona":
//       const precoZona = await prisma.imovel.groupBy({
//         by: ["provincia"],
//         _min: { preco: true },
//         _max: { preco: true },
//         _avg: { preco: true },
//         where: { criadoEm: { gte: startDate, lte: endDate } },
//       });
//       return res.json(precoZona.map(p => ({
//         zona: p.provincia,
//         precoMin: p._min.preco || 0,
//         precoMax: p._max.preco || 0,
//         precoMedio: p._avg.preco || 0,
//       })));

//     case "proximidades":
//       const proximidades = await prisma.proximidadeImovel.groupBy({
//         by: ["proximidadeId"],
//         _count: { id: true },
//         where: { imovel: { criadoEm: { gte: startDate, lte: endDate } } },
//       });
//       const proximidadesFull = await prisma.proximidade.findMany({
//         where: { id: { in: proximidades.map(p => p.proximidadeId) } },
//       });
//       return res.json(proximidades.map(p => ({
//         tipo: proximidadesFull.find(prox => prox.id === p.proximidadeId)?.tipo || "Desconhecido",
//         count: p._count.id,
//       })));

//     case "alugueis-por-mes":
//       const alugueisPorMes = await prisma.aluguel.groupBy({
//         by: ["criadoEm"],
//         _count: { id: true },
//         where: { criadoEm: { gte: startDate, lte: endDate } },
//       });
//       return res.json(alugueisPorMes.map(a => ({
//         mes: new Date(a.criadoEm).toLocaleString("pt", { month: "short" }),
//         count: a._count.id,
//       })));

//     case "zonas-populares":
//       const zonasPopulares = await prisma.aluguel.groupBy({
//         by: ["imovelId"],
//         _count: { id: true },
//         where: { criadoEm: { gte: startDate, lte: endDate } },
//       });
//       const imoveis = await prisma.imovel.findMany({
//         where: { id: { in: zonasPopulares.map(z => z.imovelId) } },
//       });
//       return res.json(zonasPopulares.map(z => ({
//         zona: imoveis.find(i => i.id === z.imovelId)?.provincia || "Desconhecido",
//         count: z._count.id,
//       })));

//     default:
//       return res.status(400).json({ error: "Tipo inválido" });
//   }
// }