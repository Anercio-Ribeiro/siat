// import { NextResponse } from 'next/server';
// import { UtilizadorService } from '@/app/services/utilizadorService';
// import { hashPassword } from '@/lib/hashPassword';
// import { z } from 'zod';
// import * as XLSX from 'xlsx';

// // Schema para validação
// const bulkUserSchema = z.object({
//   nome: z.string().min(1),
//   username: z.string().min(3),
//   email: z.string().email(),
//   senha: z.string().min(6),
//   role: z.enum(['INQUILINO', 'PROPRIETARIO', 'ADMIN']).optional().default('PROPRIETARIO'),
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
//     const validUsers: BulkUser[] = [];
//     const currentDate = new Date();

//     // Validação e preparação dos dados
//     for (const userData of jsonData) {
//       try {
//         const validatedData = bulkUserSchema.parse(userData);
        
//         // Verifica se o usuário já existe
//         const existingUser = await utilizadorService.encontrarUtilizadorPorUsername(validatedData.username);
//         if (existingUser) {
//           results.push({
//             success: false,
//             username: validatedData.username,
//             error: 'Usuário já existe',
//           });
//           continue;
//         }

//         validUsers.push(validatedData);
//         results.push({
//           success: true,
//           username: validatedData.username,
//         });
//       } catch (error) {
//         const errorMessage = error instanceof z.ZodError 
//           ? 'Dados inválidos: ' + error.errors[0].message
//           : 'Erro ao processar usuário';
        
//         results.push({
//           success: false,
//           username: userData.username || 'desconhecido',
//           error: errorMessage,
//         });
//       }
//     }

//     // Criação em massa dos usuários válidos
//     if (validUsers.length > 0) {
//       const hashedUsers = await Promise.all(
//         validUsers.map(async (user) => ({
//           ...user,
//           senha: await hashPassword(user.senha),
//           picture: user.picture || '',
//           telefone: user.telefone || '',
//           criadoEm: currentDate,
//           atualizadoEm: currentDate,
//         }))
//       );

//       await utilizadorService.criarBulkUtilizador(hashedUsers);
//     }

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
