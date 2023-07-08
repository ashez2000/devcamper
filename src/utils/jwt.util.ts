import { Role } from '.prisma/client'
import jwt from 'jsonwebtoken'

export type AuthPayload = {
  id: string
  email: string
  role: Role
}

export function generateToken(payload: AuthPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  return token
}
