import { z } from 'zod'
import { Role } from '@prisma/client'

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Email is invalid'),
  password: z.string({
    required_error: 'Password is required',
  }),
})

export const SignUpSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3),
    role: z.enum(['USER', 'PUBLISHER'], {
      required_error: 'Role is required',
      invalid_type_error: 'Role is invalid',
    }),
  })
  .merge(SignInSchema)

export type AuthPayload = {
  id: string
  role: Role
}

export type SignInData = z.TypeOf<typeof SignInSchema>
export type SignUpData = z.TypeOf<typeof SignUpSchema>
