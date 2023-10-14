import pino from 'pino'

function createLogger(name: string) {
  return pino({
    name: name,
  })
}

export default createLogger
