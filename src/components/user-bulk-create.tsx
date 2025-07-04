// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function BulkUserUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/utilizador/create/bulk', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       console.error(error);
//       setResult({ error: 'Erro ao enviar arquivo' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Upload de Usuários em Massa</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Input
//               type="file"
//               accept=".xlsx,.xls,.csv"
//               onChange={handleFileChange}
//               className="w-full"
//               disabled={isLoading}
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={!file || isLoading}
//             className="w-full"
//           >
//             {isLoading ? 'Processando...' : 'Enviar'}
//           </Button>
//         </form>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <h3 className="text-lg font-semibold">Resultado:</h3>
//             <div className="text-sm">
//               <p>Total processados: {result.totalProcessed}</p>
//               <p>Sucesso: {result.successful}</p>
//               <p>Falhas: {result.failed}</p>
//             </div>
//             <ul className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
//               {result.results?.map((res: any, index: number) => (
//                 <li
//                   key={index}
//                   className={`text-sm ${
//                     res.success ? 'text-green-600' : 'text-red-600'
//                   }`}
//                 >
//                   {res.username}: {res.success ? 'Criado com sucesso' : res.error}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }




// app/api/utilizador/create/bulk/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import * as z from 'zod';
import prisma from '@/lib/prisma'; // ajuste se o caminho for diferente
import bcrypt from 'bcryptjs';

const userSchema = z.object({
  nome: z.string(),
  username: z.string(),
  email: z.string().email(),
  senha: z.string(),
  role: z.enum(['PROPRIETARIO', 'INQUILINO', 'ADMIN']),
  telefone: z.string().min(8).max(20),
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Ficheiro não encontrado' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const csvText = buffer.toString('utf-8');

  let records;
  try {
    records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao processar CSV' }, { status: 400 });
  }

  const results: any[] = [];
  let successful = 0;
  let failed = 0;

  for (const row of records) {
    try {
      const validated = userSchema.parse({
        nome: row.nome,
        username: row.username,
        email: row.email,
        senha: row.senha,
        role: row.role,
        telefone: String(row.telefone),
      });

      const existingUser = await prisma.user.findUnique({
        where: { email: validated.email },
      });

      if (existingUser) {
        results.push({
          username: validated.username,
          success: false,
          error: 'Utilizador já existe',
        });
        failed++;
        continue;
      }

      const hashedPassword = await bcrypt.hash(validated.senha, 10);

      await prisma.user.create({
        data: {
          nome: validated.nome,
          username: validated.username,
          email: validated.email,
          senha: hashedPassword,
          role: validated.role,
          telefone: validated.telefone,
        },
      });

      results.push({
        username: validated.username,
        success: true,
      });
      successful++;
    } catch (error: any) {
      results.push({
        username: row.username,
        success: false,
        error: error?.message || 'Erro desconhecido',
      });
      failed++;
    }
  }

  return NextResponse.json({
    totalProcessed: records.length,
    successful,
    failed,
    results,
  });
}

