import { Role } from '.prisma/client'
import jwt from 'jsonwebtoken'

import { config } from '$/config'

export type AuthPayload = {
  id: string
  email: string
  role: Role
}

export const generateToken = (payload: AuthPayload) =>
  jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  })
