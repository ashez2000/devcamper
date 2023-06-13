import { z } from 'zod'

export const SignupSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    role: z.enum(['user', 'publisher']).default('user'),
})

export const SigninSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type CreateUserInput = z.infer<typeof SignupSchema>
