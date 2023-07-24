import { Request, Response, NextFunction } from 'express'
import { AppError } from '$/utils/app-error.util'

export async function globalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id format' })
  }

  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
}

export function notFound(req: Request, res: Response) {
  throw new AppError(`Not found: ${req.method} ${req.originalUrl}`, 404)
}
