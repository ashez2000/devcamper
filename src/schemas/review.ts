import { z } from 'zod'

export const reviewSchema = z.object({
  title: z.string(),
  content: z.string(),
  rating: z.number().int().min(1).max(10),
})

export type ReviewInput = z.infer<typeof reviewSchema>
