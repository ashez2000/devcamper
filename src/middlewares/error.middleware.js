const ErrorResponse = require('../utils/error.util')

const errorHandler = (err, req, res, next) => {
  console.log(err.stack)

  // copy of error for modification
  let error = err

  // bad mongoose id
  if (err.name === 'CastError') {
    const message = `Resource not found with id: ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // duplicate keys
  if (err.code === 11000) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(message, 400)
  }

  // validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' })
}

module.exports = errorHandler
