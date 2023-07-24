import http from 'http'

import config from './config'
import app from './app'

async function main() {
  const server = http.createServer(app)

  server.listen(config.port, () => {
    console.log(`main: ${config.nodeEnv} server running on port ${config.port}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
