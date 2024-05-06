import { createSigner, createVerifier } from 'fast-jwt'
import 'dotenv/config'

const secret = process.env.JWT_SECRET
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
