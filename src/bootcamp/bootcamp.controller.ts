import { RequestHandler } from 'express';
import * as bootcampService from './bootcamp.service';
import asyncHandler from '../utils/async-handler';
import AppError from '../utils/app-error';
import { getCurrentUser, isAuthorized } from '../auth/auth.util';

/**
 * @desc    Get all bootcamps
 * @route   GET /api/v1/bootcamps
 */
export const getAllBootcamps: RequestHandler = async (req, res) => {
  const bootcamps = await bootcampService.getAllBootcamps();
  res.status(200).json({ data: { bootcamps } });
};

/**
 * @desc    Get a single bootcamp
 * @route   GET /api/v1/bootcamps/:id
 */
export const getBootcamp: RequestHandler = async (req, res) => {
  const bootcamp = await bootcampService.getBootcamp(req.params.id);
  if (!bootcamp)
    throw new AppError(`No bootcamp with id ${req.params.id}`, 404);

  return res.status(200).json({ data: { bootcamp } });
};

/**
 * @desc    Create a new bootcamp
 * @route   POST /api/v1/bootcamps
 */
export const createBootcamp: RequestHandler = asyncHandler(async (req, res) => {
  const currentUser = getCurrentUser(req);
  req.body.userId = currentUser.id;

  const bootcamp = await bootcampService.createBootcamp(req.body);
  return res.status(201).json({ data: { bootcamp } });
});

/**
 * @desc    Update a bootcamp
 * @route   PUT /api/v1/bootcamps/:id
 */
export const updateBootcamp: RequestHandler = async (req, res, next) => {
  const currentUser = getCurrentUser(req);

  const bootcamp = await bootcampService.getBootcamp(req.params.id);
  if (!bootcamp)
    throw new AppError(`No bootcamp with id ${req.params.id}`, 404);

  if (!isAuthorized(bootcamp.userId, currentUser))
    return new AppError('Not authorized to update this bootcamp', 401);

  const updatedBootcamp = await bootcampService.updateBootcamp(
    req.params.id,
    req.body
  );

  return res.status(200).json({ data: { bootcamp: updatedBootcamp } });
};

/**
 * @desc    Delete a bootcamp
 * @route   DELETE /api/v1/bootcamps/:id
 */
export const deleteBootcamp: RequestHandler = async (req, res, next) => {
  const currentUser = getCurrentUser(req);

  const bootcamp = await bootcampService.getBootcamp(req.params.id);
  if (!bootcamp)
    throw new AppError(`No bootcamp with id ${req.params.id}`, 404);

  if (!isAuthorized(bootcamp.userId, currentUser))
    return new AppError('Not authorized to update this bootcamp', 401);

  await bootcampService.deleteBootcamp(req.params.id);
  return res.status(200).json({ data: {} });
};
