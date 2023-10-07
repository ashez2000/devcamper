import { createSigner, createVerifier } from 'fast-jwt'
import { Role } from '@prisma/client'
import { envLoader } from '@/utils/env-loader'

const JWT_SECRET = envLoader('JWT_SECRET')

const sign = createSigner({ key: JWT_SECRET })
const verify = createVerifier({ key: JWT_SECRET })

export type JwtPayload = {
  id: string
  email: string
  role: Role
}

export function signToken(payload: JwtPayload) {
  return sign(payload)
}

export function verifyToken(token: string) {
  try {
    return verify(token) as JwtPayload
  } catch (err) {
    console.error(err)
    return null
  }
}
