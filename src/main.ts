import http from 'http'

import { app } from '@/app'
import { connectDb } from '@/db'
import { envLoader } from '@/utils/env-loader'

const PORT = envLoader('PORT')
const NODE_ENV = envLoader('NODE_ENV')

async function main() {
  connectDb()

  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`main: Server is running in ${NODE_ENV} mode on port ${PORT}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
