import { z } from 'zod'

export const bootcampSchema = z.object({
  name: z.string(),
  description: z.string(),
  website: z.string().url(),
  address: z.string(),
  careers: z.string().array(),
})

export type BootcampInput = z.infer<typeof bootcampSchema>
