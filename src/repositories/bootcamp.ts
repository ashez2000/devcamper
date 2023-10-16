import db from '@/utils/prisma'

export async function bootcampFind(skip: number, take: number) {
  const bootcamps = await db.bootcamp.findMany({
    skip,
    take,
  })
  return bootcamps
}

export async function bootcampFindById(id: string) {
  const bootcamp = await db.bootcamp.findUniqueOrThrow({
    where: {
      id,
    },
  })
  return bootcamp
}

export async function bootcampCreate(
  name: string,
  description: string,
  authorId: string
) {
  const bootcamp = await db.bootcamp.create({
    data: {
      name,
      description,
      authorId,
    },
  })
  return bootcamp
}

export async function bootcampUpdate(
  id: string,
  name?: string,
  description?: string
) {
  const bootcamp = await db.bootcamp.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  })
  return bootcamp
}

export async function bootcampRemove(id: string) {
  const bootcamp = await bootcampFindById(id)
  await db.bootcamp.delete({
    where: {
      id: bootcamp.id,
    },
  })
  return bootcamp
}
