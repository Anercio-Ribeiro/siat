import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${(file as any).name}`;
    const filePath = path.join(process.cwd(), "public/imoveis", fileName);

    // Salvar o arquivo na pasta public/imoveis
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/imoveis/${fileName}` }, { status: 200 });
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error);
    return NextResponse.json({ error: "Erro ao fazer upload do arquivo" }, { status: 500 });
  }
}
