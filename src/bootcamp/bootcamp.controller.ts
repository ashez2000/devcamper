import { Request, Response } from 'express';

import * as bootcampService from './bootcamp.service';
import { isAuthorized } from '../auth/auth.util';
import { NotAuthorizedError, AppError } from '../error/error.util';

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 */
export async function getBootcamps(req: Request, res: Response) {
  const data = await bootcampService.getBootcamps(req.query);
  res.status(200).json({ data: data.bootcamps, pagination: data.pagination });
}

/**
 * @desc    Get a single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 */
export async function getBootcamp(req: Request, res: Response) {
  const bootcamp = await bootcampService.getBootcamp(req.params.id);
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404);
  }

  res.status(200).json({ data: { bootcamp } });
}

/**
 * @desc    Create a new bootcamp
 * @route   POST /api/v1/bootcamps
 */
export async function createBootcamp(req: Request, res: Response) {
  const user = res.locals.user;
  const bootcamp = await bootcampService.createBootcamp(req.body, user.id);

  res.status(201).json({ data: { bootcamp } });
}

/**
 * @desc    Update a bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 */
export async function updateBootcamp(req: Request, res: Response) {
  // TODO: update bootcamp
  res.status(200).json({ data: { bootcamp: null } });
}

/**
 * @desc    Delete a bootcamp
 * @route   DELETE /api/v1/bootcamps/:id
 */
export async function deleteBootcamp(req: Request, res: Response) {
  const currentUser = res.locals.user;

  const bootcamp = await bootcampService.getBootcamp(req.params.id);
  if (!bootcamp) {
    throw new AppError('Bootcamp not found', 404);
  }

  if (!isAuthorized(bootcamp.userId, currentUser)) {
    throw new NotAuthorizedError();
  }

  await bootcampService.deleteBootcamp(req.params.id);
  res.status(200).json({ data: {} });
}
