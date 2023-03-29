import { z } from 'zod';

export const CreateCourseSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  weeks: z.number().min(1).max(100),
  tuition: z.number().min(1).max(100000),
  minimumSkill: z.string().min(1).max(50),
  scholarshipsAvailable: z.boolean().default(false),
});

export type CreateCourseSchema = z.infer<typeof CreateCourseSchema>;
