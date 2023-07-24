import mongoose from 'mongoose'

export default function connectDb(uri: string) {
  mongoose.connect(uri).then(_ => console.log('Connected to MongoDB'))
}
