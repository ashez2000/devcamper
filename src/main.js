const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = require('./app')

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => console.log(`mongodb : ${conn.connection.host}`))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`bootcamp-api, port:${port}`)
  console.log(`server running in ${process.env.NODE_ENV} mode`)
})

process.on('unhandledRejection', (err) => {
  console.log('Rejection Error :', err.message)
})

process.on('SIGTERM', () => {
  server.close()
})
