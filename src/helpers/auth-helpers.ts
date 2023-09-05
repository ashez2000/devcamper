import { Request } from 'express'
import * as apperr from '@/utils/app-error'
import { verifyToken } from '@/utils/jwt'
import { UserRole } from '$/models/user.model'

export function getAuthPayload(req: Request, restrict?: UserRole[]) {
  let token = req.cookies.token
  if (!token) {
    throw apperr.unauthorized()
  }

  let payload = verifyToken(token)
  if (!payload) {
    throw apperr.unauthorized()
  }

  if (restrict && !restrict.includes(payload.role)) {
    throw apperr.unauthorized()
  }

  return payload
}
