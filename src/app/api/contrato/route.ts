// // src/app/api/contrato/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// export async function POST(req: NextRequest) {
//   const { aluguelId, dataInicio, dataFim, valorTotal, termosContrato } = await req.json();

//   if (!aluguelId || !dataInicio || !dataFim || !valorTotal || !termosContrato) {
//     return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
//   }

//   try {
//     // Buscar o aluguel para obter dados
//     const rental = await prisma.aluguel.findUnique({
//       where: { id: aluguelId },
//       include: {
//         imovel: { include: { proprietario: true } },
//         inquilino: true,
//         contrato: true,
//       },
//     });

//     if (!rental) {
//       return NextResponse.json({ error: "Aluguel não encontrado" }, { status: 404 });
//     }

//     if (rental.contrato) {
//       return NextResponse.json({ error: "Já existe um contrato para este aluguel" }, { status: 400 });
//     }

//     // Criar o contrato no banco
//     const contract = await prisma.contrato.create({
//       data: {
//         aluguelId,
//         dataInicio: new Date(dataInicio),
//         dataFim: new Date(dataFim),
//         valorTotal: parseFloat(valorTotal),
//         termosContrato,
//         urlDocumento: "",
//       },
//     });

//     // Gerar o PDF com pdf-lib
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([595, 842]); // Tamanho A4 em pontos (largura, altura)
//     const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const fontSizeTitle = 16;
//     const fontSizeText = 12;
//     const lineHeight = 15;
//     let yPosition = 800; // Posição inicial no topo da página

//     // Função auxiliar para adicionar texto e ajustar a posição Y
//     const addText = (text: string, size: number, options: { underline?: boolean } = {}) => {
//       page.drawText(text, {
//         x: 50,
//         y: yPosition,
//         size,
//         font: helveticaFont,
//         color: rgb(0, 0, 0),
//         ...(options.underline && {
//           underline: true,
//           lineWidth: 1,
//           color: rgb(0, 0, 0),
//         }),
//       });
//       yPosition -= size + lineHeight; // Ajusta a posição para a próxima linha
//     };

//     // Conteúdo do PDF
//     addText("Contrato de Aluguel", fontSizeTitle, { underline: true });
//     yPosition -= 10; // Espaço extra após o título
//     addText(`Inquilino: ${rental.inquilino.nome}`, fontSizeText);
//     addText(`Proprietário: ${rental.imovel.proprietario.nome}`, fontSizeText);
//     addText(`Contato do Proprietário: ${rental.imovel.proprietario.telefone}`, fontSizeText);
//     addText(`Tipo de Contrato: ${rental.tipoAluguel}`, fontSizeText);
//     addText(`Data de Check-In: ${new Date(rental.checkIn).toLocaleDateString("pt-BR")}`, fontSizeText);
//     addText(`Data de Check-Out: ${new Date(rental.checkOut).toLocaleDateString("pt-BR")}`, fontSizeText);
//     addText(`Período Total: ${calculateRentalPeriod(rental.checkIn.toISOString(), rental.checkOut.toISOString())}`, fontSizeText);
//     addText(`Valor do Aluguel: ${valorTotal} AOA`, fontSizeText);
//     yPosition -= 10; // Espaço extra antes dos termos
//     addText("Termos do Contrato:", fontSizeText, { underline: true });

//     // Adicionar os termos com quebra de linha automática
//     const termsLines = termosContrato.split("\n");
//     termsLines.forEach((line: string) => {
//       const wrappedLines = splitTextToFit(line, 500, fontSizeText, helveticaFont); // Largura máxima de 500 pontos
//       wrappedLines.forEach((wrappedLine) => {
//         addText(wrappedLine, fontSizeText);
//       });
//     });

//     // Salvar o PDF como buffer
//     const pdfBytes = await pdfDoc.save();

//     // Atualizar a URL do documento no banco (simulação)
//     const urlDocumento = `/contratos/${contract.id}.pdf`;
//     await prisma.contrato.update({
//       where: { id: contract.id },
//       data: { urlDocumento },
//     });

//     // Retornar o PDF como resposta
//     return new NextResponse(pdfBytes, {
//       status: 201,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename=contrato-${contract.id}.pdf`,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Erro interno" },
//       { status: 500 }
//     );
//   }
// }

