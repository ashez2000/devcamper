const Course = require('../models/course.model')
const ErrorResponse = require('../utils/error.util')

class CourseNotFound extends ErrorResponse {
  constructor(id) {
    super(`Course with id ${id} not found`, 404)
  }
}

/**
 * @desc Get all Courses associated with a bootcamp
 * @param {string} bootcampId
 * @returns {Promise<Course[]>}
 */
exports.find = async (bootcampId) => {
  const bootcamps = await Course.find({ bootcamp: bootcampId })
  return bootcamps
}

/**
 * @desc Get a course by id
 * @param {string} id
 * @returns {Promise<Course>}
 */
exports.findOne = async (id) => {
  const course = await Course.findById(id)
  if (!course) throw new CourseNotFound(id)
  return course
}

/**
 * @desc Create a new course
 * @param {object} data
 * @returns {Promise<Course>}
 */
exports.create = async (data) => {
  const course = await Course.create(data)
  return course
}

/**
 * @desc Update a course
 * @param {string} id
 * @param {object} data
 * @returns {Promise<Course>}
 */
exports.update = async (id, data) => {
  const opt = { new: true, runValidators: true }
  const course = await Course.findByIdAndUpdate(id, data, opt)
  if (!course) throw new CourseNotFound(id)
  return course
}

/**
 * @desc Delete a course
 * @param {string} id
 */
exports.delete = async (id) => {
  const course = await Course.findByIdAndDelete(id)
  if (!course) throw new CourseNotFound(id)
  return course
}
