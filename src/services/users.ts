import argon from 'argon2'
import { omit, pick } from 'ramda'

import db from '@/utils/prisma'
import { signToken } from '@/utils/jwt'
import { SignupSchema } from '@/schemas/user-schema'

export async function createUser(data: any) {
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

  const token = signToken(pick(['id', 'email', 'role'], user))

  return {
    user: omit(['password'], user),
    token: token,
  }
}
