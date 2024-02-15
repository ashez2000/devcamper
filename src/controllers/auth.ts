import { RequestHandler } from 'express'

import { signToken } from '@/utils/jwt'
import { signupSchema, signinSchema } from '@/schemas/auth'
import * as userrepo from '@/repository/user'
import { AppError } from '@/utils/app-error'
import { getAuthPayload } from '@/helpers/auth'

/**
 * Signup user
 * @path POST /auth/signup | Public
 */
export const signup: RequestHandler = async (req, res) => {
  const data = signupSchema.parse(req.body)
  const { id, name, email, role } = await userrepo.create(data)

  const token = signToken({
    id,
    email,
    role,
  })

  res.cookie('token', token)
  res.status(201).json({
    user: {
      id,
      name,
      email,
      role,
    },
    token,
  })
}

/**
 * Signin user
 * @path POST /auth/signin | Public
 */
export const signin: RequestHandler = async (req, res) => {
  const data = signinSchema.parse(req.body)

  const user = await userrepo.findByCredential(data)
  if (user === null) {
    throw new AppError('Invalid Credential', 401)
  }

  const { id, name, email, role } = user

  const token = signToken({
    id,
    email,
    role,
  })

  res.cookie('token', token)
  res.status(201).json({
    user: {
      id,
      name,
      email,
      role,
    },
    token,
  })
}

/**
 * Signout user
 * @path POST /auth/signout | Private
 */
export const signout: RequestHandler = async (req, res) => {
  res.clearCookie('token').status(200).json({})
}

/**
 * Get user profile data
 * @path GET /auth/profile | Private
 */
export const profile: RequestHandler = async (req, res) => {
  const auth = getAuthPayload(res)

  const user = await userrepo.findById(auth.id)
  if (user === null) {
    throw new AppError('User not found', 404)
  }

  const { id, name, email, role } = user

  res.status(200).json({
    user: {
      id,
      name,
      email,
      role,
    },
  })
}
