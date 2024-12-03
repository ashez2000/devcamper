import { Request, Response } from 'express'

import AppError from '../utils/app-error'
import { createUser } from '../user/user.service'
import { getSignedToken, cookieOptions } from './auth.utils'
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
