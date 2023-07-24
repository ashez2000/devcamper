import jwt from 'jsonwebtoken'
import config from '../config'
import { UserRole } from '../schemas/user.schema'

export type JwtPayload = {
  id: string
  email: string
  role: UserRole
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload
  } catch (err) {
    return null
  }
}
