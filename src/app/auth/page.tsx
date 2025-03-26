// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "../authenticate/auth.action";
// import { toast } from "sonner";

// // Move the schema inside the component or to a separate file
// const SignInForm = () => {
//   const router = useRouter();
  
//   // Define the schema inside the component
//   const signInSchema = z.object({
//     username: z.string(),
//     senha: z.string().min(8)
//   });
  
//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       username: "",
//       senha: ""
//     }
//   });

//   const [loading, setLoading] = useState(false); 

//   async function onSubmit(values: z.infer<typeof signInSchema>) {
//     setLoading(true);
//     try {
//       const res = await signIn(values);
//       console.log(values);
//       if (res.success) {
//         toast.success("Login successful");
//         router.push("/dashboard");
//       } else {
//         toast.error(res.error);
//       }
//       // Do something with the form values.
//       // ✅ This will be type-safe and validated.
//       console.log(values);
//     } catch (error) {
//       toast.error("An error occurred during sign in");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Card className="w-full max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//         <CardDescription>Enter your email below to login to your account.</CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//       <Form {...form}>
//           <form
//             className="flex flex-col gap-2"
//             onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Utilizador</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Digite o email.."
//                       {...field}
//                     />
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
//                       placeholder="Digite a senha..."
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
           
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Signing in..." : "Entrar"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

// export default SignInForm;



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../authenticate/auth.action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // Ícone de spinner do Shadcn UI

const signInSchema = z.object({
  username: z.string(),
  senha: z.string().min(8),
});

const SignInDialog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      senha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setLoading(true);
    try {
      const res = await signIn(values);
      console.log(values);
      if (res.success) {
        toast.success("Login successful");
        router.push("/dashboard");
        setOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Login</DialogTitle>
          <DialogDescription>
            Adicione o email para fazer o login.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utilizador</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite o email.."
                        {...field}
                        disabled={loading} // Desativa o input durante o loading
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
                        placeholder="Digite a senha..."
                        {...field}
                        onChange={(e) => {
                          e.target.value = e.target.value.trim();
                          field.onChange(e);
                        }}
                        disabled={loading} // Desativa o input durante o loading
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;