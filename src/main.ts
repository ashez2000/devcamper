import express from 'express'
import { bootcampRouter } from './app/api/routes/bootcamp.router'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/v1/bootcamps', bootcampRouter)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
