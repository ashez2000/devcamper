const dotenv = require('dotenv')
const express = require('express')

const bootcamps = require('./routers/bootcamp.router')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use('/api/bootcamps', bootcamps)

app.listen(PORT, console.log(`Server Live | PORT: ${PORT}`))