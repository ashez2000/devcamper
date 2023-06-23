import { Request } from 'express'
import { AppError } from '../utils/app-error.util'

export function getCurrentUser(req: Request) {
  if (!req.user) {
    throw new AppError('Unauthorized', 401)
  }

  return req.user
}
