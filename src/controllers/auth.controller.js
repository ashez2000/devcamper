const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')
const userService = require('../services/users.service')

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000),
}

/**
 * Signup a user
 * @route POST /api/v1/auth/signup
 * @access Public
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body
  const user = await userService.create({ name, email, password, role })

  res.cookie('token', user.getJWT(), cookieOptions)

  return res.status(201).json({
    user: user.toJSON(),
    token: user.getJWT(),
  })
})

/**
 * Signin a user
 * @route POST /api/v1/auth/signin
 * @access Public
 */
exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  const user = await userService.findByCredential(email, password)

  res.cookie('token', user.getJWT(), cookieOptions)

  return res.status(200).json({
    user: user.toJSON(),
    token: user.getJWT(),
  })
})

/**
 * Get signed in user
 * @route GET /api/v1/auth/user
 * @access Private
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await userService.findById(req.user.id)

  return res.status(200).json({
    status: 'success',
    user: user.toJSON(),
  })
})
