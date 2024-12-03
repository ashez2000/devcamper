import 'dotenv/config'
import { loadenv } from './utils/env'

// Application Config
export const appConfig = {
  port: loadenv('PORT', '3000'),
  env: loadenv('NODE_ENV', 'development'),
}

// Database Config
export const dbConfig = {
  url: loadenv('MONGO_URI'),
}

// Ratelimit Config
export const ratelimitConfig = {
  windowMs: parseInt(loadenv('RATE_LIMIT_WINDOW_MS', '600000')), // 10 mins
  max: parseInt(loadenv('RATE_LIMIT_MAX', '100')), // 100 requests
}

// JWT Config
export const jwtConfig = {
  secret: loadenv('JWT_SECRET'),
  expire: loadenv('JWT_EXPIRE', '30d'),
}
