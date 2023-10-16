import http from 'http'

import createLogger from '@/utils/logger'
import envLoad from '@/utils/envload'
import app from '@/app'

const port = envLoad('PORT')
const nodeEnv = envLoad('NODE_ENV')
const log = createLogger('main')

const server = http.createServer(app)

async function main() {
  server.listen(port, () => {
    log.info(`Listening on port ${port}`)
    log.info(`Mode: ${nodeEnv}`)
  })
}

main().catch(err => {
  log.error(err)
  process.exit(1)
})
