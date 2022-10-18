import Course from './course.model'
import AppError from '../utils/app-error'

import { CreateCourseDto } from './course.dto'
import { Query, filter, sort, select, paginate } from '../utils/query-builder'

export const findAllCourse = async (query: Query) => {
  const filterQuery = filter(query)
  const sortFields = sort(query)
  const selectFields = select(query)
  const { limit, skip } = paginate(query)

  const courses = await Course.find(filterQuery)
    .populate({
      path: 'bootcamp',
      select: 'name description',
    })
    .select(selectFields)
    .sort(sortFields)
    .skip(skip)
    .limit(limit)

  return courses
}

/**
 * Find all Courses associated with a bootcamp
 */
export const findAllCourseForBootcamp = async (bootcampId: string) => {
  const courses = await Course.find({ bootcamp: bootcampId })
  return courses
}

/**
 * Find a course by id
 */
export const findCourseById = async (id: string) => {
  const course = await Course.findById(id)
  if (!course) throw new AppError(`No course with id ${id}`, 404)
  return course
}

/**
 * Create a new course
 */
export const createCourse = async (data: CreateCourseDto) => {
  const course = await Course.create(data)
  return course
}

/**
 * Update a course by id
 */
export const updateCourseById = async (id: string, data: any) => {
  const opt = { new: true, runValidators: true }

  const course = await Course.findByIdAndUpdate(id, data, opt)
  if (!course) throw new AppError(`No course with id ${id}`, 404)

  return course
}

/**
 * Delete a course by id
 */
export const deleteCourseById = async (id: string) => {
  const course = await Course.findByIdAndDelete(id)
  if (!course) throw new AppError(`No course with id ${id}`, 404)

  return course
}
