import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

import config from '../config';
import AppError from '../utils/app-error';
import { AuthPayload } from './auth.schema';

/** Authencation middleware */
export function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) throw new AppError('You are not logged in!', 401);

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    res.locals.user = decoded;
  } catch (err) {
    throw new AppError('You are not logged in!, Token expired', 401);
  }

  next();
}

/** Role authorization middleware */
export function restrictTo(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user as AuthPayload;
    if (!roles.includes(user.role)) {
      throw new AppError('You are not authorized to perform this action', 403);
    }
    next();
  };
}

/** Sign JWT Token */
export function signToken(payload: AuthPayload) {
  const opt = { expiresIn: config.JWT_EXPIRE };
  return jwt.sign(payload, config.JWT_SECRET, opt);
}

/** Source authorization */
export function isAuthorized(sourceUserId: string, user: AuthPayload) {
  return sourceUserId === user.id || user.role === Role.ADMIN;
}

/** Authencation middleware */
export const getCurrentUser = (req: Request) => {
  const token = req.cookies.token;
  if (!token) throw new AppError('Not Authorized', 403);

  return jwt.verify(token, config.JWT_SECRET) as AuthPayload;
};
