const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/error.util')

exports.protect = (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return next(
      new ErrorResponse(
        'You are not logged in! Please log in to get access.',
        401
      )
    )
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  req.user = decoded
  next()
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'publisher', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          'You do not have permission to perform this action',
          403
        )
      )
    }

    next()
  }
}
