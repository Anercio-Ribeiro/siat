// // src/app/api/users/bulk/route.ts
// import { NextResponse } from 'next/server';
// import { UtilizadorService } from '@/app/services/utilizadorService';
// import { hashPassword } from '@/lib/hashPassword';
// import { z } from 'zod';
// import * as XLSX from 'xlsx';

// // Schema para validação de cada linha do arquivo
// const bulkUserSchema = z.object({
//   nome: z.string().min(1),
//   username: z.string().min(3),
//   email: z.string().email(),
//   senha: z.string().min(6),
//   role: z.enum(['USER', 'ADMIN']).optional().default('USER'),
//   telefone: z.string().optional(),
//   picture: z.string().optional(),
// });

// type BulkUser = z.infer<typeof bulkUserSchema>;

// export async function POST(req: Request) {
//   'use server';
  
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file') as File;

//     if (!file) {
//       return NextResponse.json({ error: 'Nenhum arquivo fornecido', status: 400 });
//     }

//     // Lê o arquivo
//     const buffer = await file.arrayBuffer();
//     const workbook = XLSX.read(buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet) as BulkUser[];

//     const utilizadorService = new UtilizadorService();
//     const results: { success: boolean; username: string; error?: string }[] = [];
//     const createdUsers: string[] = [];

//     // Processa cada usuário em paralelo com limite de concorrência
//     await Promise.all(
//       jsonData.map(async (userData) => {
//         try {
//           // Valida os dados
//           const validatedData = bulkUserSchema.parse(userData);

//           // Verifica se o usuário já existe
//           const existingUser = await utilizadorService.encontrarUtilizadorPorUsername(validatedData.username);
//           if (existingUser) {
//             results.push({
//               success: false,
//               username: validatedData.username,
//               error: 'Usuário já existe',
//             });
//             return;
//           }

//           // Hash da senha
//           const hashedPassword = await hashPassword(validatedData.senha);

//           // Cria o usuário
//           const newUser = await utilizadorService.criarUtilizador({
//             ...validatedData,
//             senha: hashedPassword,
//             picture: validatedData.picture || '',
//             criadoEm: new Date(),
//             atualizadoEm: new Date(),
//           });

//           createdUsers.push(newUser.id);
//           results.push({
//             success: true,
//             username: validatedData.username,
//           });
//         } catch (error) {
//           const errorMessage = error instanceof z.ZodError 
//             ? 'Dados inválidos: ' + error.errors[0].message
//             : 'Erro ao criar usuário';
          
//           results.push({
//             success: false,
//             username: userData.username || 'desconhecido',
//             error: errorMessage,
//           });
//         }
//       })
//     );

//     return NextResponse.json({
//       status: 200,
//       totalProcessed: jsonData.length,
//       successful: results.filter(r => r.success).length,
//       failed: results.filter(r => !r.success).length,
//       results,
//     });

//   } catch (error) {
//     console.error('Erro no processamento em massa:', error);
//     return NextResponse.json({
//       error: 'Erro ao processar o arquivo',
//       status: 500,
//     });
//   }
// }



// src/app/api/users/bulk/route.ts
import { NextResponse } from 'next/server';
import { UtilizadorService } from '@/app/services/utilizadorService';
import { hashPassword } from '@/lib/hashPassword';
import { z } from 'zod';
import * as XLSX from 'xlsx';

// Schema para validação
const bulkUserSchema = z.object({
  nome: z.string().min(1),
  username: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),
  role: z.enum(['INQUILINO', 'PROPRIETARIO', 'ADMIN']).optional().default('PROPRIETARIO'),
  telefone: z.string().optional(),
  picture: z.string().optional(),
});

type BulkUser = z.infer<typeof bulkUserSchema>;

export async function POST(req: Request) {
  'use server';
  
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo fornecido', status: 400 });
    }

    // Lê o arquivo
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as BulkUser[];

    const utilizadorService = new UtilizadorService();
    const results: { success: boolean; username: string; error?: string }[] = [];
    const validUsers: BulkUser[] = [];
    const currentDate = new Date();

    // Validação e preparação dos dados
    for (const userData of jsonData) {
      try {
        const validatedData = bulkUserSchema.parse(userData);
        
        // Verifica se o usuário já existe
        const existingUser = await utilizadorService.encontrarUtilizadorPorUsername(validatedData.username);
        if (existingUser) {
          results.push({
            success: false,
            username: validatedData.username,
            error: 'Usuário já existe',
          });
          continue;
        }

        validUsers.push(validatedData);
        results.push({
          success: true,
          username: validatedData.username,
        });
      } catch (error) {
        const errorMessage = error instanceof z.ZodError 
          ? 'Dados inválidos: ' + error.errors[0].message
          : 'Erro ao processar usuário';
        
        results.push({
          success: false,
          username: userData.username || 'desconhecido',
          error: errorMessage,
        });
      }
    }

    // Criação em massa dos usuários válidos
    if (validUsers.length > 0) {
      const hashedUsers = await Promise.all(
        validUsers.map(async (user) => ({
          ...user,
          senha: await hashPassword(user.senha),
          picture: user.picture || '',
          telefone: user.telefone || '',
          criadoEm: currentDate,
          atualizadoEm: currentDate,
        }))
      );

      await utilizadorService.criarBulkUtilizador(hashedUsers);
    }

    return NextResponse.json({
      status: 200,
      totalProcessed: jsonData.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    });

  } catch (error) {
    console.error('Erro no processamento em massa:', error);
    return NextResponse.json({
      error: 'Erro ao processar o arquivo',
      status: 500,
    });
  }
}



// // Componente Frontend (exemplo)
// // src/components/BulkUserUpload.tsx
// 'use client';

// import { useState } from 'react';

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
//       const response = await fetch('/api/users/bulk', {
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
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           accept=".xlsx,.xls,.csv"
//           onChange={handleFileChange}
//         />
//         <button type="submit" disabled={!file || isLoading}>
//           {isLoading ? 'Processando...' : 'Enviar'}
//         </button>
//       </form>

//       {result && (
//         <div>
//           <h3>Resultado:</h3>
//           <p>Total processados: {result.totalProcessed}</p>
//           <p>Sucesso: {result.successful}</p>
//           <p>Falhas: {result.failed}</p>
//           <ul>
//             {result.results?.map((res: any, index: number) => (
//               <li key={index}>
//                 {res.username}: {res.success ? 'Criado com sucesso' : res.error}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }