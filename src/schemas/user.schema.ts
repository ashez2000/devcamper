import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  role: z.enum(['user', 'publisher']).default('user'),
})

export const userCredentialSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type CreateUser = z.infer<typeof createUserSchema>
export type UserCredential = z.infer<typeof userCredentialSchema>
export type UserRole = 'admin' | 'publisher' | 'user'
