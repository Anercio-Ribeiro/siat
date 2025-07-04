"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { signUp } from "@/app/authenticate/auth.action";
import { Moon, Sun } from "lucide-react";

export const signUpSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "O nome deve ter pelo menos 5 caracteres." })
    .nonempty({ message: "O nome é obrigatório." }),

  email: z
    .string()
    .email({ message: "Email inválido." })
    .nonempty({ message: "O email é obrigatório." }),

  senha: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .nonempty({ message: "A senha é obrigatória." }),

  role: z.enum(["INQUILINO", "PROPRIETARIO", "ADMIN"], {
    errorMap: () => ({ message: "Selecione um perfil válido." })
  }),

  username: z
    .string()
    .min(5, { message: "O nome de utilizador deve ter pelo menos 5 caracteres." })
    .nonempty({ message: "O nome de utilizador é obrigatório." }),

  telefone: z
    .string()
    .regex(/^\(244\)\s(91|92|93|94|95|97|22)\d\s\d{3}\s\d{3}$/, {
      message: "O telefone deve estar no formato (244) 933 444 333"
    })
});


const SignUpForm = () => {
  const router = useRouter();

    const [darkMode, setDarkMode] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      username: "",
      role: "INQUILINO",
      telefone: ""
    }
  });

    const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", !darkMode);
    }
  };

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const currentDate = new Date();
    const utilizadorData = {
      ...values,
      criadoEm: currentDate,
      atualizadoEm: currentDate,
      //favoritoIds: []
    };

    const res = await signUp(utilizadorData);
    if (res.success) {
      toast.success("Conta criada com successo");
      router.push("/dashboard");
    } else {
      toast.error(res.error);
    }
  }

  return (
    <>
    <div className="relative min-h-screen flex items-center justify-center">
        <Button
                variant="outline"
                onClick={toggleTheme}
                className="absolute top-4 right-4"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="ml-2">
                  Tema {darkMode ? "claro" : "escuro"}
                </span>
              </Button>
    <Card className="min-w-[500px]">
      <CardHeader className="text-center mt-2">
        <CardTitle>Autenticação</CardTitle>
        <CardDescription>Criação de conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite o email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utilizador</FormLabel>
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
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite o telefone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange} // Update form state on value change
                      value={field.value} // Set the current value
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione o perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INQUILINO">Inquilino</SelectItem>
                        <SelectItem value="PROPRIETARIO">
                          Proprietário
                        </SelectItem>
                        {/* <SelectItem value="ADMIN">Admin</SelectItem> */}
                      </SelectContent>
                    </Select>
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
                      placeholder="Digite a senha"
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

            <Button type="submit" className="self-start">
              Criar conta
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
    {/* <BulkUserUpload /> */}
    </>

  );
};

export default SignUpForm;
