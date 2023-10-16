import { z } from 'zod'

export const bootcampCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type BootcampCreate = z.infer<typeof bootcampCreateSchema>
