const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')
const userService = require('../services/users.service')

/**
 * @description - Signup a user
 * @route POST /api/v1/auth/signup
 * @access Public
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await userService.create({ name, email, password })

  return res.status(201).json({
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

  const user = await userService.findByCredential(email, password)

  return res.status(200).json({
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
  const user = await userService.findById(req.user.id)

  return res.status(200).json({
    status: 'success',
    user: user.toJSON(),
  })
})
