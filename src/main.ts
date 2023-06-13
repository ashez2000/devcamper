import http from 'http'

import { envSchema } from './env'
import { app } from './app'

async function main() {
    envSchema.parse(process.env)

    const port = process.env.PORT
    const server = http.createServer(app)

    server.listen(port, () => {
        console.log(`main: server running on port ${port}`)
    })
}

main().catch((err) => {
    console.error('main:', err)
    process.exit(1)
})
