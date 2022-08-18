import z from 'zod'

export const ReviewSchema = z.object({
  text: z.string(),
  rating: z.number().min(1).max(10),
})

export type ReviewInputData = z.infer<typeof ReviewSchema>
