import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
import * as config from './config'
import app from './app'

mongoose
  .connect(config.mongouri)
  .then((conn) => console.log(`mongodb : ${conn.connection.host}`))

const port = config.port

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log('Rejection Error :', err)
})

process.on('SIGTERM', () => {
  server.close()
})
