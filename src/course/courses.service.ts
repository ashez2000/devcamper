import Course from './course.model'
import AppError from '../utils/app-error'

import { CreateCourseDto } from './course.dto'
import { Query, filter, sort, select, paginate } from '../utils/query-builder'

export async function findCourses(query: Query) {
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

export async function findCoursesForBootcamp(bootcampId: string, query: Query) {
  const filterQuery = filter(query)
  const sortFields = sort(query)
  const selectFields = select(query)
  const { limit, skip } = paginate(query)

  const courses = await Course.find({ bootcamp: bootcampId, ...filterQuery })
    .select(selectFields)
    .sort(sortFields)
    .skip(skip)
    .limit(limit)

  return courses
}

export async function findCourse(id: string) {
  const course = await Course.findById(id)
  if (!course) {
    throw new AppError(`course (${id}) not found`, 404)
  }
  return course
}

export async function createCourse(data: CreateCourseDto) {
  const course = await Course.create(data)
  return course
}

export async function updateCourse(id: string, data: any) {
  const opt = { new: true, runValidators: true }
  const course = await Course.findByIdAndUpdate(id, data, opt)
  if (!course) {
    throw new AppError(`course (${id}) not found`, 404)
  }
  return course
}

export async function deleteCourse(id: string) {
  const course = await Course.findByIdAndDelete(id)
  if (!course) {
    throw new AppError(`course (${id}) not found`, 404)
  }
  return course
}
