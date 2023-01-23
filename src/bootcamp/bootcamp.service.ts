import prisma from '../utils/prisma';

export const getAllBootcamps = () => prisma.bootcamp.findMany();

export const createBootcamp = (data: any) => prisma.bootcamp.create({ data });

export const getBootcamp = (id: string) =>
  prisma.bootcamp.findUnique({ where: { id } });

export const updateBootcamp = (id: string, data: any) =>
  prisma.bootcamp.update({ where: { id }, data });

export const deleteBootcamp = (id: string) =>
  prisma.bootcamp.delete({ where: { id } });
