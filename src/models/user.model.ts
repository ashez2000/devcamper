import jwt from 'jsonwebtoken'
import argon from 'argon2'
import config from 'config'
import { Schema, model, Model, HydratedDocument } from 'mongoose'
import ErrorResponse from '../utils/error.util'

interface IUser {
  name: string
  email: string
  password: string
  role: string
}

interface IUserMethods {
  getJWT: () => string
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials: (
    email: string,
    password: string
  ) => Promise<HydratedDocument<IUser, IUserMethods>>
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

// sign token
UserSchema.methods.getJWT = function () {
  const user = {
    id: this._id,
    role: this.role,
  }

  return jwt.sign(user, config.get('JWT_SECRET'), {
    expiresIn: process.env.JWT_EXP,
  })
}

// find user with email and password
UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password')
  if (!user) throw new ErrorResponse('Invalid credentials', 401)

  const isMatch = await argon.verify(user.password, password)
  if (!isMatch) throw new ErrorResponse('Invalid credentials', 401)

  return user
}

const User = model<IUser, IUserModel>('User', UserSchema)

export default User
