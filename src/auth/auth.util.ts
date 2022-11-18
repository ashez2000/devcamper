import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import config from '../config'
import AppError from '../utils/app-error'

/** Authencation middleware */
export const protect: RequestHandler = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    res.locals.user = decoded
  } catch (err) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  next()
}

/** Role authorization middleware */
export const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    // roles ['admin', 'publisher', 'user']
    if (!roles.includes(res.locals.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}

export const signToken = (payload: { id: string; role: string }): string => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  })
}
