import { z } from 'zod';

export const CreateReviewSchema = z.object({
  title: z.string().min(1).max(50),
  text: z.string().min(1).max(500),
  rating: z.number().min(1).max(5),
});

export type CreateReview = z.infer<typeof CreateReviewSchema>;
