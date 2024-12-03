import { Request, Response, RequestHandler } from 'express'

import AppError from '../utils/app-error'
import { createUser } from '../user/user.service'
import { getSignedToken, cookieOptions, verifyToken } from './auth.utils'
import { getUserByCredentials } from './auth.service'

/**
 * Register new user
 * @route POST /auth/register
 */
export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body
  if (role != 'user' && role != 'publisher') {
    throw new AppError(`invalid user role "${role}"`, 400)
  }

  const user = await createUser({ name, email, password, role })
  const token = getSignedToken({ id: user._id, role: user.role })

  res.cookie('token', token, cookieOptions)
  res.status(201).json({
    token,
  })
}

/**
 * Login user
 * @route POST /auth/login
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) {
    throw new AppError('email and password required', 401)
  }

  const user = await getUserByCredentials({ email, password })
  const token = getSignedToken({ id: user._id, role: user.role })

  res.cookie('token', token, cookieOptions)
  res.status(200).json({
    token,
  })
}

/**
 * Authencation middleware
 */
export const protect: RequestHandler = (req, res, next) => {
  const token =
    (req.headers.authorization || '').replace(/^Bearer\s/, '') ||
    req.cookies.token

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  const decoded = verifyToken(token)
  res.locals.user = decoded

  next()
}

/**
 * Role authorization middleware
 */
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
