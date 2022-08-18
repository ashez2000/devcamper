import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
import app from './app'

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devcamper')
  .then((conn) => console.log(`mongodb : ${conn.connection.host}`))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log('Rejection Error :', err)
})

process.on('SIGTERM', () => {
  server.close()
})
