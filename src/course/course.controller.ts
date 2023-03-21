import { RequestHandler } from 'express';
import * as courseService from './course.service';
import * as bootcampService from '../bootcamp/bootcamp.service';
import { getCurrentUser, isAuthorized } from '../auth/auth.util';
import { AppError } from '../error/error.util';

/**
 * @desc    Get all courses
 * @route   GET /api/v1/courses OR /api/v1/bootcamps/:bootcampId/courses
 */
export const getAllCourse: RequestHandler = async (req, res) => {
  if (req.params.bootcampId) {
    const courses = await courseService.getCoursesForBootcamp(
      req.params.bootcampId
    );

    return res.status(200).json({ data: { courses } });
  }

  const courses = await courseService.getCourses(req.query);
  return res.status(200).json({ data: { courses } });
};

/**
 * @desc    Get a single course
 * @route   GET /api/v1/courses/:id
 */
export const getCourse: RequestHandler = async (req, res) => {
  const course = await courseService.getCourse(req.params.id);
  if (!course)
    throw new AppError(`Course not found with id ${req.params.id}`, 404);

  return res.status(200).json({ data: { course } });
};

/**
 * @desc    Create a course
 * @route   POST /api/v1/bootcamps/:bootcampId/courses
 */
export const createCourse: RequestHandler = async (req, res, next) => {
  const currentUser = getCurrentUser(req);

  req.body.userId = currentUser.id;
  req.body.bootcampId = req.params.bootcampId;

  const bootcamp = await bootcampService.getBootcamp(req.params.bootcampId);
  if (!bootcamp)
    throw new AppError(
      `Bootcamp not found with id ${req.params.bootcampId}`,
      404
    );

  if (!isAuthorized(bootcamp.userId, currentUser))
    throw new AppError(
      `Not authorized to add a course to bootcamp ${req.params.bootcampId}`,
      401
    );

  const course = await courseService.createCourse(req.body);
  return res.status(201).json({ data: { course } });
};

/**
 * @desc    Update a course
 * @route   PUT /api/v1/courses/:id
 */
export const updateCourse: RequestHandler = async (req, res, next) => {
  const currentUser = getCurrentUser(req);

  const course = await courseService.getCourse(req.params.id);
  if (!course)
    throw new AppError(`Course not found with id ${req.params.id}`, 404);

  if (!isAuthorized(course.userId, currentUser))
    throw new AppError(`Not authorized to update course ${req.params.id}`, 401);

  const updatedCourse = await courseService.updateCourse(
    req.params.id,
    req.body
  );

  return res.status(200).json({ data: { course: updatedCourse } });
};

/**
 * @desc    Delete a course
 * @route   DELETE /api/v1/courses/:id
 */
export const deleteCourse: RequestHandler = async (req, res, next) => {
  const currentUser = getCurrentUser(req);

  const course = await courseService.getCourse(req.params.id);
  if (!course)
    throw new AppError(`Course not found with id ${req.params.id}`, 404);

  if (!isAuthorized(course.userId, currentUser))
    throw new AppError(`Not authorized to update course ${req.params.id}`, 401);

  await courseService.deleteCourse(req.params.id);
  return res.status(200).json({ data: {} });
};
