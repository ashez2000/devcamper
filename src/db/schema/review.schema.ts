import { z } from 'zod'

export const createReviewSchema = z.object({
    title: z.string().min(1).max(100),
    text: z.string().min(1).max(1000),
    rating: z.number().int().min(1).max(5),
})
