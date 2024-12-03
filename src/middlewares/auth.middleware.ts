import { Request, Response, NextFunction, RequestHandler } from 'express'

import { verifyToken } from '../auth/auth.utils'
import AppError from '../utils/app-error'

/**
 * Authencation middleware
 */
export function protect(req: Request, res: Response, next: NextFunction) {
  const token =
    (req.headers.authorization || '').replace(/^Bearer\s/, '') ||
    req.cookies.token

  if (!token) {
    throw new AppError('unauthorized, login required', 401)
  }

  // TODO: handle jwt errors
  const decoded = verifyToken(token)
  res.locals.user = decoded

  next()
}

/**
 * Restrict access to provides user roles
 */
export function restrictTo(...roles: string[]): RequestHandler {
  return (req, res, next) => {
    const user = res.locals.user
    if (!roles.includes(user.role)) {
      throw new AppError(`user role "${user.role}" unauthorized`, 403)
    }
    next()
  }
}
