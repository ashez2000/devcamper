import { Schema } from 'mongoose'
import { z } from 'zod'

export type UserRole = 'user' | 'publisher' | 'admin'

export type User = {
  name: string
  email: string
  password: string
  role: UserRole
  resetPasswordToken?: string
  resetPasswordExpire?: Date
}

export let userSchema = new Schema<User>(
  {
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

export let signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  role: z.enum(['user', 'publisher']).default('user'),
})

export let signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
