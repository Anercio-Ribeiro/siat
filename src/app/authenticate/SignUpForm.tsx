// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form";

// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { signUp } from "./auth.action";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
// import BulkUserUpload from "@/components/user-bulk-create";

// export const signUpSchema = z.object({
//   nome: z.string().min(5),
//   email: z.string().email(),
//   senha: z.string().min(8),
//   role: z.enum(["INQUILINO", "PROPRIETARIO", "ADMIN"]),
//   username: z.string().min(5),
//   telefone: z.string().max(12)
// });

// const SignUpForm = () => {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       nome: "",
//       email: "",
//       senha: "",
//       username: "",
//       role: "INQUILINO",
//       telefone: ""
//     }
//   });

//   async function onSubmit(values: z.infer<typeof signUpSchema>) {
//     const currentDate = new Date();
//     const utilizadorData = {
//       ...values,
//       criadoEm: currentDate,
//       atualizadoEm: currentDate,
//       //favoritoIds: []
//     };

//     const res = await signUp(utilizadorData);
//     if (res.success) {
//       toast.success("Conta criada com successo");
//       router.push("/dashboard");
//     } else {
//       toast.error(res.error);
//     }
//   }

//   return (
//     <>
//     <Card className="min-w-[500px]">
//       <CardHeader className="text-center mt-2">
//         <CardTitle>Autenticação</CardTitle>
//         <CardDescription>Criação de conta</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <Form {...form}>
//           <form
//             className="flex flex-col gap-2"
//             onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <FormField
//               control={form.control}
//               name="nome"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nome</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Digite o nome" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Digite o email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Utilizador</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Digite o username"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="telefone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Telefone</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Digite o telefone"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="role"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Perfil</FormLabel>
//                   <FormControl>
//                     <Select
//                       onValueChange={field.onChange} // Update form state on value change
//                       value={field.value} // Set the current value
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Seleccione o perfil" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="INQUILINO">Inquilino</SelectItem>
//                         <SelectItem value="PROPRIETARIO">
//                           Proprietário
//                         </SelectItem>
//                         {/* <SelectItem value="ADMIN">Admin</SelectItem> */}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="senha"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Senha</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Digite a senha"
//                       {...field}
//                       onChange={(e) => {
//                         e.target.value = e.target.value.trim();
//                         field.onChange(e);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="self-start">
//               Criar conta
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//     {/* <BulkUserUpload /> */}
//     </>

//   );
// };

// export default SignUpForm;
