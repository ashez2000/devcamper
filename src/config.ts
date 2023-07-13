import 'dotenv/config'
import { z } from 'zod'

export const configSchema = z.object({
  port: z.number().default(3000),

  jwt: z.object({
    secret: z.string(),
    expiresIn: z.string(),
  }),

  rateLimit: z.object({
    windowMs: z.number(),
    max: z.number(),
  }),
})

export const config = {
  port: parseInt(process.env.PORT!),

  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!,
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
} as const
