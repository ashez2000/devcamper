export const port = parseInt(process.env.PORT || '3000')
export const env = process.env.NODE_ENV || 'development'
export const mongouri =
  process.env.MONGO_URI || 'mongodb://localhost:27017/devcamper'
export const jwtSecret = process.env.JWT_SECRET || 'devcamper'
export const jwtExpiration = process.env.JWT_EXPIRES_IN || '1d'
