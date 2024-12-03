import 'dotenv/config'
import mongoose from 'mongoose'

import app from './app'
import { appConfig, dbConfig } from './config'

mongoose
  .connect(dbConfig.url)
  .then((conn) => console.log(`mongodb : ${conn.connection.host}`))

const server = app.listen(appConfig.port, () => {
  console.log(`listening on port ${appConfig.port} (${appConfig.env})`)
})

process.on('unhandledRejection', (err) => {
  console.log('Rejection Error :', err)
})

process.on('SIGTERM', () => {
  server.close()
})
