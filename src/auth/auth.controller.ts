import { RequestHandler } from 'express'
import * as userService from '../users/users.service'
import { SignUpSchema, SignInSchema } from '../schemas/auth.schema'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
}

/**
 * Signup a user
 * @route POST /api/v1/auth/signup
 * @access Public
 */
export const signup: RequestHandler = async (req, res, next) => {
  try {
    const data = SignUpSchema.parse(req.body)
    const user = await userService.createUser(data)

    res.cookie('token', user.getJWT(), cookieOptions)
    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: user.getJWT(),
    })
  } catch (error) {
    return next(error)
  }
}

/**
 * Signin a user
 * @route POST /api/v1/auth/signin
 * @access Public
 */
export const signin: RequestHandler = async (req, res, next) => {
  try {
    const data = SignInSchema.parse(req.body)
    const user = await userService.findByUserCredential(data)

    res.cookie('token', user.getJWT(), cookieOptions)
    return res.status(200).json({
      user: user.toJSON(),
      token: user.getJWT(),
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * Get signed in user
 * @route GET /api/v1/auth/user
 * @access Private
 */
export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.findUserById(res.locals.user.id)

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    return next(err)
  }
}
