import http from 'http'

import { app } from '@/app'
import { PORT, NODE_ENV } from '@/env'
import createLogger from '@/utils/logger'

const log = createLogger('main')

async function main() {
  try {
    const server = http.createServer(app)
    server.listen(PORT, () => {
      log.info(`Listening { port: ${PORT}, env: ${NODE_ENV} }`)
    })

    const shutdown = () => {
      server.close()
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (err) {
    process.exit(1)
  }
}

main()
