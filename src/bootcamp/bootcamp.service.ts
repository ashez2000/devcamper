import prisma from '../utils/prisma';
import { paginate } from '../utils/query';
import { CreateBootcampData } from './bootcamp.schema';

export async function getBootcamps(query: any) {
  // pagination
  const docCount = await prisma.bootcamp.count();
  const { limit, startIndex, res } = paginate(query, docCount);

  const bootcamps = await prisma.bootcamp.findMany({
    take: limit,
    skip: startIndex,
  });

  return { bootcamps, pagination: res };
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
