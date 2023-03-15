import prisma from '../utils/prisma';
import { CreateBootcampData } from './bootcamp.schema';

export async function getBootcamps() {
  return prisma.bootcamp.findMany();
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
