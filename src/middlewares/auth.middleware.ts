import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/app-error'

export const protect: RequestHandler = (req, res, next) => {
  let token =
    (req.headers.authorization || '').replace(/^Bearer\s/, '') ||
    req.cookies.token

  if (!token) {
    return next(
      new ErrorResponse(
        'You are not logged in! Please log in to get access.',
        401
      )
    )
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')

  res.locals.user = decoded
  next()
}

export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    // roles ['admin', 'publisher', 'user']
    if (!roles.includes(res.locals.user.role)) {
      return next(
        new ErrorResponse(
          'You do not have permission to perform this action',
          403
        )
      )
    }

    next()
  }
}
