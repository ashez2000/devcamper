import { z } from 'zod'

export const SignUpInputSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    role: z.enum(['user', 'publisher']).default('user'),
})

export const SignInInputSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type SignUpInput = z.infer<typeof SignUpInputSchema>
export type SignInInput = z.infer<typeof SignInInputSchema>

export type UserRoles = 'admin' | 'user' | 'publisher'
