// import { PrismaClient } from '@prisma/client';

// // export const prisma = new PrismaClient();



// const client = new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
// })

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? client

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client




import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;