// lib/prisma.ts
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export default prisma;

// /lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ['query'], // Optional: Useful for debugging
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
