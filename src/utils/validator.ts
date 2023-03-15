import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import AppError from './app-error';

function schemaValidator(schema: ZodSchema, obj: any) {
  const data = schema.safeParse(obj);
  if (data.success) return { data, error: '' };

  const error = data.error.issues
    .map((i) => `${i.path}: ${i.message}`)
    .join(', ');

  return { data: null, error: error };
}

/** zod validator middleware */
export const validate =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    const { data, error } = schemaValidator(schema, req.body);
    if (!data) throw new AppError(error, 400);
    req.body = data.data;
    next();
  };
