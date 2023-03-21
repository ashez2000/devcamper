import { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from './error.util';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Error Handler:', err);

  const message = err.message || 'Server Error';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: message });
};

export const notFoundHandler: RequestHandler = async (req, res) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
};
