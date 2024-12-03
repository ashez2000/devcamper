import mongoose from 'mongoose'

import app from './app'
import { appConfig, dbConfig } from './config'
import { createLogger } from './logger'

const logger = createLogger('main')

mongoose
  .connect(dbConfig.url)
  .then((conn) => logger.info(`mongodb : ${conn.connection.host}`))

const server = app.listen(appConfig.port, () => {
  logger.info(`listening on port ${appConfig.port} (${appConfig.env})`)
})

process.on('unhandledRejection', (err) => {
  logger.info('rejection error:', err)
})

process.on('SIGTERM', () => {
  logger.info('shutting down SIGTERM recived')
  server.close()
})
