import { createSigner, createVerifier } from 'fast-jwt'
import envLoad from '@/utils/envload'

const secret = envLoad('JWT_SECRET')

const sign = createSigner({ key: secret })
const verify = createVerifier({ key: secret })

export type JwtPayload = {
  id: string
  email: string
  role: 'USER' | 'PUBLISHER' | 'ADMIN'
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
