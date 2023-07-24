import crypto from 'node:crypto'
import * as R from 'ramda'
import argon from 'argon2'
import { Request, Response } from 'express'

import { AppError } from '../utils/app-error.util'
import { signToken } from '../libs/jwt'
import { sendEmail } from '../services/email.service'
import { CreateUser, UserCredential } from '../schemas/user.schema'
import * as userRepo from '../repos/user.repo'

const serializeUser = R.omit([
  'password',
  'resetPasswordToken',
  'resetPasswordExpire',
])

// sign up
export async function signUp(
  req: Request<unknown, unknown, CreateUser>,
  res: Response
) {
  const exist = await userRepo.findByEmail(req.body.email)
  if (exist) {
    throw new AppError('User already exists', 400)
  }

  const user = await userRepo.create(req.body)
  const token = signToken(user)

  res.cookie('token', token, { httpOnly: true })
  res.status(200).json({
    user: serializeUser(user),
    token,
  })
}

// sign in
export async function signIn(
  req: Request<unknown, unknown, UserCredential>,
  res: Response
) {
  const user = await userRepo.findByCredential(req.body)
  if (!user) throw new AppError('Invalid credential', 401)

  const token = signToken(user)

  res.cookie('token', token, { httpOnly: true })
  res.status(200).json({
    user: serializeUser(user),
    token,
  })
}

// sign out
export async function signOut(_: Request, res: Response) {
  res.clearCookie('token')
  res.status(200).json({})
}

// get current user
export async function currentUser(req: Request, res: Response) {
  if (!req.user) throw new AppError('Unauthorized', 401)

  const user = await userRepo.findById(req.user.id)
  if (!user) throw new AppError('User not found', 404)

  res.status(200).json({ user: serializeUser(user) })
}

// forgot password
export async function forgotPassword(req: Request, res: Response) {
  const user = await userRepo.findByEmail(req.body.email)
  if (!user) {
    return res
      .status(400)
      .json({ message: 'No user with that email address exists' })
  }

  const resetPasswordToken = crypto.randomBytes(20).toString('hex')
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000
  const hashedToken = await argon.hash(resetPasswordToken)

  await userRepo.update(user.id, {
    resetPasswordToken: hashedToken,
    resetPasswordExpire: new Date(resetPasswordExpire),
  })

  const message = `Reset password token: ${resetPasswordToken}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })

    res.status(200).json({
      message: 'Email sent!',
    })
  } catch (err) {
    await userRepo.update(user.id, {
      resetPasswordToken: null,
      resetPasswordExpire: null,
    })

    return res.status(500).json({
      message: 'There was an error sending the email. Try again later!',
    })
  }
}

// reset password
export async function resetPassword(req: Request, res: Response) {
  const { resetToken, email, password } = req.body

  const user = await userRepo.findByEmail(email)
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' })
  }

  if (!user.resetPasswordToken || !user.resetPasswordExpire) {
    return res.status(400).json({ message: 'Invalid reset token' })
  }

  const isMatch = await argon.verify(user.resetPasswordToken, resetToken)
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid reset token' })
  }

  if (user.resetPasswordExpire < new Date()) {
    return res.status(400).json({ message: 'Reset token has expired' })
  }

  const hashedPassword = await argon.hash(password)

  await userRepo.update(user.id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpire: null,
  })

  res.status(200).json({ message: 'Password updated successfully' })
}
