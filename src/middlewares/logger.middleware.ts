import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { createLogger } from '../logger'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const id = uuid()
  const logger = createLogger('request')
  const childLogger = logger.child({ reqId: id })

  res.locals.reqId = id
  res.locals.log = childLogger
  childLogger.info(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  )

  next()
}
