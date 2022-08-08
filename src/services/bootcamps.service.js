const Bootcamp = require('../models/bootcamp.model')
const ErrorResponse = require('../utils/error.util')

class BootcampNotFound extends ErrorResponse {
  constructor(id) {
    super(`Bootcamp with id ${id} not found`, 404)
  }
}

/**
 * @desc Get all bootcamps
 * @returns {Promise<Bootcamp[]>}
 */
exports.find = async () => {
  const bootcamps = await Bootcamp.find()
  return bootcamps
}

/**
 * @desc Get bootcamp by id
 * @param {string} id
 * @returns {Promise<Bootcamp>}
 * @throws {BootcampNotFound}
 */
exports.findById = async (id) => {
  const bootcamp = await Bootcamp.findById(id)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}

/**
 * @desc Create new bootcamp
 * @param {object} data
 * @returns {Promise<Bootcamp>}
 */
exports.create = async (data) => {
  const bootcamp = await Bootcamp.create(data)
  return bootcamp
}

/**
 * @desc Update bootcamp
 * @param {string} id
 * @param {object} data
 * @returns {Promise<Bootcamp>}
 * @throws {BootcampNotFound}
 */
exports.update = async (id, data) => {
  const opt = { new: true, runValidators: true }
  const bootcamp = await Bootcamp.findByIdAndUpdate(id, data, opt)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}

/**
 * @desc Delete bootcamp
 * @param {string} id
 * @returns {Promise<Bootcamp>}
 * @throws {BootcampNotFound}
 */
exports.delete = async (id) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(id)
  if (!bootcamp) throw new BootcampNotFound(id)
  return bootcamp
}
