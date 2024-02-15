import { Response } from 'express'

import { AppError } from '@/utils/app-error'
import { JwtPayload } from '@/utils/jwt'

export const getAuthPayload = (res: Response) => {
  const user = res.locals.user
  if (!user) {
    throw new AppError('Unauthorzied', 401)
  }

  return user as JwtPayload
}
