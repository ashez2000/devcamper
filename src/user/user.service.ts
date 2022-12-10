import argon from 'argon2'
import { SignUpData } from '../auth/auth.schema'
import prisma from '../utils/prisma'

export const createUser = async (data: SignUpData) => {
  const { password } = data
  const hashedPassword = await argon.hash(password)

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return user
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  return user
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return user
}
