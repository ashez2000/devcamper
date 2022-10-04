import argon from 'argon2'
import { Schema, model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  role: string
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user',
  },
})

// hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await argon.hash(this.password)

  next()
})

const User = model<IUser>('User', UserSchema)

export default User
