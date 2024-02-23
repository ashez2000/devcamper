import db from '@/utils/prisma'
import { BootcampInput } from '@/schemas/bootcamp'

// Find all bootcamps
export const findMany = async () => {
  const bootcamps = await db.bootcamp.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      website: true,
      careers: true,
      address: true,
      createdAt: true,

      publisher: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return bootcamps
}

// Find bootcamp by id
export const findById = async (id: string) => {
  const bootcamp = await db.bootcamp.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      description: true,
      website: true,
      careers: true,
      address: true,
      createdAt: true,
      publisherId: true,
    },
  })

  return bootcamp
}

// Create new bootcamp
export const create = async (data: BootcampInput, publisherId: string) => {
  const { name, description, website, careers, address } = data

  const bootcamp = await db.bootcamp.create({
    data: {
      name,
      description,
      website,
      careers,
      address,
      publisherId,
    },

    select: {
      id: true,
      name: true,
      description: true,
      website: true,
      careers: true,
      address: true,
      createdAt: true,
      publisherId: true,
    },
  })

  return bootcamp
}

// Update bootcamp
export const update = async (id: string, data: Partial<BootcampInput>) => {
  const { name, description, website, careers, address } = data

  const bootcamp = await db.bootcamp.update({
    where: {
      id,
    },

    data: {
      name,
      description,
      website,
      careers,
      address,
    },

    select: {
      id: true,
      name: true,
      description: true,
      website: true,
      careers: true,
      address: true,
      createdAt: true,

      publisher: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return bootcamp
}

// Remove bootcamp
export const remove = async (id: string) => {
  await db.bootcamp.delete({
    where: {
      id,
    },
  })
}
