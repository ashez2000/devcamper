import { z } from 'zod'

export const createBootcampSchema = z.object({
    name: z.string().min(5).max(50),
    description: z.string().min(10).max(500),
})
