import z from 'zod'

export const BootcampSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type BootcampInputData = z.infer<typeof BootcampSchema>
