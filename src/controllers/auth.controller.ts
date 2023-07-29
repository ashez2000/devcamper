import crypto from 'node:crypto'
import argon from 'argon2'
import { Request, Response } from 'express'

import { sendEmail } from '$/services/email.service'
import { AppError } from '$/utils/app-error.util'
import { signToken } from '$/libs/jwt'
import User from '$/models/user.model'
import { UserRole } from '$/schemas/user.schema'

// sign up
export async function signUp(req: Request, res: Response) {
  const { name, email, password, role } = req.body
  const hash = await argon.hash(password)

  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  })

  const token = signToken({
    id: user._id.toString(),
    email: user.email!,
    role: user.role as UserRole,
  })

  user.password = undefined
  res.cookie('token', token, { httpOnly: true })
  res.status(200).json({ data: { user, token } })
}

// sign in
export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new AppError('Invalid credentials', 401)

  const isMatch = await argon.verify(user.password!, password)
  if (!isMatch) throw new AppError('Invalid credentials', 401)

  const token = signToken({
    id: user._id.toString(),
    email: user.email!,
    role: user.role as UserRole,
  })

  user.password = undefined
  res.cookie('token', token, { httpOnly: true })
  res.status(200).json({ data: { user, token } })
}

// sign out
export async function signOut(_: Request, res: Response) {
  res.clearCookie('token')
  res.status(200).json({})
}

// get current user
export async function currentUser(req: Request, res: Response) {
  if (!req.user) throw new AppError('Unauthorized', 401)

  const user = await User.findById(req.user.id)
  if (!user) throw new AppError('User not found', 404)

  user.password = undefined
  res.status(200).json({ data: user })
}

export async function forgotPassword(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email })
  if (!user) throw new AppError('User not found', 404)

  const resetToken = crypto.randomBytes(16).toString('hex')
  const tokenExpire = Date.now() + 10 * 60 * 1000
  const resetTokenHash = await argon.hash(resetToken)

  await User.findByIdAndUpdate(user._id, {
    passwordResetToken: resetTokenHash,
    passwordResetExpire: tokenExpire,
  })

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`

  const message = `Please make a PUT request to: ${resetUrl} to reset your password`

  const emailResponse = await sendEmail(user.email!, 'Password reset', message)
  if (!emailResponse) throw new AppError('Email could not be sent', 500)

  res.status(200).json({ data: 'Email sent' })
}
