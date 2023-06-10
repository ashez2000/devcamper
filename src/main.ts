import express from 'express'

import { authRouter } from './app/api/routes/auth.router'
import { bootcampRouter } from './app/api/routes/bootcamp.router'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bootcamps', bootcampRouter)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
