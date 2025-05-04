"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "@/app/authenticate/auth.action";

export const signInSchema = z.object({
  username: z.string(),
  senha: z.string().min(8),
});

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      senha: "",
    },
  });

  // Função para simular atraso
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true); // Ativa o loading

    const res = await signIn(values);
    if (res.success) {
      // Atraso de 3 segundos para exibir o loading
      await delay(3000);
      toast.success("Login bem-sucedido! Bem-vindo ao dashboard!");
      router.push("/dashboard");
    } else {
      setIsLoading(false); // Desativa o loading em caso de erro
      toast.error(res.error || "Erro ao fazer login");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center mt-2">
          <CardTitle>Autenticação</CardTitle>
          <CardDescription>Entrar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite o username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite a sua senha"
                        {...field}
                        onChange={(e) => {
                          e.target.value = e.target.value.trim();
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="self-start" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-500">
            Não tem uma conta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Registre-se
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* Overlay de fundo escurecido com loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SignInForm;