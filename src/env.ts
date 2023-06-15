import { z } from 'zod'

export const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.string().default('3000'),

    DATABASE_URL: z.string(),

    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),

    RATE_LIMIT_WINDOW: z.string(),
    RATE_LIMIT_MAX: z.string(),
})

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}
