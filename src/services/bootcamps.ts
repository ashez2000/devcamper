import { z } from 'zod'
import db from '@/utils/prisma'
import { AppError, UnauthorizedError } from '@/utils/app-error'
import { JwtPayload } from '@/utils/jwt'
import { BootcampCreateSchema } from '@/schemas/bootcamp-schema'
import { Bootcamp } from '@prisma/client'

const BootcampNotFoundError = () => new AppError('Bootcamp not found!', 404)

export async function createBootcamp(
  data: z.infer<typeof BootcampCreateSchema>,
  auth: JwtPayload
) {
  const { name, description } = BootcampCreateSchema.parse(data)
  const bootcamp = await db.bootcamp.create({
    data: {
      name: name,
      description: description,
      authorId: auth.id,
    },
  })

  return bootcamp
}

export async function findBootcamps() {
  const bootcamps = await db.bootcamp.findMany()
  return bootcamps
}

export async function findBootcampById(id: string) {
  const bootcamp = await db.bootcamp.findUnique({ where: { id } })
  if (!bootcamp) {
    throw BootcampNotFoundError()
  }

  return bootcamp
}

export async function updateBootcamp(
  id: string,
  data: Partial<Bootcamp>,
  auth: JwtPayload
) {
  const bootcamp = await findBootcampById(id)
  if (bootcamp.authorId !== auth.id && auth.role !== 'ADMIN') {
    throw UnauthorizedError()
  }

  const res = BootcampCreateSchema.partial().parse(data)

  const update = await db.bootcamp.update({ where: { id }, data: res })
  return update
}

export async function deleteBootcamp(id: string, auth: JwtPayload) {
  const bootcamp = await findBootcampById(id)
  if (bootcamp.authorId !== auth.id && auth.role !== 'ADMIN') {
    throw UnauthorizedError()
  }

  const deleted = await db.bootcamp.delete({ where: { id } })
  return deleted
}
