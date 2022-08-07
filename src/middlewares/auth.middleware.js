const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/error.util')

exports.protect = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return next(new ErrorResponse('You are not logged in', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } else {
    next(new ErrorResponse('You are not logged in', 401))
  }
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
