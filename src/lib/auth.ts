// // lib/auth.ts
// import { prisma } from "@/lib/prisma";
// import { getCookie } from "cookies-next"; 

// // Ou a biblioteca que estiver usando para cookies

// export async function getAuthUser(req: Request) {
//   const token = getCookie("auth_token", { req });
//   if (!token) return null;

//   // Verificar e decodificar o token para obter o ID do usuário
//   const decodedToken = verifyToken(token); // Função de verificação do token, de acordo com sua implementação

//   if (!decodedToken) return null;

//   const user = await prisma.user.findUnique({ where: { id: decodedToken.userId } });
//   return user;
// }
