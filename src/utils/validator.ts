import { RequestHandler } from 'express'
import { ZodSchema } from 'zod'
import AppError from './app-error'

export const validator = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const data = schema.safeParse(req.body)
    if (!data.success) {
      const message = data.error.issues.map((issue) => issue.message).join(', ')
      return next(new AppError(message, 400))
    }

    req.body = data.data
    next()
  }
}
