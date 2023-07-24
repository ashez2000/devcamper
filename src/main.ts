import http from 'http'

import config from './config'
import connectDb from './db'
import app from './app'

async function main() {
  connectDb(config.mongoUri)
  const server = http.createServer(app)

  server.listen(config.port, () => {
    console.log(`main: ${config.nodeEnv} server running on port ${config.port}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
