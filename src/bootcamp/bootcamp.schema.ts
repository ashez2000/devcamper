import { z } from 'zod';

export const CreateBootcampSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  website: z.string().url(),
  phone: z.string().min(1).max(20),
  email: z.string().email(),
  address: z.string().min(1).max(100),
  careers: z.array(z.string().min(1).max(50)),
  housing: z.boolean().default(false),
  jobAssistance: z.boolean().default(false),
  jobGuarantee: z.boolean().default(false),
  acceptGi: z.boolean().default(false),
});

export type CreateBootcampData = z.infer<typeof CreateBootcampSchema>;
