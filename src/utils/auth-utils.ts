import { Request } from 'express'
import { UserRoles } from '@/models/user.model'
import { verifyToken } from '@/utils/jwt'

export function getAuthUser(req: Request, roles: UserRoles[] = []) {
  let token = req.cookies.token
  if (!token) {
    return null
  }

  let payload = verifyToken(token)
  if (!payload) {
    return null
  }

  if (roles.length && !roles.includes(payload.role)) {
    return null
  }

  return payload
}
