import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'
import AppError from '../utils/app-error'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof MongooseError.CastError) {
    err = new AppError('Invalid resource id', 400)
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `duplicate field value: ${value}`
    err = new AppError(message, 404)
  }

  if (err instanceof MongooseError.ValidationError) {
    const message = Object.values(err.errors).map((val) => val.message)
    err = new AppError(message.join(', '), 404)
  }

  let message = err.message || 'internal server error'
  let statusCode = err.statusCode || 500
  return res.status(statusCode).json({ error: message })
}

export function notFoundHandler(req: Request, res: Response) {
  throw new AppError(`${req.method} '${req.originalUrl}' not found`, 404)
}
