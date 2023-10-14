import argon from 'argon2'
import { omit, pick } from 'ramda'
import { User } from '@prisma/client'

import db from '@/utils/prisma'
import { AppError } from '@/utils/app-error'
import { signToken } from '@/utils/jwt'
import { SignupSchema, SigninSchema } from '@/schemas/user-schema'
import { z } from 'zod'

const InvalidCredentialsError = () => new AppError('Invalid credentials', 404)

function tokenResponse(user: User) {
  const token = signToken(pick(['id', 'email', 'role'], user))

  return {
    user: omit(['password'], user),
    token: token,
  }
}

export async function createUser(data: z.infer<typeof SignupSchema>) {
  const { name, email, password, role } = SignupSchema.parse(data)

  const hash = await argon.hash(password)

  const user = await db.user.create({
    data: {
      name: name,
      email: email,
      password: hash,
      role: role,
    },
  })

  return tokenResponse(user)
}

export async function findUserByCredentials(
  data: z.infer<typeof SigninSchema>
) {
  const { email, password } = SigninSchema.parse(data)
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    throw InvalidCredentialsError()
  }

  const isMatch = await argon.verify(user.password, password)
  if (!isMatch) {
    throw InvalidCredentialsError()
  }

  return tokenResponse(user)
}
