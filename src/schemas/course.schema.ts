import z from 'zod'

export const CourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  tuition: z.number(),
})

export type CourseInputData = z.infer<typeof CourseSchema>
