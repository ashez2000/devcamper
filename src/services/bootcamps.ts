import db from '@/utils/prisma'
import { UnauthorizedError } from '@/utils/app-error'
import { JwtPayload } from '@/utils/jwt'

import { BootcampCreate } from '@/schemas/bootcamp'
import * as bootcampRepo from '@/repositories/bootcamp'

export async function findBootcamps(page: number, limit: number) {
  const skip = (page - 1) * limit
  const bootcamps = await bootcampRepo.bootcampFind(skip, limit)
  return bootcamps
}

export async function findBootcampById(id: string) {
  const bootcamp = await bootcampRepo.bootcampFindById(id)
  return bootcamp
}

export async function createBootcamp(data: BootcampCreate, auth: JwtPayload) {
  const bootcamp = await bootcampRepo.bootcampCreate(
    data.name,
    data.description,
    auth.id
  )
  return bootcamp
}

export async function updateBootcamp(
  id: string,
  data: Partial<BootcampCreate>,
  auth: JwtPayload
) {
  const bootcamp = await bootcampRepo.bootcampFindById(id)
  if (bootcamp.authorId !== auth.id && auth.role !== 'ADMIN') {
    throw UnauthorizedError()
  }

  const update = await db.bootcamp.update({
    where: {
      id,
    },
    data,
  })
  return update
}

export async function deleteBootcamp(id: string, auth: JwtPayload) {
  const bootcamp = await bootcampRepo.bootcampFindById(id)
  if (bootcamp.authorId !== auth.id && auth.role !== 'ADMIN') {
    throw UnauthorizedError()
  }

  await bootcampRepo.bootcampRemove(id)
  return bootcamp
}
