const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')

const User = require('../models/user.model')

/**
 * @description - Signup a user
 * @route POST /api/v1/auth/signup
 * @access Public
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.create({ name, email, password })

  return res.status(201).json({
    status: 'success',
    user: user.toJSON(),
    token: user.getJWT(),
  })
})

/**
 * @description - Signin a user
 * @route POST /api/v1/auth/signin
 * @access Public
 */
exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  const user = await User.findByCredentials(email, password)

  return res.status(200).json({
    status: 'success',
    user: user.toJSON(),
    token: user.getJWT(),
  })
})

/**
 * @description - Get signed in user
 * @route GET /api/v1/auth/user
 * @access Private
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  return res.status(200).json({
    status: 'success',
    user: user.toJSON(),
  })
})
