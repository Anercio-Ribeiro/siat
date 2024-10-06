// import NextAuth, { AuthOptions, DefaultUser, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { getUserByEmail } from "./db";
// import { verifyPassword } from "./verifyPassword";

// // Define o tipo personalizado para o usuário
// interface CustomUser extends DefaultUser {
//   id: string;
//   role: 'USER' | 'STUDENT' | 'TEACHER' | 'ADMIN';
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }
        
//         try {
//           // Busca o usuário pelo e-mail
//           const user = await getUserByEmail(credentials.email);
          
//           // Verifica se o usuário existe e se a senha está correta
//           if (user && await verifyPassword(credentials.password, user.password)) {
//             // Retorna o usuário com as informações necessárias
//             console.log(user)
//             return {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               role: user.role,
//             } as CustomUser;
//           }
          
//         } catch (error) {
//           // Trate o erro, se necessário
//           console.error('Error during authorization:', error);
//         }
        
//         // Retorna null se a autenticação falhar
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/',
//   },
//   debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);


import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/verifyPassword";
import { getUserByEmail } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        if (user && await verifyPassword(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Adjust as needed
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
