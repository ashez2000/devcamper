import z from 'zod'

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'publisher']),
})

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SignUpData = z.infer<typeof SignUpSchema>
export type SignInData = z.infer<typeof SignInSchema>
