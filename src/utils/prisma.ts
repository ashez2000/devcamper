import { PrismaClient } from '@prisma/client';

export const sel = <T>(...fields: T[]) =>
  fields.reduce<any>((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {});

const prisma = new PrismaClient();

export default prisma;
