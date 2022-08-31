import z from 'zod'

export const CreateBootcampSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type CreateBootcampData = z.infer<typeof CreateBootcampSchema>
