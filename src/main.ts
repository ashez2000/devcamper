import http from 'http'

import { app } from '@/app'
import { connectDb } from '@/db'
import { envLoader } from '@/utils/env-loader'
import { createDebug } from '@/utils/debug'

async function main() {
  let debug = createDebug('main')
  let PORT = envLoader('PORT')

  try {
    let { conn, dbClose } = await connectDb()
    console.log(`main: Connected to ${conn.connection.host}`)

    let server = http.createServer(app)
    server.listen(PORT, () => console.log(`main: Listening on port :${PORT}`))

    function gracefulShutdown() {
      dbClose()
      server.close()
    }

    process.on('SIGINT', gracefulShutdown)
    process.on('SIGTERM', gracefulShutdown)
  } catch (err) {
    debug(err)
    process.exit(1)
  }
}

main()
