import http from 'http'

import './env'
import createLogger from '@/utils/logger'
import app from '@/app'

const log = createLogger('main')
const server = http.createServer(app)

async function main() {
  const port = process.env.PORT

  server.listen(port, () => {
    log.info(`Listening on port: ${port}`)
  })
}

main()
