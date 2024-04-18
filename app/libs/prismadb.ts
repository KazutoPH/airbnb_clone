import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma client only once
const prisma = globalThis.prisma || new PrismaClient();

// Assign the Prisma client to global scope for hot reload prevention
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
