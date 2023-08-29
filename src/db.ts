import mongoose from 'mongoose'
import { envLoader } from '@/utils/env-loader'

const MONGODB_URI = envLoader('MONGODB_URI')

export function connectDb() {
  mongoose
    .connect(MONGODB_URI)
    .then(conn => console.log(`db: Connected to ${conn.connection.host}`))
    .catch(console.error)
}
