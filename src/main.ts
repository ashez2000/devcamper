import http from 'http'

import { config, configSchema } from '$/config'
import { app } from '$/app'

async function main() {
  configSchema.parse(config)

  const server = http.createServer(app)

  server.listen(config.port, () => {
    console.log(`main: server running on port ${config.port}`)
  })
}

main().catch(err => {
  console.error('main:', err)
  process.exit(1)
})
