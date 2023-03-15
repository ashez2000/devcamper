import { z } from 'zod';
import { Role } from '@prisma/client';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([Role.PUBLISHER, Role.USER]),
});

export type SignInData = z.TypeOf<typeof SignInSchema>;
export type SignUpData = z.TypeOf<typeof SignUpSchema>;

export type AuthPayload = { id: string; role: Role };
