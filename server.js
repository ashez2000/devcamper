const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
  console.log('uncaught exception, shutting down server')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config()
const app = require('./app')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => console.log(`mongodb:${conn.connection.host}`))

const server = app.listen(process.env.PORT, () => {
  console.log(`bootcamp-api, port:${process.env.PORT}`)
  console.log(`server running in ${process.env.NODE_ENV} mode`)
})

process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection, shutting down server')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
