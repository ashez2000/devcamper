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

  mongoUri: loadEnv('MONGO_URI'),

  jwtSecret: loadEnv('JWT_SECRET'),
  jwtExpiresIn: loadEnv('JWT_EXPIRES_IN'),

  geocodeProvider: loadEnv('GEOCODE_PROVIDER'),
  geocodeApiKey: loadEnv('GEOCODE_API_KEY'),

  rateLimitMax: Number(loadEnv('RATE_LIMIT_MAX')),
  rateLimitWindowMs: Number(loadEnv('RATE_LIMIT_WINDOW_MS')),

  smtpHost: loadEnv('SMTP_HOST'),
  smtpUsername: loadEnv('SMTP_USERNAME'),
  smtpPassword: loadEnv('SMTP_PASSWORD'),
} as const

export default config
