import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import AppError from './app-error';

export const schemaValidator = (schema: ZodSchema, obj: any) => {
  const data = schema.safeParse(obj);
  if (data.success) return { data, error: '' };

  const error = data.error.issues.map((issue) => issue.message).join(', ');
  return { data: null, error: error };
};

/** zod validator middleware */
export const validator =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    const { data, error } = schemaValidator(schema, req.body);
    if (!data) throw new AppError(error, 400);
    req.body = data.data;
    next();
  };
