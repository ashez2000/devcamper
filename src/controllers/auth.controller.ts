import crypto from 'node:crypto'
import argon from 'argon2'
import { Request, Response } from 'express'

import { sendEmail } from '@/services/email.service'
import { AppError } from '@/utils/app-error.util'
import { signToken } from '@/utils/jwt'

import {
  User,
  createUser,
  userCredentialsSchema,
  createUserSchema,
  findUserByCredentials,
  generatePasswordResetToken,
  resetPassword as _resetPassword,
} from '@/models/user.model'
import { getAuthUser } from '$/auth'

// sign up
export async function signup(req: Request, res: Response) {
  let data = createUserSchema.parse(req.body)
  let user = await createUser(data)
  let token = signToken({
    id: user.id,
    email: user.email!,
    role: user.role,
  })

  return res
    .status(200)
    .cookie('token', token, { httpOnly: true })
    .json({ data: { user, token } })
}

// sign in
export async function signin(req: Request, res: Response) {
  let data = userCredentialsSchema.parse(req.body)
  let user = await findUserByCredentials(data.email, data.password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  let token = signToken({
    id: user.id,
    email: user.email!,
    role: user.role,
  })

  return res
    .status(200)
    .cookie('token', token, { httpOnly: true })
    .json({ data: { user, token } })
}

// sign out
export async function signout(_: Request, res: Response) {
  res.clearCookie('token')
  res.status(200).json({})
}

// get current user profile
export async function profile(req: Request, res: Response) {
  let auth = getAuthUser(req)
  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  let user = await User.findById(auth.id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ data: user })
}

export async function forgotPassword(req: Request, res: Response) {
  let { email } = req.body
  let user = await User.findOne({ email })
  if (!user) throw new AppError('User not found', 404)

  let resetToken = await generatePasswordResetToken(user.id)
  let host = req.get('host')
  let resetUrl = `${req.protocol}://${host}/api/v1/auth/resetpassword/${resetToken}`
  let message = `Make a PUT request to: ${resetUrl} to reset your password`

  let info = await sendEmail(user.email!, 'Password reset', message)
  if (!info) throw new AppError('Email could not be sent', 500)

  res.status(200).json({ data: 'Email sent' })
}

export async function resetPassword(req: Request, res: Response) {
  let { resetToken, password } = req.body

  let ok = await _resetPassword(resetToken, password)
  if (!ok) throw new AppError('Invalid reset token', 400)

  res.status(200).json({ data: 'Password reset success' })
}
