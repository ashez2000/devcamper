import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack)

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.message,
    })
  }

  res
    .status(err.statusCode || 500)
    .json({ error: err.message || 'Server error' })
}

export default errorHandler
