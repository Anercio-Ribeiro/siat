// // src/lib/lucia-server.ts
// import { Lucia } from 'lucia';
// import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
// import { prisma } from './prisma';
// import { cookies } from 'next/headers';

// export const lucia = new Lucia({
//   adapter: new PrismaAdapter(prisma.session, prisma.user),
//   env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
//   getUser: async () => {
//     const authCookies = cookies(); // Use server-side cookies here
//     const user = await authCookies.get('user');
//     return user;
//   },
// });
