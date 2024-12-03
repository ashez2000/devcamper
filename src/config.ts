import { loadenv } from './utils/env'

// Application Config
export const appConfig = {
  port: loadenv('PORT', '3000'),
  env: loadenv('NODE_ENV', 'development'),
}

// Database Config
export const dbConfig = {
  url: loadenv('MONGODB_URI', 'mongodb://localhost:27017/devcamper'),
}

// Ratelimit Config
export const ratelimitConfig = {
  windowMs: parseInt(loadenv('RATE_LIMIT_WINDOW_MS', '600000')), // 10 mins
  max: parseInt(loadenv('RATE_LIMIT_MAX', '100')), // 100 requests
}

const config = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/devcamper',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  GEOCODER_API_KEY: process.env.GEOCODER_API_KEY || 'YOUR_API_KEY',
}

export default config
