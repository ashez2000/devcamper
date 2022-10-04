import mongoose from 'mongoose'

import app from './app'
import config from './config'

mongoose
  .connect(config.MONGO_URI)
  .then((conn) => console.log(`mongodb : ${conn.connection.host}`))

const server = app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`)
})

process.on('unhandledRejection', (err) => {
  console.log('Rejection Error :', err)
})

process.on('SIGTERM', () => {
  server.close()
})
