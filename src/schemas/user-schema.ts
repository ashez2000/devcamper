import { z } from 'zod'

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['USER', 'PUBLISHER', 'ADMIN']),
})

export const SigninSchema = SignupSchema.pick({ email: true, password: true })
