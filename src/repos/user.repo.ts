import argon from 'argon2'
import db from '../libs/prisma'
import { CreateUser, UserCredential } from '../schemas/user.schema'

export async function findById(id: string) {
  const user = await db.user.findUnique({ where: { id } })
  return user
}

export async function findByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } })
  return user
}

export async function findByCredential(data: UserCredential) {
  const { email, password } = data

  const user = await findByEmail(email)
  if (!user) return null

  const isMatch = await argon.verify(user.password, password)
  if (!isMatch) return null

  return user
}

export async function create(data: CreateUser) {
  const { name, email, password, role } = data
  const hash = await argon.hash(password)

  const user = await db.user.create({
    data: { name, email, password: hash, role },
  })

  return user
}

export async function update(id: string, data: any) {
  const user = await db.user.update({ where: { id }, data })
  return user
}
