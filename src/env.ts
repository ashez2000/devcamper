import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.string().default('3000'),

    DATABASE_URL: z.string(),

    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),

    RATE_LIMIT_WINDOW: z.string(),
    RATE_LIMIT_MAX: z.string(),

    SMTP_HOST: z.string(),
    SMTP_PORT: z.string(),
    SMTP_EMAIL: z.string(),
    SMTP_PASSWORD: z.string(),

    FROM_EMAIL: z.string(),
    FROM_NAME: z.string(),
})

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}
