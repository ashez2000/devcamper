import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(256),
  role: z.enum(['USER', 'PUBLISHER']).default('USER'),
})

export type SignupInput = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(256),
})

export type SigninInput = z.infer<typeof signinSchema>
