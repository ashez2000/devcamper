import { loadenv } from './utils/env'

export type AppConfig = {
  port: string
  env: string
}

export const appConfig: AppConfig = {
  port: loadenv('PORT', '3000'),
  env: loadenv('NODE_ENV', 'development'),
}

export const dbConfig = {
  url: loadenv('MONGODB_URI', 'mongodb://localhost:27017/devcamper'),
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
