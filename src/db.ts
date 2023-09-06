import mongoose from 'mongoose'

import { envLoader } from '@/utils/env-loader'
import { createDebug } from './utils/debug'

let debug = createDebug('db')
let MONGODB_URI = envLoader('MONGODB_URI')

export async function connectDb() {
  let db = await mongoose.connect(MONGODB_URI)
  return {
    conn: db,
    dbClose: () => mongoose.connection.close(),
  }
}
