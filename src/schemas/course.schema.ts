import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(500),
  weeks: z.number().min(1).max(50),
  tuition: z.number().min(0).max(100000),
  minimumSkill: z.enum(['beginner', 'intermediate', 'advanced']),
  scholarshipAvailable: z.boolean().default(false),
})
