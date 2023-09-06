import http from 'http'

import { app } from '@/app'
import { connectDb } from '@/db'
import { envLoader } from '@/utils/env-loader'
import { createDebug } from '@/utils/debug'

let debug = createDebug('main')
let PORT = envLoader('PORT')

async function main() {
  connectDb()

  let server = http.createServer(app)
  server.listen(PORT, () => debug(`Listening on port ${PORT}`))
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
