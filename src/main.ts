import dotenv from 'dotenv'
import mongoose from 'mongoose'
import config from 'config'

dotenv.config()

import app from './app'

mongoose
  .connect(config.get('MONGO_URI'))
  .then((conn) => console.log(`mongodb : ${conn.connection.host}`))

const port = config.get<number>('PORT')

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log('Rejection Error :', err)
})

process.on('SIGTERM', () => {
  server.close()
})
