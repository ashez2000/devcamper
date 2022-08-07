const jwt = require('jsonwebtoken')
const asyncHandler = require('../middlewares/async.middleware')
const ErrorResponse = require('../utils/error.util')
const User = require('../models/user.model')

exports.protect = asyncHandler(async (req, res, next) => {
  // bearer token
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return next(new ErrorResponse('not authorized mot tokenm', 401))
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.user = await User.findById(decoded.id)
    next()
  } catch (err) {
    return next(new ErrorResponse('not authorized to access this route', 401))
  }
})

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `${req.user.role}s are not authorized for this route`,
          403
        )
      )
    }
    next()
  }
