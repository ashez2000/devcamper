import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import { hash, verify } from 'argon2'
import { Schema, model } from 'mongoose'

export type UserRole = 'user' | 'publisher' | 'admin'

export type User = {
  name: string
  email: string
  password: string
  role: UserRole
  resetPasswordToken?: string
  resetPasswordExpire?: Date
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['user', 'publisher', 'admin'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
        delete ret.resetPasswordToken
        delete ret.resetPasswordExpire
      },
    },
  }
)

export const User = model('User', userSchema)

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['user', 'publisher']).default('user'),
})

export const userCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function findUserByCredentials(email: string, password: string) {
  let user = await User.findOne({ email })
  if (!user) {
    return null
  }

  let isMatch = await verify(user.password, password)
  if (!isMatch) {
    return null
  }

  return user
}

export async function createUser(data: z.infer<typeof createUserSchema>) {
  let hashedPassword = await hash(data.password)
  let user = await User.create({
    ...data,
    password: hashedPassword,
  })
  return user
}

export async function generatePasswordResetToken(userId: string) {
  let token = randomBytes(20).toString('hex')
  let expire = new Date(Date.now() + 10 * 60 * 1000)
  let tokenHash = await hash(token)

  await User.findByIdAndUpdate(userId, {
    resetPasswordToken: tokenHash,
    resetPasswordExpire: expire,
  })

  return token
}

export async function resetPassword(token: string, password: string) {
  let tokenHash = await hash(token)
  let user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return false
  }

  let passwordHash = await hash(password)

  await User.findByIdAndUpdate(user.id, {
    resetPasswordToken: undefined,
    resetPasswordExpire: undefined,
    password: passwordHash,
  })

  return true
}
