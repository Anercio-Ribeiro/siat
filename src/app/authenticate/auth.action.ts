'use server'

import { z } from "zod"
import { signUpSchema } from "./SignUpForm"
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { signInSchema } from "./SignInForm"
import { redirect } from "next/navigation"
import { UtilizadorService } from "../services/utilizadorService"
import { UtilizadorCustom } from "../model/type"
import { hashPassword } from "@/lib/hashPassword"
import { verifyPassword } from "@/lib/verifyPassword"

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
    const utilizadorService = new UtilizadorService();
    try {
        const existingUser = await utilizadorService.encontrarUtilizadorPorUsername(values.username);
        if (existingUser) {
            return { error: 'User already exists', success: false };
        }
        const senha = await hashPassword(values.senha);

        const currentDate = new Date();
        const user = await utilizadorService.criarUtilizador({
            ...values,
            senha, 
            //favoritoIds: [], 
            criadoEm: currentDate, 
            atualizadoEm: currentDate 
        });
        console.log(user)
        const session = await lucia.createSession(user.id, {});
        console.log(session)
        const sessionCookie = await lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return { success: true };
    } catch (error) {
        return { error: 'Something went wrong', success: false };
    }
}

export const signIn = async (values: z.infer<typeof signInSchema>) => {
    const utilizadorService = new UtilizadorService();
    const user: UtilizadorCustom | null = await utilizadorService.encontrarUtilizadorPorUsername(values.username);

    // Adicione um log para verificar o utilizador encontrado
    console.log("Utilizador encontrado: ", user);
    
    if (!user || !user.senha) {
        console.log("Utilizador ou senha é nulo");
        return { success: false, error: "Invalid Credentials!" };
    }

    // Adicione um log para verificar a senha fornecida e a senha do banco de dados
    console.log("Senha inserida: ", values.senha);
    console.log("Senha no DB (hash): ", user.senha);

    // Verifica a correspondência entre as senhas
    const passwordMatch = await verifyPassword(values.senha, user.senha);
    console.log("Resultado da comparação de senha: ", passwordMatch);

    if (!passwordMatch) {
        console.log("Senha inválida");
        return { success: false, error: "Invalid Credentials!" }
    }

    console.log("Login bem-sucedido");

    // Continue com a criação da sessão
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    console.log("Sessão: ", session);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return { success: true };
}


export const logOut = async () => {
    const sessionCookie = await lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/authenticate')
}

