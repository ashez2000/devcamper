const Bootcamp = require('../models/bootcamp.model')
const ErrorResponse = require('../utils/error.util')

class BootcampNotFound extends ErrorResponse {
  constructor(id) {
    super(`Bootcamp with id ${id} not found`, 404)
  }
}

/**
 * Get all bootcamps
 */
exports.find = async () => {
  const bootcamps = await Bootcamp.find()
  return bootcamps
}

/**
 * Get bootcamp by id
 * @param {string} id
 */
exports.findById = async (id) => {
  const bootcamp = await Bootcamp.findById(id)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}

/**
 * Create new bootcamp
 * @param {object} data - data to create
 */
exports.create = async (data) => {
  const bootcamp = await Bootcamp.create(data)
  return bootcamp
}

/**
 * Update bootcamp
 * @param {string} id - bootcamp id
 * @param {object} data - data to update
 */
exports.update = async (id, data) => {
  const opt = { new: true, runValidators: true }
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, data, opt)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}
