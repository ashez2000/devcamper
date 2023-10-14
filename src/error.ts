import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/app-error'
import { ZodError } from 'zod'

export async function globalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.message })
  }

  res.status(500).json({ message: 'Internal server error' })
}

export function notFound(req: Request) {
  throw new AppError(`Not found: ${req.method} ${req.originalUrl}`, 404)
}
