import 'dotenv/config'

function loadEnv(name: string) {
  const value = process.env[name]
  if (value === undefined || value.trim() === '') {
    throw new Error(`config - ${name} is undefined or empty`)
  }

  return value
}

const config = {
  port: Number(loadEnv('PORT')),
  nodeEnv: loadEnv('NODE_ENV'),

  jwtSecret: loadEnv('JWT_SECRET'),
  jwtExpiresIn: loadEnv('JWT_EXPIRES_IN'),

  rateLimitMax: Number(loadEnv('RATE_LIMIT_MAX')),
  rateLimitWindowMs: Number(loadEnv('RATE_LIMIT_WINDOW_MS')),
} as const

export default config
