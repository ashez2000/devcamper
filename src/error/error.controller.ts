import { ErrorRequestHandler, RequestHandler } from 'express'
import { Error as MongooseError } from 'mongoose'
import AppError from '../utils/app-error'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Error Handler:', err.message)
  console.log(err)
  console.log(err.stack)

  if (err instanceof MongooseError.CastError) {
    err = new AppError('Invalid resource id', 400)
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value!`

    err = new AppError(message, 404)
  }

  if (err instanceof MongooseError.ValidationError) {
    const message = Object.values(err.errors).map((val) => val.message)
    console.log(message)
    err = new AppError(message.join(', '), 404)
  }

  let message = err.message || 'Server Error'
  let statusCode = err.statusCode || 500
  return res.status(statusCode).json({ error: message })
}

export const notFoundHandler: RequestHandler = (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  )
}
