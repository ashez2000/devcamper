import Course from '../models/course.model'
import ErrorResponse from '../utils/error.util'
import type { CourseInputData } from '../schemas/course.schema'

class CourseNotFound extends ErrorResponse {
  constructor(id: string) {
    super(`Course with id ${id} not found`, 404)
  }
}

/**
 * Get all Courses associated with a bootcamp
 */
export const findCourses = async (bootcampId: string) => {
  const bootcamps = await Course.find({ bootcamp: bootcampId })
  return bootcamps
}

/**
 * Get a course by id
 */
export const findCourseById = async (id: string) => {
  const course = await Course.findById(id)
  if (!course) throw new CourseNotFound(id)
  return course
}

/**
 * Create a new course
 */
export const createCourse = async (data: CourseInputData) => {
  const course = await Course.create(data)
  return course
}

/**
 * Update a course
 */
export const updateCourse = async (id: string, data: any) => {
  const opt = { new: true, runValidators: true }
  const course = await Course.findByIdAndUpdate(id, data, opt)
  if (!course) throw new CourseNotFound(id)
  return course
}

/**
 * Delete a course
 */
export const deleteCourse = async (id: string) => {
  const course = await Course.findByIdAndDelete(id)
  if (!course) throw new CourseNotFound(id)
  return course
}
