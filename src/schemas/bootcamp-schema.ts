import { z } from 'zod'

export const BootcampCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
})
