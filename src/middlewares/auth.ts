import { AppError } from '@/utils/app-error'
import { JwtPayload, verifyToken } from '@/utils/jwt'
import { Role } from '@prisma/client'
import { RequestHandler } from 'express'

export const protect: RequestHandler = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    throw new AppError('Unauthorized', 401)
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw new AppError('Unauthorized', 401)
  }

  res.locals.user = payload
  next()
}

export const restrict = (...roles: Role[]): RequestHandler => {
  return (req, res, next) => {
    const user = res.locals.user as JwtPayload
    if (!roles.includes(user.role)) {
      throw new AppError('Forbidden', 403)
    }
    next()
  }
}
