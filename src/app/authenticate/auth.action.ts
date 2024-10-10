'use server'

import { z } from "zod"
import { signUpSchema } from "./SignUpForm"
import { prisma } from "@/lib/prisma"
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { signInSchema } from "./SignInForm"
import { redirect } from "next/navigation"
import { UtilizadorService } from "../services/utilizadorService"
import { UtilizadorCustom } from "../model/type"

// export const signUp = async (values: z.infer<typeof signUpSchema>) => {
//     try {
//       const existingUser = await prisma.utilizador.findUnique({
//         where: {
//           email: values.email,
//         },
//       });
  
//       if (existingUser) {
//         return { error: 'User already exists', success: false };
//       }
  
//       const senha = await new Argon2id().hash(values.password);
//   const utilizadorService = new UtilizadorService();
//       const user = await utilizadorService.criarUtilizador(values);
  
//       const session = await lucia.createSession(user.id, {});
//       const sessionCookie = await lucia.createSessionCookie(session.id);
//       cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      
//       return { success: true };
//     } catch (error) {
//       return { error: 'Something went wrong', success: false };
//     }
//   };
  

export const signIn = async (values: z.infer<typeof signInSchema>) => {

  const utilizadorService = new UtilizadorService();
  const user: UtilizadorCustom | null = await utilizadorService.encontrarUtilizadorPorUsername(values.username);

  // Verifique se o utilizador foi encontrado e se a senha está presente
  if (!user || !user.senha) {
      return { success: false, error: "Invalid Credentials!" };
  }
    const passwordMatch = await new Argon2id().verify(user.senha, values.senha)
    if (!passwordMatch) {
        return { success: false, error: "Invalid Credentials!" }
    }
    // successfully login
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return { success: true }
}

export const logOut = async () => {
    const sessionCookie = await lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/authenticate')
}

