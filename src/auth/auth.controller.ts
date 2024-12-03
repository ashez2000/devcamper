import { RequestHandler } from 'express'

import { getSignedToken, cookieOptions, verifyToken } from './auth.utils'
import { getUserByCredentials } from './auth.service'

import AppError from '../utils/app-error'
import asyncHandler from '../utils/async-handler'
import { serializeUser } from '../user/user.utils'
import { createUser, getUserById } from '../user/user.service'

/**
 * User signup controller
 */
export const signup: RequestHandler = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const user = await createUser({ name, email, password, role })
  const token = getSignedToken({ id: user._id, role: user.role })

  res.cookie('token', token, cookieOptions)
  return res.status(201).json({
    token,
  })
})

/**
 * User signin controller
 */
export const signin: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await getUserByCredentials({ email, password })
  const token = getSignedToken({ id: user._id, role: user.role })

  res.cookie('token', token, cookieOptions)
  return res.status(200).json({
    token,
  })
})

/**
 * Get user profile controller
 */
export const user: RequestHandler = asyncHandler(async (req, res, next) => {
  const u = await getUserById(res.locals.user.id)
  const user = serializeUser(u)

  return res.status(200).json({
    user,
  })
})

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
