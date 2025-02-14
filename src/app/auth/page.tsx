// "use client"; // Ensure this is a client-side component

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

// export const signInSchema = z.object({
//   username: z.string(),
//   senha: z.string().min(8)
// });

// const SignInForm = () => {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       username: "",
//       senha: ""
//     }
//   });

//   const [loading, setLoading] = useState(false); 

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof signInSchema>) {
//     const res = await signIn(values);
//     console.log(values);
//     if (res.success) {
//       toast.success("Login successful");
//       router.push("/dashboard");
//     } else {
//       toast.error(res.error);
//     }
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
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
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Enter your email..."
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
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Enter your password..."
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
//             {loading ? "Signing in..." : "Entrar"}
//           </Button>
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../authenticate/auth.action";
import { toast } from "sonner";

// Move the schema inside the component or to a separate file
const SignInForm = () => {
  const router = useRouter();
  
  // Define the schema inside the component
  const signInSchema = z.object({
    username: z.string(),
    senha: z.string().min(8)
  });
  
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      senha: ""
    }
  });

  const [loading, setLoading] = useState(false); 

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setLoading(true);
    try {
      const res = await signIn(values);
      console.log(values);
      if (res.success) {
        toast.success("Login successful");
        router.push("/dashboard");
      } else {
        toast.error(res.error);
      }
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
    } catch (error) {
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
                      placeholder="Enter your email..."
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
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
           
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignInForm;