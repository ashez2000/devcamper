import { Request } from 'express'
import { Role } from '@prisma/client'

import { verifyToken } from '@/utils/jwt'
import { UnauthorizedError } from '@/utils/app-error'

export function getAuthPayload(req: Request, restrict?: Role[]) {
  let token = req.cookies.token
  if (!token) {
    throw UnauthorizedError()
  }

  let payload = verifyToken(token)
  if (!payload) {
    throw UnauthorizedError()
  }

  if (restrict && !restrict.includes(payload.role)) {
    throw UnauthorizedError()
  }

  return payload
}
