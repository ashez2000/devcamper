import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

import createLogger from '@/utils/logger'
import { AppError } from '@/utils/app-error'

const log = createLogger('errorhandler')

export async function globalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    log.debug(err)
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err instanceof ZodError) {
    log.debug(err)
    return res.status(400).json({ message: err.message })
  }

  log.error(err)

  res.status(500).json({ message: 'Internal server error' })
}

export function notFound(req: Request) {
  throw new AppError(`Not found: ${req.method} ${req.originalUrl}`, 404)
}
