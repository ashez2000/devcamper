import prisma from '../utils/prisma';
import { CreateBootcampData } from './bootcamp.schema';

export async function getBootcamps(query: any) {
  // pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const docCount = await prisma.bootcamp.count();
  const next = endIndex < docCount ? page + 1 : null;
  const prev = startIndex > 0 ? page - 1 : null;

  const bootcamps = await prisma.bootcamp.findMany({
    take: limit,
    skip: startIndex,
  });

  return {
    bootcamps,
    pagination: {
      page,
      prev,
      next,
    },
  };
}

export async function getBootcamp(id: string) {
  return prisma.bootcamp.findUnique({ where: { id } });
}

export async function createBootcamp(data: CreateBootcampData, userId: string) {
  const slug = data.name.toLowerCase().replace(/ /g, '-');
  return prisma.bootcamp.create({ data: { ...data, slug, userId } });
}

// TODO: update bootcamp impl
export async function updateBootcamp() {}

export async function deleteBootcamp(id: string) {
  return prisma.bootcamp.delete({ where: { id } });
}
