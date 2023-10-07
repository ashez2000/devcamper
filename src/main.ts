import http from 'http'

import { app } from '@/app'
import { PORT, NODE_ENV } from '@/env'
import logger from '@/utils/logger'

async function main() {
  try {
    let server = http.createServer(app)
    server.listen(PORT, () => {
      logger.info(`main: Listening { port: ${PORT}, env: ${NODE_ENV} }`)
    })

    function shutdown() {
      server.close()
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (err) {
    process.exit(1)
  }
}

main()
