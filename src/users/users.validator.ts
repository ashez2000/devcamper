import z from 'zod'

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'publisher']),
})

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SinupData = z.infer<typeof SignupSchema>
export type SigninData = z.infer<typeof SigninSchema>
