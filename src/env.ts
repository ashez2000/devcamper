import 'dotenv/config'

function loadEnv(name: string) {
  let value = process.env[name] || ''
  if (value.trim() == '') {
    throw new Error(`env var: ${name} undefined`)
  }

  return value
}

export const PORT = loadEnv('PORT')
export const NODE_ENV = loadEnv('NODE_ENV')