// function calculateRentalPeriod(checkIn: string, checkOut: string): string {
//   const start = new Date(checkIn);
//   const end = new Date(checkOut);
//   const diffTime = Math.abs(end.getTime() - start.getTime());
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return `${diffDays} dias`;
// }

// // Função auxiliar para quebrar texto longo em várias linhas
// function splitTextToFit(text: string, maxWidth: number, fontSize: number, font: any): string[] {
//   const words = text.split(" ");
//   const lines: string[] = [];
//   let currentLine = "";

//   for (const word of words) {
//     const testLine = currentLine ? `${currentLine} ${word}` : word;
//     const width = font.widthOfTextAtSize(testLine, fontSize);
//     if (width <= maxWidth) {
//       currentLine = testLine;
//     } else {
//       if (currentLine) lines.push(currentLine);
//       currentLine = word;
//     }
//   }
//   if (currentLine) lines.push(currentLine);
//   return lines;
// }






// src/app/api/contrato/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { calcularPeriodo } from "@/app/utils/calcularPeriodo";

export async function POST(req: NextRequest) {
  const { aluguelId, dataInicio, dataFim, valorTotal, termosContrato } = await req.json();

  if (!aluguelId || !dataInicio || !dataFim || !valorTotal || !termosContrato) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
  }

  try {
    // Buscar o aluguel para obter dados
    const rental = await prisma.aluguel.findUnique({
      where: { id: aluguelId },
      include: {
        imovel: { include: { proprietario: true } },
        inquilino: true,
        contrato: true,
      },
    });

    if (!rental) {
      return NextResponse.json({ error: "Aluguel não encontrado" }, { status: 404 });
    }

    if (rental.contrato) {
      return NextResponse.json({ error: "Já existe um contrato para este aluguel" }, { status: 400 });
    }

    // Gerar o PDF com pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Tamanho A4 em pontos
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSizeTitle = 16;
    const fontSizeText = 12;
    const lineHeight = 15;
    let yPosition = 800;

    const addText = (text: string, size: number, options: { underline?: boolean } = {}) => {
      page.drawText(text, {
        x: 50,
        y: yPosition,
        size,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        ...(options.underline && {
          underline: true,
          lineWidth: 1,
          color: rgb(0, 0, 0),
        }),
      });
      yPosition -= size + lineHeight;
    };

    addText("Contrato de Aluguel", fontSizeTitle, { underline: true });
    yPosition -= 10;
    addText(`Inquilino: ${rental.inquilino.nome}`, fontSizeText);
    addText(`Proprietário: ${rental.imovel.proprietario.nome}`, fontSizeText);
    addText(`Contato do Proprietário: ${rental.imovel.proprietario.telefone}`, fontSizeText);
    addText(`Tipo de Contrato: ${rental.tipoAluguel}`, fontSizeText);
    addText(`Data de Check-In: ${new Date(rental.checkIn).toLocaleDateString("pt-BR")}`, fontSizeText);
    addText(`Data de Check-Out: ${new Date(rental.checkOut).toLocaleDateString("pt-BR")}`, fontSizeText);
  
    const periodoAluguel = calcularPeriodo(rental.periodoAluguel);
    addText(`Período Total: ${periodoAluguel}`, fontSizeText);

    addText(`Valor do Aluguel: ${rental.valorTotal.toLocaleString('pt-PT', {style: 'currency', currency: 'AOA'})}`, fontSizeText);
  
    yPosition -= 10;
    addText("Termos do Contrato:", fontSizeText, { underline: true });

    const termsLines = termosContrato.split("\n");
    termsLines.forEach((line: string) => {
      const wrappedLines = splitTextToFit(line, 500, fontSizeText, helveticaFont);
      wrappedLines.forEach((wrappedLine) => {
        addText(wrappedLine, fontSizeText);
      });
    });

    // Salvar o PDF como bytes e converter para Base64
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // Criar o contrato no banco com o Base64
    const contract = await prisma.contrato.create({
      data: {
        aluguelId,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
        valorTotal: parseFloat(valorTotal),
        termosContrato,
        urlDocumento: pdfBase64, // Salva o PDF como Base64
      },
    });

    // Retornar o PDF como resposta para download imediato
    return new NextResponse(pdfBytes, {
      status: 201,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=contrato-${contract.id}.pdf`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 }
    );
  }
}

function calculateRentalPeriod(checkIn: string, checkOut: string): string {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} dias`;
}

function splitTextToFit(text: string, maxWidth: number, fontSize: number, font: any): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}