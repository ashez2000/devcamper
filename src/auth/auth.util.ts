import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import AppError from '../utils/app-error';
import { AuthPayload } from './auth.schema';

/** Authencation middleware */
export const protect: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new AppError('You are not logged in!', 401);

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    res.locals.user = decoded;
  } catch (err) {
    throw new AppError('You are not logged in!, Token expired', 401);
  }

  next();
};

/** Role authorization middleware */
export const restrictTo =
  (...roles: string[]): RequestHandler =>
  (req, res, next) => {
    // roles ['ADMIN', 'PUBLISHER', 'USER']
    if (!roles.includes(res.locals.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };

/** Sign JWT Token */
export const signToken = (payload: AuthPayload): string =>
  jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });

/** Authencation middleware */
export const getCurrentUser = (req: Request) => {
  const token = req.cookies.token;
  if (!token) throw new AppError('Not Authorized', 403);

  return jwt.verify(token, config.JWT_SECRET) as AuthPayload;
};

export const isAuthorized = (resourceId: string, user: AuthPayload) =>
  resourceId === user.id || user.role === 'ADMIN';
