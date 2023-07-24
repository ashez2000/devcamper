import { Request, Response, NextFunction } from 'express'
import { JwtPayload, verifyToken } from '../libs/jwt'
import { UserRole } from '../schemas/user.schema'
import { AppError } from '../utils/app-error.util'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const bearerToken = String(req.headers.authorization)
  const cookieToken = String(req.cookies.token)
  const token = bearerToken.split(' ')[1] || cookieToken

  const payload = verifyToken(token)
  if (!payload) throw new AppError('Not authorized', 401)

  req.user = payload
  next()
}

export function authorize(...roles: UserRole[]) {
  return function (req: Request, _: Response, next: NextFunction) {
    if (!req.user) throw new AppError('Not authorized', 401)
    if (!roles.includes(req.user.role)) throw new AppError('Forbidden', 403)
    next()
  }
}
