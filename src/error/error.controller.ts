import { ErrorRequestHandler, RequestHandler } from 'express'
import AppError from '../utils/app-error'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Error Handler:', err.message)
  console.log(err.stack)

  const message = err.message || 'Server Error'
  const statusCode = err.statusCode || 500
  return res.status(statusCode).json({ error: message })
}

export const notFoundHandler: RequestHandler = (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  )
}
