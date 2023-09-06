import { Request, Response } from 'express'

import { signToken } from '@/utils/jwt'
import { sendEmail } from '@/utils/email'
import * as apperr from '@/utils/app-error'

import {
  User,
  createUser,
  userCredentialsSchema,
  createUserSchema,
  findUserByCredentials,
  generatePasswordResetToken,
  resetPassword as _resetPassword,
} from '@/models/user.model'
import { getAuthPayload } from '@/helpers/auth-helpers'

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
    throw apperr.badrequest('Invalid credentials')
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
  let auth = getAuthPayload(req)

  let user = await User.findById(auth.id)
  if (!user) {
    throw apperr.notfound()
  }

  res.status(200).json({ data: user })
}

export async function forgotPassword(req: Request, res: Response) {
  let { email } = req.body
  let user = await User.findOne({ email })
  if (!user) {
    throw apperr.notfound('User not found')
  }

  let resetToken = await generatePasswordResetToken(user.id)
  let host = req.get('host')
  let resetUrl = `${req.protocol}://${host}/api/v1/auth/resetpassword/${resetToken}`
  let message = `Make a PUT request to: ${resetUrl} to reset your password`

  let info = await sendEmail({
    recipient: user.email!,
    subject: 'Password reset token',
    message,
  })

  if (!info) {
    throw apperr.internalservererror('Error sending email')
  }

  res.status(200).json({ data: 'Email sent' })
}

export async function resetPassword(req: Request, res: Response) {
  let { resetToken, password } = req.body

  let ok = await _resetPassword(resetToken, password)
  if (!ok) {
    throw apperr.badrequest('Invalid password reset token')
  }

  res.status(200).json({ data: 'Password reset success' })
}
