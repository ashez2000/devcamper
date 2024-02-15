import { User } from '@prisma/client'
import argon from 'argon2'

import db from '@/utils/prisma'
import { SignupInput, SigninInput } from '@/schemas/auth'

/** Create user */
export const create = async (data: SignupInput): Promise<User> => {
  const { name, email, password, role } = data

  const hash = await argon.hash(password)

  const user = await db.user.create({
    data: {
      name,
      email,
      role,
      password: hash,
    },
  })

  return user
}

/** Find user by credential */
export const findByCredential = async (
  data: SigninInput
): Promise<User | null> => {
  const { email, password } = data

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (user === null) {
    return null
  }

  // verify password
  const verified = await argon.verify(user.password, password)
  if (!verified) {
    return null
  }

  return user
}

/** Find user by id */
export const findById = async (id: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  })

  return user
}
