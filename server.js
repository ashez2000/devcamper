const dotenv = require('dotenv')
const express = require('express')

const connectDb = require('./db')

const bootcamps = require('./routers/bootcamp.router')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

connectDb()

app.use(express.json())

// routes
app.use('/api/bootcamps', bootcamps)

const server = app.listen(PORT, console.log(`Server Live | PORT: ${PORT}`))
