import { ErrorRequestHandler, RequestHandler } from 'express'
import AppError from './app-error'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack)

  return res
    .status(err.statusCode || 500)
    .json({ error: err.message || 'Server error' })
}

export const notFoundHandler: RequestHandler = (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  )
}
