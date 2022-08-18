import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack)

  res
    .status(err.statusCode || 500)
    .json({ error: err.message || 'Server error' })
}

export default errorHandler
