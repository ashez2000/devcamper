import { z } from 'zod'

export const ReviewCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  rating: z.number().int().min(1).max(5),
})
